import { geminiService, type MCQQuestion } from "@/lib/ai/gemini"

export interface UploadResult {
  success: boolean
  questions: MCQQuestion[]
  errors: string[]
  processed: number
  skipped: number
}

export interface BulkUploadData {
  questions: Array<{
    question: string
    optionA: string
    optionB: string
    optionC: string
    optionD: string
    correctAnswer: string
    subject?: string
    topic?: string
    difficulty?: string
    explanation?: string
  }>
}

export class FileProcessor {
  async processTextFile(content: string): Promise<UploadResult> {
    try {
      // Try to parse as JSON first
      let data: BulkUploadData
      try {
        data = JSON.parse(content)
      } catch {
        // If not JSON, treat as plain text and extract with AI
        const questions = await geminiService.extractQuestionsFromDocument(content)
        return {
          success: true,
          questions,
          errors: [],
          processed: questions.length,
          skipped: 0,
        }
      }

      // Process structured data
      const questions: MCQQuestion[] = []
      const errors: string[] = []
      let skipped = 0

      for (let i = 0; i < data.questions.length; i++) {
        const item = data.questions[i]

        try {
          const question: MCQQuestion = {
            question: item.question,
            options: [item.optionA, item.optionB, item.optionC, item.optionD],
            correctAnswer: this.parseCorrectAnswer(item.correctAnswer),
            explanation: item.explanation,
            subject: item.subject || "General",
            difficulty: (item.difficulty as "Easy" | "Medium" | "Hard") || "Medium",
            topic: item.topic,
          }

          // Validate question
          const validation = await geminiService.validateQuestion(question)
          if (validation.isValid) {
            questions.push(question)
          } else {
            errors.push(`Question ${i + 1}: ${validation.issues.join(", ")}`)
            skipped++
          }
        } catch (error) {
          errors.push(`Question ${i + 1}: Invalid format - ${error}`)
          skipped++
        }
      }

      return {
        success: questions.length > 0,
        questions,
        errors,
        processed: questions.length,
        skipped,
      }
    } catch (error) {
      return {
        success: false,
        questions: [],
        errors: [`Processing failed: ${error}`],
        processed: 0,
        skipped: 0,
      }
    }
  }

  async processCSVFile(content: string): Promise<UploadResult> {
    try {
      const lines = content.split("\n").filter((line) => line.trim())
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())

      const questions: MCQQuestion[] = []
      const errors: string[] = []
      let skipped = 0

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim())

        try {
          const questionData: any = {}
          headers.forEach((header, index) => {
            questionData[header] = values[index] || ""
          })

          const question: MCQQuestion = {
            question: questionData.question || questionData.q,
            options: [
              questionData.optiona || questionData.a,
              questionData.optionb || questionData.b,
              questionData.optionc || questionData.c,
              questionData.optiond || questionData.d,
            ],
            correctAnswer: this.parseCorrectAnswer(questionData.correct || questionData.answer),
            explanation: questionData.explanation,
            subject: questionData.subject || "General",
            difficulty: (questionData.difficulty as "Easy" | "Medium" | "Hard") || "Medium",
            topic: questionData.topic,
          }

          // Validate question
          const validation = await geminiService.validateQuestion(question)
          if (validation.isValid) {
            questions.push(question)
          } else {
            errors.push(`Row ${i + 1}: ${validation.issues.join(", ")}`)
            skipped++
          }
        } catch (error) {
          errors.push(`Row ${i + 1}: Invalid format - ${error}`)
          skipped++
        }
      }

      return {
        success: questions.length > 0,
        questions,
        errors,
        processed: questions.length,
        skipped,
      }
    } catch (error) {
      return {
        success: false,
        questions: [],
        errors: [`CSV processing failed: ${error}`],
        processed: 0,
        skipped: 0,
      }
    }
  }

  async processPDFFile(content: string): Promise<UploadResult> {
    try {
      // Extract questions using AI
      const questions = await geminiService.extractQuestionsFromDocument(content)

      // Validate all questions
      const validQuestions: MCQQuestion[] = []
      const errors: string[] = []
      let skipped = 0

      for (let i = 0; i < questions.length; i++) {
        const validation = await geminiService.validateQuestion(questions[i])
        if (validation.isValid) {
          validQuestions.push(questions[i])
        } else {
          errors.push(`Question ${i + 1}: ${validation.issues.join(", ")}`)
          skipped++
        }
      }

      return {
        success: validQuestions.length > 0,
        questions: validQuestions,
        errors,
        processed: validQuestions.length,
        skipped,
      }
    } catch (error) {
      return {
        success: false,
        questions: [],
        errors: [`PDF processing failed: ${error}`],
        processed: 0,
        skipped: 0,
      }
    }
  }

  private parseCorrectAnswer(answer: string): number {
    const normalized = answer.toLowerCase().trim()

    // Handle A, B, C, D format
    if (normalized === "a" || normalized === "option a") return 0
    if (normalized === "b" || normalized === "option b") return 1
    if (normalized === "c" || normalized === "option c") return 2
    if (normalized === "d" || normalized === "option d") return 3

    // Handle numeric format (0-3 or 1-4)
    const num = Number.parseInt(normalized)
    if (num >= 0 && num <= 3) return num
    if (num >= 1 && num <= 4) return num - 1

    throw new Error(`Invalid correct answer format: ${answer}`)
  }

  async generateSampleCSV(): Promise<string> {
    const headers = [
      "question",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "correct",
      "subject",
      "topic",
      "difficulty",
      "explanation",
    ]

    const sampleData = [
      [
        "What is 2 + 2?",
        "3",
        "4",
        "5",
        "6",
        "B",
        "Mathematics",
        "Basic Arithmetic",
        "Easy",
        "Simple addition: 2 + 2 = 4",
      ],
      [
        "Which planet is closest to the Sun?",
        "Venus",
        "Mercury",
        "Earth",
        "Mars",
        "B",
        "Science",
        "Solar System",
        "Medium",
        "Mercury is the innermost planet in our solar system",
      ],
    ]

    const csv = [headers.join(",")]
    sampleData.forEach((row) => {
      csv.push(row.map((cell) => `"${cell}"`).join(","))
    })

    return csv.join("\n")
  }

  async generateSampleJSON(): Promise<string> {
    const sample = {
      questions: [
        {
          question: "What is the capital of Nigeria?",
          optionA: "Lagos",
          optionB: "Abuja",
          optionC: "Kano",
          optionD: "Port Harcourt",
          correctAnswer: "B",
          subject: "Geography",
          topic: "African Capitals",
          difficulty: "Easy",
          explanation: "Abuja has been the capital of Nigeria since 1991",
        },
        {
          question: "Which of the following is a prime number?",
          optionA: "15",
          optionB: "21",
          optionC: "17",
          optionD: "25",
          correctAnswer: "C",
          subject: "Mathematics",
          topic: "Number Theory",
          difficulty: "Medium",
          explanation: "17 is only divisible by 1 and itself, making it a prime number",
        },
      ],
    }

    return JSON.stringify(sample, null, 2)
  }
}

export const fileProcessor = new FileProcessor()
