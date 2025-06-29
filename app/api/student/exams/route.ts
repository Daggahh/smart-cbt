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
      // Get available exams with registration status
      const examsResult = await client.query(
        `SELECT 
          e.id,
          e.title,
          e.description,
          e.duration_minutes,
          e.total_questions,
          e.passing_score,
          e.start_time,
          e.end_time,
          e.status,
          i.name as institution_name,
          eb.id as batch_id,
          eb.batch_name,
          eb.start_time as batch_start_time,
          eb.end_time as batch_end_time,
          eb.max_candidates,
          eb.current_candidates,
          eb.status as batch_status,
          CASE 
            WHEN er.id IS NOT NULL THEN 'registered'
            WHEN eb.current_candidates >= eb.max_candidates THEN 'full'
            WHEN eb.start_time <= CURRENT_TIMESTAMP THEN 'started'
            WHEN eb.end_time <= CURRENT_TIMESTAMP THEN 'ended'
            ELSE 'available'
          END as registration_status,
          er.id as registration_id,
          er.status as registration_status_detail,
          er.seat_number,
          er.center_location
        FROM exams e
        JOIN institutions i ON e.institution_id = i.id
        JOIN exam_batches eb ON e.id = eb.exam_id
        LEFT JOIN exam_registrations er ON eb.id = er.batch_id AND er.user_id = $1
        WHERE e.is_active = true 
          AND e.status IN ('scheduled', 'active')
          AND eb.status = 'scheduled'
        ORDER BY eb.start_time ASC`,
        [decoded.userId]
      );

      // Group exams by exam ID and include all batches
      const examsMap = new Map();

      examsResult.rows.forEach((row) => {
        if (!examsMap.has(row.id)) {
          examsMap.set(row.id, {
            id: row.id,
            title: row.title,
            description: row.description,
            durationMinutes: row.duration_minutes,
            totalQuestions: row.total_questions,
            passingScore: row.passing_score,
            startTime: row.start_time,
            endTime: row.end_time,
            status: row.status,
            institutionName: row.institution_name,
            batches: [],
            registrationStatus: row.registration_status,
            registrationId: row.registration_id,
            registrationStatusDetail: row.registration_status_detail,
            seatNumber: row.seat_number,
            centerLocation: row.center_location,
          });
        }

        const exam = examsMap.get(row.id);
        exam.batches.push({
          id: row.batch_id,
          name: row.batch_name,
          startTime: row.batch_start_time,
          endTime: row.batch_end_time,
          maxCandidates: row.max_candidates,
          currentCandidates: row.current_candidates,
          status: row.batch_status,
          available: row.current_candidates < row.max_candidates,
        });
      });

      return NextResponse.json({
        exams: Array.from(examsMap.values()),
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Student exams error:", error);

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
