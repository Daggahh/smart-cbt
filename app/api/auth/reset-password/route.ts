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
      // TODO: Validate reset token from database
      // For now, we'll use a simple approach
      // In a real implementation, you'd check against a password_reset_tokens table

      // Check if token exists and is not expired
      // This is a placeholder - you'll need to implement proper token validation
      const tokenValid = true; // Replace with actual token validation

      if (!tokenValid) {
        return NextResponse.json(
          { error: "Invalid or expired reset token" },
          { status: 400 }
        );
      }

      // TODO: Get user ID from token
      // For now, we'll use a placeholder
      const userId = "placeholder-user-id"; // Replace with actual user ID from token

      // Hash new password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Update user password
      await client.query(
        "UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
        [passwordHash, userId]
      );

      // TODO: Clear the reset token
      // Delete from password_reset_tokens table or similar

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
