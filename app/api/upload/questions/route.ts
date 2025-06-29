import { type NextRequest, NextResponse } from "next/server"

// Mock file processing - in production, integrate with Gemini AI for document parsing
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Please upload PDF, DOCX, or TXT files." }, { status: 400 })
    }

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock extracted questions
    const extractedQuestions = [
      {
        id: "q1",
        question: "What is the capital of Nigeria?",
        options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
        correctAnswer: 1,
        subject: "Geography",
        difficulty: "easy",
        explanation: "Abuja has been the capital of Nigeria since 1991.",
      },
      {
        id: "q2",
        question: "Calculate the area of a rectangle with length 8cm and width 5cm.",
        options: ["40 cm²", "26 cm²", "13 cm²", "35 cm²"],
        correctAnswer: 0,
        subject: "Mathematics",
        difficulty: "easy",
        explanation: "Area of rectangle = length × width = 8 × 5 = 40 cm²",
      },
      {
        id: "q3",
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural Gas", "Solar", "Petroleum"],
        correctAnswer: 2,
        subject: "Physics",
        difficulty: "medium",
        explanation: "Solar energy is renewable as it comes from the sun which is an inexhaustible source.",
      },
    ]

    return NextResponse.json({
      success: true,
      message: `Successfully extracted ${extractedQuestions.length} questions from ${file.name}`,
      questions: extractedQuestions,
      metadata: {
        filename: file.name,
        fileSize: file.size,
        processedAt: new Date().toISOString(),
        totalQuestions: extractedQuestions.length,
        subjects: [...new Set(extractedQuestions.map((q) => q.subject))],
        difficulties: [...new Set(extractedQuestions.map((q) => q.difficulty))],
      },
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}
