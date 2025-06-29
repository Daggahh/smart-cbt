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

    if (!decoded || !decoded.userId || decoded.role !== "student") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const client = await pool.connect();

    try {
      // Get student's exam registrations
      const registrationsResult = await client.query(
        `SELECT 
          er.id,
          er.registration_date,
          er.status,
          er.seat_number,
          er.center_location,
          e.title as exam_title,
          e.duration_minutes,
          e.total_questions,
          e.start_time,
          e.end_time,
          eb.batch_name,
          eb.start_time as batch_start_time,
          eb.end_time as batch_end_time
        FROM exam_registrations er
        JOIN exams e ON er.exam_id = e.id
        JOIN exam_batches eb ON er.batch_id = eb.id
        WHERE er.user_id = $1
        ORDER BY er.registration_date DESC
        LIMIT 10`,
        [decoded.userId]
      );

      // Get student's recent exam results
      const resultsResult = await client.query(
        `SELECT 
          er.id,
          er.total_questions,
          er.questions_answered,
          er.correct_answers,
          er.total_points,
          er.points_earned,
          er.percentage_score,
          er.grade,
          er.passed,
          er.time_taken,
          er.submitted_at,
          e.title as exam_title,
          e.duration_minutes
        FROM exam_results er
        JOIN exams e ON er.exam_id = e.id
        WHERE er.user_id = $1
        ORDER BY er.submitted_at DESC
        LIMIT 5`,
        [decoded.userId]
      );

      // Get upcoming exams (where student is registered and exam hasn't started)
      const upcomingExamsResult = await client.query(
        `SELECT 
          er.id,
          e.title as exam_title,
          e.duration_minutes,
          e.total_questions,
          eb.batch_name,
          eb.start_time as batch_start_time,
          eb.end_time as batch_end_time,
          er.seat_number,
          er.center_location
        FROM exam_registrations er
        JOIN exams e ON er.exam_id = e.id
        JOIN exam_batches eb ON er.batch_id = eb.id
        WHERE er.user_id = $1 
          AND er.status = 'registered'
          AND eb.start_time > CURRENT_TIMESTAMP
        ORDER BY eb.start_time ASC
        LIMIT 5`,
        [decoded.userId]
      );

      // Get student's statistics
      const statsResult = await client.query(
        `SELECT 
          COUNT(*) as total_exams_taken,
          AVG(percentage_score) as average_score,
          COUNT(CASE WHEN passed = true THEN 1 END) as exams_passed,
          COUNT(CASE WHEN passed = false THEN 1 END) as exams_failed
        FROM exam_results
        WHERE user_id = $1`,
        [decoded.userId]
      );

      const stats = statsResult.rows[0] || {
        total_exams_taken: 0,
        average_score: 0,
        exams_passed: 0,
        exams_failed: 0,
      };

      return NextResponse.json({
        registrations: registrationsResult.rows,
        recentResults: resultsResult.rows,
        upcomingExams: upcomingExamsResult.rows,
        statistics: {
          totalExamsTaken: parseInt(stats.total_exams_taken) || 0,
          averageScore: parseFloat(stats.average_score) || 0,
          examsPassed: parseInt(stats.exams_passed) || 0,
          examsFailed: parseInt(stats.exams_failed) || 0,
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Student dashboard error:", error);

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
