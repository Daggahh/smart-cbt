import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      registrationNumber,
    } = await request.json();

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
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
      // Check if email already exists
      const existingUser = await client.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }

      // Check if registration number already exists (if provided)
      if (registrationNumber) {
        const existingRegNumber = await client.query(
          "SELECT id FROM users WHERE registration_number = $1",
          [registrationNumber]
        );

        if (existingRegNumber.rows.length > 0) {
          return NextResponse.json(
            { error: "Registration number already exists" },
            { status: 409 }
          );
        }
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Generate verification token
      const verificationToken = crypto.randomUUID();

      // Insert new user
      const result = await client.query(
        `INSERT INTO users (
          email, 
          password_hash, 
          first_name, 
          last_name, 
          role, 
          phone, 
          date_of_birth, 
          registration_number,
          email_verified
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [
          email,
          passwordHash,
          firstName,
          lastName,
          "student",
          phone || null,
          dateOfBirth || null,
          registrationNumber || null,
          false,
        ]
      );

      const userId = result.rows[0].id;

      // TODO: Send verification email with token
      // For now, we'll just log the token
      console.log(`Verification token for ${email}: ${verificationToken}`);

      // Store verification token (you might want to create a separate table for this)
      // For now, we'll use a simple approach

      return NextResponse.json(
        {
          message:
            "Account created successfully. Please check your email to verify your account.",
          userId,
        },
        { status: 201 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
