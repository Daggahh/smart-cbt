import { type NextRequest, NextResponse } from "next/server"
import { geminiService } from "@/lib/ai/gemini"
import { emailService } from "@/lib/email/service"

export async function POST(request: NextRequest) {
  try {
    const { questions, answers, timeSpent, studentInfo } = await request.json()

    if (!questions || !answers) {
      return NextResponse.json({ error: "Questions and answers are required" }, { status: 400 })
    }

    // Score the exam using Gemini AI
    const analysis = await geminiService.scoreExam(questions, answers, timeSpent || 0)

    // Determine grade based on score
    let grade = "F"
    if (analysis.score >= 90) grade = "A+"
    else if (analysis.score >= 80) grade = "A"
    else if (analysis.score >= 70) grade = "B"
    else if (analysis.score >= 60) grade = "C"
    else if (analysis.score >= 50) grade = "D"

    // Send email with results if student info provided
    if (studentInfo?.email) {
      const emailData = {
        studentName: studentInfo.name,
        studentEmail: studentInfo.email,
        examTitle: studentInfo.examTitle || "Practice Exam",
        score: analysis.score,
        grade,
        completedDate: new Date().toLocaleDateString(),
        analysis,
      }

      // Send email asynchronously (don't wait for it)
      emailService.sendExamResults(emailData).catch(console.error)
    }

    return NextResponse.json({
      success: true,
      analysis: {
        ...analysis,
        grade,
      },
    })
  } catch (error) {
    console.error("Error scoring exam:", error)
    return NextResponse.json({ error: "Failed to score exam" }, { status: 500 })
  }
}
