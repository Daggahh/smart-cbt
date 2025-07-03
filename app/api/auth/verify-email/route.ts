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
        `SELECT user_id, expires_at, used FROM verification_tokens WHERE token = $1`,
        [token]
      );
      if (tokenResult.rows.length === 0) {
        return NextResponse.json(
          { error: "Invalid or expired verification token" },
          { status: 400 }
        );
      }
      const { user_id, expires_at, used } = tokenResult.rows[0];
      if (used || new Date() > new Date(expires_at)) {
        return NextResponse.json(
          { error: "Invalid or expired verification token" },
          { status: 400 }
        );
      }

      // Update user email verification status
      await client.query(
        "UPDATE users SET email_verified = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1",
        [user_id]
      );
      // Mark token as used
      await client.query(
        "UPDATE verification_tokens SET used = true WHERE token = $1",
        [token]
      );

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
