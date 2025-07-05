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
      // Check if user exists and is not verified
      const userResult = await client.query(
        "SELECT id, email, first_name, last_name, email_verified FROM users WHERE email = $1 AND role = 'student'",
        [email]
      );

      if (userResult.rows.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const user = userResult.rows[0];

      if (user.email_verified) {
        return NextResponse.json(
          { error: "Email is already verified" },
          { status: 400 }
        );
      }

      // Delete any existing verification tokens for this user
      await client.query(
        "DELETE FROM verification_tokens WHERE identifier = $1",
        [email]
      );

      // Generate new verification token
      const verificationToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Store new verification token
      await client.query(
        `INSERT INTO verification_tokens (identifier, token, expires) VALUES ($1, $2, $3)`,
        [email, verificationToken, expiresAt]
      );

      // Send verification email
      const verifyUrl = `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/auth/student/verify-email?token=${verificationToken}`;

      try {
        await sendEmail({
          to: email,
          subject: "Verify your Smart CBT account",
          html: `<p>Hello ${user.first_name},</p><p>You requested a new verification email. Please verify your email by clicking the link below:</p><p><a href="${verifyUrl}">Verify Email</a></p><p>If you did not request this, you can ignore this email.</p>`,
        });
        console.log(
          "✅ Resend verification email sent successfully to:",
          email
        );
      } catch (emailError) {
        console.error(
          "❌ Failed to send resend verification email:",
          emailError
        );
        // Don't fail the request if email fails, just log it
        // In development, this is expected behavior
      }

      console.log("✅ Resend verification token generated for user:", {
        email,
        userId: user.id,
      });
      return NextResponse.json(
        { message: "Verification email sent successfully" },
        { status: 200 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
