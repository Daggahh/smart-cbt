import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { answers, timeSpent } = await request.json()
    const examId = params.id

    // Mock exam data with correct answers
    const examAnswers = {
      1: 1, // Question 1: correct answer is option 1 (x = 4)
      2: 0, // Question 2: correct answer is option 0 (154 cm²)
      3: 1, // Question 3: correct answer is option 1 (3)
    }

    // Calculate score
    let correctAnswers = 0
    const totalQuestions = Object.keys(examAnswers).length

    Object.entries(answers).forEach(([questionId, selectedAnswer]) => {
      if (examAnswers[Number.parseInt(questionId)] === selectedAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / totalQuestions) * 100)
    const grade = score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : score >= 50 ? "D" : "F"
    const passed = score >= 50

    // Generate AI feedback using mock data
    const aiAnalysis = {
      overallPerformance: score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement",
      strengths: ["Algebra", "Basic calculations"],
      weaknesses: score < 70 ? ["Geometry", "Advanced concepts"] : [],
      recommendations:
        score < 70
          ? [
              "Review geometry formulas and practice area calculations",
              "Strengthen understanding of logarithms",
              "Practice more word problems",
            ]
          : [
              "Continue practicing to maintain your excellent performance",
              "Challenge yourself with more advanced problems",
            ],
    }

    // Mock result data
    const result = {
      id: `result_${Date.now()}`,
      examId,
      userId: "user_123", // This would come from authentication
      totalQuestions,
      questionsAnswered: Object.keys(answers).length,
      correctAnswers,
      score,
      grade,
      passed,
      timeSpent,
      submittedAt: new Date().toISOString(),
      aiAnalysis,
    }

    // In production, save to database and send email notification
    console.log("Exam submitted:", result)

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (error) {
    console.error("Submit exam error:", error)
    return NextResponse.json({ error: "Failed to submit exam" }, { status: 500 })
  }
}
