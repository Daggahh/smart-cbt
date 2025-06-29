import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies or headers
    const token =
      request.cookies.get("auth-token")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Authentication token required" },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as any;

    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const client = await pool.connect();

    try {
      // Get user data from database
      const userResult = await client.query(
        `SELECT 
          id, 
          email, 
          first_name, 
          last_name, 
          role, 
          phone, 
          date_of_birth, 
          registration_number,
          email_verified,
          is_active,
          created_at
        FROM users 
        WHERE id = $1 AND is_active = true`,
        [decoded.userId]
      );

      if (userResult.rows.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const user = userResult.rows[0];

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          phone: user.phone,
          dateOfBirth: user.date_of_birth,
          registrationNumber: user.registration_number,
          emailVerified: user.email_verified,
          createdAt: user.created_at,
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Get current user error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
