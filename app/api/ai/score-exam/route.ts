import { type NextRequest, NextResponse } from "next/server"

// Mock AI scoring service - in production, integrate with Gemini AI
export async function POST(request: NextRequest) {
  try {
    const { answers, questions } = await request.json()

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const results = questions.map((question: any, index: number) => {
      const userAnswer = answers[question.id]
      const isCorrect = userAnswer === question.correctAnswer

      // Generate AI feedback for each question
      const feedback = generateAIFeedback(question, userAnswer, isCorrect)

      return {
        questionId: question.id,
        isCorrect,
        pointsEarned: isCorrect ? question.points : 0,
        feedback,
      }
    })

    const totalPoints = results.reduce((sum, r) => sum + r.pointsEarned, 0)
    const maxPoints = questions.reduce((sum: number, q: any) => sum + q.points, 0)
    const percentage = Math.round((totalPoints / maxPoints) * 100)

    // Generate overall performance analysis
    const overallAnalysis = generateOverallAnalysis(results, percentage)

    return NextResponse.json({
      success: true,
      results,
      summary: {
        totalPoints,
        maxPoints,
        percentage,
        grade: getGrade(percentage),
        passed: percentage >= 50,
      },
      analysis: overallAnalysis,
    })
  } catch (error) {
    console.error("AI scoring error:", error)
    return NextResponse.json({ error: "Failed to score exam" }, { status: 500 })
  }
}

function generateAIFeedback(question: any, userAnswer: number, isCorrect: boolean) {
  if (isCorrect) {
    return {
      message: "Correct! Well done.",
      explanation: "You selected the right answer.",
      tips: [],
    }
  }

  // Generate specific feedback based on question type
  const feedbackMap: Record<string, any> = {
    "What is the value of x in the equation 2x + 5 = 13?": {
      message: "Incorrect. The correct answer is x = 4.",
      explanation: "To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4.",
      tips: [
        "Remember to isolate the variable by performing inverse operations",
        "Always check your answer by substituting back into the original equation",
      ],
    },
    "Find the area of a circle with radius 7 cm. (Use π = 22/7)": {
      message: "Incorrect. The correct answer is 154 cm².",
      explanation: "Area of circle = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm²",
      tips: ["Remember the formula: Area = πr²", "Be careful with calculations involving fractions"],
    },
  }

  return (
    feedbackMap[question.question] || {
      message: "Incorrect answer.",
      explanation: "Please review the concept and try again.",
      tips: ["Study the relevant topic", "Practice similar problems"],
    }
  )
}

function generateOverallAnalysis(results: any[], percentage: number) {
  const correctCount = results.filter((r) => r.isCorrect).length
  const totalCount = results.length

  return {
    performance: percentage >= 80 ? "Excellent" : percentage >= 60 ? "Good" : "Needs Improvement",
    strengths: correctCount > totalCount * 0.7 ? ["Problem solving", "Mathematical reasoning"] : [],
    weaknesses: correctCount < totalCount * 0.5 ? ["Basic concepts", "Calculation accuracy"] : [],
    recommendations:
      percentage < 70
        ? ["Review fundamental concepts", "Practice more problems", "Focus on areas where you made mistakes"]
        : ["Continue practicing to maintain performance", "Challenge yourself with advanced problems"],
  }
}

function getGrade(percentage: number): string {
  if (percentage >= 90) return "A+"
  if (percentage >= 80) return "A"
  if (percentage >= 70) return "B"
  if (percentage >= 60) return "C"
  if (percentage >= 50) return "D"
  return "F"
}
