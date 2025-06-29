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

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const client = await pool.connect();

    try {
      // Get total count of results
      const countResult = await client.query(
        "SELECT COUNT(*) FROM exam_results WHERE user_id = $1",
        [decoded.userId]
      );

      const totalResults = parseInt(countResult.rows[0].count);

      // Get paginated exam results
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
          er.ai_feedback,
          e.title as exam_title,
          e.description as exam_description,
          e.duration_minutes,
          e.passing_score,
          i.name as institution_name,
          eb.batch_name
        FROM exam_results er
        JOIN exams e ON er.exam_id = e.id
        JOIN institutions i ON e.institution_id = i.id
        LEFT JOIN exam_batches eb ON er.session_id IN (
          SELECT id FROM exam_sessions WHERE batch_id = eb.id
        )
        WHERE er.user_id = $1
        ORDER BY er.submitted_at DESC
        LIMIT $2 OFFSET $3`,
        [decoded.userId, limit, offset]
      );

      // Get overall statistics
      const statsResult = await client.query(
        `SELECT 
          COUNT(*) as total_exams,
          AVG(percentage_score) as average_score,
          MAX(percentage_score) as highest_score,
          MIN(percentage_score) as lowest_score,
          COUNT(CASE WHEN passed = true THEN 1 END) as exams_passed,
          COUNT(CASE WHEN passed = false THEN 1 END) as exams_failed,
          AVG(time_taken) as average_time_taken
        FROM exam_results
        WHERE user_id = $1`,
        [decoded.userId]
      );

      const stats = statsResult.rows[0] || {
        total_exams: 0,
        average_score: 0,
        highest_score: 0,
        lowest_score: 0,
        exams_passed: 0,
        exams_failed: 0,
        average_time_taken: 0,
      };

      // Get performance by subject (if available)
      const subjectStatsResult = await client.query(
        `SELECT 
          s.name as subject_name,
          COUNT(*) as exam_count,
          AVG(er.percentage_score) as average_score,
          COUNT(CASE WHEN er.passed = true THEN 1 END) as passed_count
        FROM exam_results er
        JOIN exams e ON er.exam_id = e.id
        JOIN question_banks qb ON e.id IN (
          SELECT exam_id FROM exam_questions eq 
          JOIN questions q ON eq.question_id = q.id 
          WHERE q.question_bank_id = qb.id
        )
        JOIN subjects s ON qb.subject_id = s.id
        WHERE er.user_id = $1
        GROUP BY s.id, s.name
        ORDER BY average_score DESC`,
        [decoded.userId]
      );

      return NextResponse.json({
        results: resultsResult.rows.map((row) => ({
          id: row.id,
          examTitle: row.exam_title,
          examDescription: row.exam_description,
          institutionName: row.institution_name,
          batchName: row.batch_name,
          totalQuestions: row.total_questions,
          questionsAnswered: row.questions_answered,
          correctAnswers: row.correct_answers,
          totalPoints: row.total_points,
          pointsEarned: row.points_earned,
          percentageScore: parseFloat(row.percentage_score),
          grade: row.grade,
          passed: row.passed,
          timeTaken: row.time_taken,
          submittedAt: row.submitted_at,
          aiFeedback: row.ai_feedback,
          durationMinutes: row.duration_minutes,
          passingScore: row.passing_score,
        })),
        pagination: {
          page,
          limit,
          totalResults,
          totalPages: Math.ceil(totalResults / limit),
          hasNextPage: page * limit < totalResults,
          hasPrevPage: page > 1,
        },
        statistics: {
          totalExams: parseInt(stats.total_exams) || 0,
          averageScore: parseFloat(stats.average_score) || 0,
          highestScore: parseFloat(stats.highest_score) || 0,
          lowestScore: parseFloat(stats.lowest_score) || 0,
          examsPassed: parseInt(stats.exams_passed) || 0,
          examsFailed: parseInt(stats.exams_failed) || 0,
          averageTimeTaken: parseFloat(stats.average_time_taken) || 0,
          passRate:
            stats.total_exams > 0
              ? (parseInt(stats.exams_passed) / parseInt(stats.total_exams)) *
                100
              : 0,
        },
        subjectPerformance: subjectStatsResult.rows.map((row) => ({
          subjectName: row.subject_name,
          examCount: parseInt(row.exam_count),
          averageScore: parseFloat(row.average_score),
          passedCount: parseInt(row.passed_count),
          passRate:
            row.exam_count > 0
              ? (parseInt(row.passed_count) / parseInt(row.exam_count)) * 100
              : 0,
        })),
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Student results error:", error);

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
