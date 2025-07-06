import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { users, exams } from "@/lib/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import { getSystemUptime } from "@/lib/admin-utils";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userRole = (session.user as any)?.role;
    if (userRole !== "admin" && userRole !== "super_admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Total candidates (students)
    const candidates = await db.query.users.findMany({
      where: eq(users.role, "student"),
    });
    const totalCandidates = candidates.length;

    // Active exams (status = 'active')
    const activeExamList = await db.query.exams.findMany({
      where: eq(exams.status, "active"),
    });
    const activeExams = activeExamList.length;

    // Completed today (exams with status = 'completed' and end_time = today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const completedExamList = await db.query.exams.findMany({
      where: and(
        eq(exams.status, "completed"),
        gte(exams.end_time, today),
        lte(exams.end_time, tomorrow)
      ),
    });
    const completedToday = completedExamList.length;

    return NextResponse.json({
      success: true,
      data: {
        totalCandidates,
        activeExams,
        completedToday,
        systemUptime: getSystemUptime(),
      },
    });
  } catch (error) {
    console.error("Admin dashboard metrics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
