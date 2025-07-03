import { type NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { sendEmail } from "@/lib/email";

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

      // Store reset token
      await client.query(
        `INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)`,
        [user.id, resetToken, expiresAt]
      );

      // Send reset email
      const resetUrl = `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/auth/student/reset-password?token=${resetToken}`;
      await sendEmail({
        to: email,
        subject: "Reset your Smart CBT password",
        html: `<p>Hello ${user.first_name},</p><p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetUrl}">Reset Password</a></p><p>If you did not request this, you can ignore this email.</p>`,
      });

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
