import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export interface MCQQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  subject?: string
  difficulty?: "Easy" | "Medium" | "Hard"
  topic?: string
}

export interface ExamAnalysis {
  score: number
  totalQuestions: number
  correctAnswers: number
  subjectBreakdown: Record<string, { correct: number; total: number; percentage: number }>
  weakAreas: string[]
  recommendations: string[]
  timeAnalysis?: {
    totalTime: number
    averageTimePerQuestion: number
    efficiency: "Excellent" | "Good" | "Needs Improvement"
  }
}

export class GeminiAIService {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  async extractQuestionsFromDocument(documentText: string): Promise<MCQQuestion[]> {
    try {
      const prompt = `
        Extract multiple choice questions from the following document text. 
        Format each question as JSON with the following structure:
        {
          "question": "The question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Brief explanation of the correct answer",
          "subject": "Subject name",
          "difficulty": "Easy|Medium|Hard",
          "topic": "Specific topic"
        }

        Return an array of questions in valid JSON format.
        Document text: ${documentText}
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Parse the JSON response
      const questions = JSON.parse(text) as MCQQuestion[]
      return questions
    } catch (error) {
      console.error("Error extracting questions:", error)
      throw new Error("Failed to extract questions from document")
    }
  }

  async scoreExam(questions: MCQQuestion[], answers: Record<number, number>, timeSpent: number): Promise<ExamAnalysis> {
    try {
      let correctAnswers = 0
      const subjectBreakdown: Record<string, { correct: number; total: number; percentage: number }> = {}

      // Calculate scores
      questions.forEach((question, index) => {
        const userAnswer = answers[index]
        const isCorrect = userAnswer === question.correctAnswer

        if (isCorrect) correctAnswers++

        // Subject breakdown
        const subject = question.subject || "General"
        if (!subjectBreakdown[subject]) {
          subjectBreakdown[subject] = { correct: 0, total: 0, percentage: 0 }
        }
        subjectBreakdown[subject].total++
        if (isCorrect) subjectBreakdown[subject].correct++
      })

      // Calculate percentages
      Object.keys(subjectBreakdown).forEach((subject) => {
        const data = subjectBreakdown[subject]
        data.percentage = Math.round((data.correct / data.total) * 100)
      })

      const score = Math.round((correctAnswers / questions.length) * 100)

      // Generate AI analysis
      const analysisPrompt = `
        Analyze this exam performance and provide insights:
        - Total Questions: ${questions.length}
        - Correct Answers: ${correctAnswers}
        - Score: ${score}%
        - Time Spent: ${timeSpent} minutes
        - Subject Breakdown: ${JSON.stringify(subjectBreakdown)}

        Provide:
        1. Weak areas (subjects with <70% score)
        2. Specific recommendations for improvement
        3. Time efficiency analysis

        Return as JSON with weakAreas (array) and recommendations (array).
      `

      const analysisResult = await this.model.generateContent(analysisPrompt)
      const analysisResponse = await analysisResult.response
      const analysisText = analysisResponse.text()

      let aiAnalysis
      try {
        aiAnalysis = JSON.parse(analysisText)
      } catch {
        // Fallback if AI response isn't valid JSON
        aiAnalysis = {
          weakAreas: Object.keys(subjectBreakdown).filter((subject) => subjectBreakdown[subject].percentage < 70),
          recommendations: ["Review weak areas", "Practice more questions", "Focus on time management"],
        }
      }

      // Time analysis
      const averageTimePerQuestion = timeSpent / questions.length
      let efficiency: "Excellent" | "Good" | "Needs Improvement" = "Good"

      if (averageTimePerQuestion < 1.5) efficiency = "Excellent"
      else if (averageTimePerQuestion > 3) efficiency = "Needs Improvement"

      return {
        score,
        totalQuestions: questions.length,
        correctAnswers,
        subjectBreakdown,
        weakAreas: aiAnalysis.weakAreas || [],
        recommendations: aiAnalysis.recommendations || [],
        timeAnalysis: {
          totalTime: timeSpent,
          averageTimePerQuestion,
          efficiency,
        },
      }
    } catch (error) {
      console.error("Error scoring exam:", error)
      throw new Error("Failed to score exam")
    }
  }

  async generateQuestions(subject: string, topic: string, count = 10): Promise<MCQQuestion[]> {
    try {
      const prompt = `
        Generate ${count} multiple choice questions for ${subject} on the topic of ${topic}.
        Each question should have 4 options with only one correct answer.
        
        Format as JSON array with this structure:
        {
          "question": "Question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Why this answer is correct",
          "subject": "${subject}",
          "difficulty": "Medium",
          "topic": "${topic}"
        }

        Make questions challenging but fair, suitable for JAMB/UTME level.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const questions = JSON.parse(text) as MCQQuestion[]
      return questions
    } catch (error) {
      console.error("Error generating questions:", error)
      throw new Error("Failed to generate questions")
    }
  }

  async validateQuestion(question: MCQQuestion): Promise<{ isValid: boolean; issues: string[] }> {
    try {
      const prompt = `
        Validate this multiple choice question for quality and correctness:
        
        Question: ${question.question}
        Options: ${question.options.join(", ")}
        Correct Answer: ${question.options[question.correctAnswer]}
        
        Check for:
        1. Clear and unambiguous question
        2. Plausible distractors
        3. Only one clearly correct answer
        4. Appropriate difficulty level
        5. Grammar and spelling
        
        Return JSON: {"isValid": boolean, "issues": ["issue1", "issue2"]}
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return JSON.parse(text)
    } catch (error) {
      console.error("Error validating question:", error)
      return { isValid: false, issues: ["Validation failed"] }
    }
  }
}

export const geminiService = new GeminiAIService()
