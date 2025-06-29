"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, ChevronLeft, ChevronRight, Flag, AlertTriangle, CheckCircle, Save } from "lucide-react"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

// Mock exam data
const examData = {
  id: 1,
  title: "Mathematics Mock Exam",
  duration: 120, // minutes
  totalQuestions: 50,
  questions: [
    {
      id: 1,
      question: "What is the value of x in the equation 2x + 5 = 13?",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correctAnswer: 1,
      subject: "Algebra",
    },
    {
      id: 2,
      question: "Find the area of a circle with radius 7 cm. (Use π = 22/7)",
      options: ["154 cm²", "144 cm²", "164 cm²", "174 cm²"],
      correctAnswer: 0,
      subject: "Geometry",
    },
    {
      id: 3,
      question: "If log₂ 8 = x, what is the value of x?",
      options: ["2", "3", "4", "8"],
      correctAnswer: 1,
      subject: "Logarithms",
    },
    // Add more questions as needed
  ],
}

export default function ExamInterface({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(examData.duration * 60) // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [examStarted, setExamStarted] = useState(false)

  // Timer effect
  useEffect(() => {
    if (!examStarted || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [examStarted, timeRemaining])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleFlagQuestion = (questionId: number) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const handleSubmitExam = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calculate score
    let correctAnswers = 0
    examData.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / examData.questions.length) * 100)

    // Redirect to results page
    window.location.href = `/student/results?score=${score}&total=${examData.questions.length}&correct=${correctAnswers}`
  }

  const getQuestionStatus = (index: number) => {
    const questionId = examData.questions[index].id
    if (answers[questionId] !== undefined) return "answered"
    if (flaggedQuestions.has(questionId)) return "flagged"
    return "unanswered"
  }

  const answeredCount = Object.keys(answers).length
  const progressPercentage = (answeredCount / examData.questions.length) * 100

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <SmartCBTLogo className="w-16 h-16" />
            </div>
            <CardTitle className="text-2xl">{examData.title}</CardTitle>
            <CardDescription>Please read the instructions carefully before starting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{examData.totalQuestions}</div>
                <div className="text-sm text-slate-600">Questions</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{examData.duration} min</div>
                <div className="text-sm text-slate-600">Duration</div>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important Instructions:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• You have {examData.duration} minutes to complete this exam</li>
                  <li>• Each question has only one correct answer</li>
                  <li>• You can flag questions for review</li>
                  <li>• Your progress is automatically saved</li>
                  <li>• The exam will auto-submit when time expires</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Button className="w-full" size="lg" onClick={() => setExamStarted(true)}>
              Start Exam
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestionData = examData.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Exam Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SmartCBTLogo className="w-8 h-8" />
              <div>
                <h1 className="font-semibold text-slate-800">{examData.title}</h1>
                <p className="text-xs text-slate-600">
                  Question {currentQuestion + 1} of {examData.questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-slate-800">{formatTime(timeRemaining)}</div>
                <div className="text-xs text-slate-600">Time Remaining</div>
              </div>

              <Badge variant={timeRemaining < 600 ? "destructive" : "secondary"}>
                <Clock className="w-3 h-3 mr-1" />
                {timeRemaining < 600 ? "Hurry Up!" : "On Track"}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>
                Progress: {answeredCount}/{examData.questions.length} answered
              </span>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Question {currentQuestion + 1}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{currentQuestionData.subject}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFlagQuestion(currentQuestionData.id)}
                      className={flaggedQuestions.has(currentQuestionData.id) ? "bg-yellow-50 border-yellow-300" : ""}
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg text-slate-800 leading-relaxed">{currentQuestionData.question}</div>

                <RadioGroup
                  value={answers[currentQuestionData.id]?.toString() || ""}
                  onValueChange={(value) => handleAnswerSelect(currentQuestionData.id, Number.parseInt(value))}
                >
                  {currentQuestionData.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-slate-700">
                        {String.fromCharCode(65 + index)}. {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save Progress
                    </Button>
                  </div>

                  <Button
                    onClick={() => setCurrentQuestion(Math.min(examData.questions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === examData.questions.length - 1}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Navigator */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {examData.questions.map((_, index) => {
                    const status = getQuestionStatus(index)
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className={`
                          ${currentQuestion === index ? "ring-2 ring-blue-500" : ""}
                          ${status === "answered" ? "bg-green-50 border-green-300 text-green-700" : ""}
                          ${status === "flagged" ? "bg-yellow-50 border-yellow-300 text-yellow-700" : ""}
                          ${status === "unanswered" ? "bg-slate-50" : ""}
                        `}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                      </Button>
                    )
                  })}
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                    <span>Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span>Flagged ({flaggedQuestions.size})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-slate-100 border border-slate-300 rounded"></div>
                    <span>Unanswered ({examData.questions.length - answeredCount})</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Submit Exam</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-slate-600">
                    <div>
                      Answered: {answeredCount}/{examData.questions.length}
                    </div>
                    <div>Flagged: {flaggedQuestions.size}</div>
                  </div>

                  <Button className="w-full" onClick={handleSubmitExam} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Exam
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    Make sure to review your answers before submitting
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
