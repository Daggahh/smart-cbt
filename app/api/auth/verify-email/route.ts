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
      // TODO: Validate verification token from database
      // For now, we'll use a simple approach
      // In a real implementation, you'd check against a verification_tokens table

      // Check if token exists and is not expired
      // This is a placeholder - you'll need to implement proper token validation
      const tokenValid = true; // Replace with actual token validation

      if (!tokenValid) {
        return NextResponse.json(
          { error: "Invalid or expired verification token" },
          { status: 400 }
        );
      }

      // TODO: Get user ID from token
      // For now, we'll use a placeholder
      const userId = "placeholder-user-id"; // Replace with actual user ID from token

      // Update user email verification status
      await client.query(
        "UPDATE users SET email_verified = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1",
        [userId]
      );

      // TODO: Clear the verification token
      // Delete from verification_tokens table or similar

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
