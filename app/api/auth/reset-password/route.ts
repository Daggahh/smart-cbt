import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Validate token from DB
      const tokenResult = await client.query(
        `SELECT user_id, expires_at, used FROM password_reset_tokens WHERE token = $1`,
        [token]
      );
      if (tokenResult.rows.length === 0) {
        return NextResponse.json(
          { error: "Invalid or expired reset token" },
          { status: 400 }
        );
      }
      const { user_id, expires_at, used } = tokenResult.rows[0];
      if (used || new Date() > new Date(expires_at)) {
        return NextResponse.json(
          { error: "Invalid or expired reset token" },
          { status: 400 }
        );
      }

      // Hash new password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Update user password
      await client.query(
        "UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
        [passwordHash, user_id]
      );
      // Mark token as used
      await client.query(
        "UPDATE password_reset_tokens SET used = true WHERE token = $1",
        [token]
      );

      return NextResponse.json(
        { message: "Password reset successfully" },
        { status: 200 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
