import { type NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Check if user exists
      const userResult = await client.query(
        "SELECT id, email, first_name, last_name FROM users WHERE email = $1 AND role = 'student'",
        [email]
      );

      if (userResult.rows.length === 0) {
        // Don't reveal if email exists or not for security
        return NextResponse.json(
          {
            message:
              "If an account with that email exists, a password reset link has been sent.",
          },
          { status: 200 }
        );
      }

      const user = userResult.rows[0];

      // Generate reset token
      const resetToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      // Store reset token (you might want to create a separate table for this)
      // For now, we'll use a simple approach with a temporary table or update user record

      // TODO: Create a password_reset_tokens table or use a similar approach
      // For now, we'll just log the token
      console.log(`Password reset token for ${email}: ${resetToken}`);
      console.log(`Token expires at: ${expiresAt}`);

      // TODO: Send reset email with token
      // The email should contain a link like: /auth/student/reset-password?token=${resetToken}

      return NextResponse.json(
        {
          message:
            "If an account with that email exists, a password reset link has been sent.",
        },
        { status: 200 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
