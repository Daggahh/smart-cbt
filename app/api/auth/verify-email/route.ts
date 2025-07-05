import { type NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    // Validate token
    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Validate token from DB
      const tokenResult = await client.query(
        `SELECT identifier, expires FROM verification_tokens WHERE token = $1`,
        [token]
      );
      if (tokenResult.rows.length === 0) {
        return NextResponse.json(
          { error: "Invalid or expired verification token" },
          { status: 400 }
        );
      }
      const { identifier, expires } = tokenResult.rows[0];
      if (new Date() > new Date(expires)) {
        return NextResponse.json(
          { error: "Invalid or expired verification token" },
          { status: 400 }
        );
      }

      // Update user email verification status
      await client.query(
        "UPDATE users SET email_verified = true, updated_at = CURRENT_TIMESTAMP WHERE email = $1",
        [identifier]
      );
      // Delete the used token
      await client.query("DELETE FROM verification_tokens WHERE token = $1", [
        token,
      ]);

      return NextResponse.json(
        { message: "Email verified successfully" },
        { status: 200 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
