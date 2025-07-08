"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Calendar, Play, Search, Target, CheckCircle, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export default function StudentExams() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSubject, setFilterSubject] = useState("all")

  const availableExams = [
    {
      id: 1,
      title: "JAMB UTME Mathematics 2024",
      subject: "Mathematics",
      description: "Comprehensive mathematics examination covering algebra, geometry, and calculus",
      duration: 180,
      questions: 50,
      difficulty: "Medium",
      attempts: 0,
      maxAttempts: 3,
      deadline: "2024-01-25",
      status: "available",
      instructions: [
        "Read all questions carefully before answering",
        "You have 3 hours to complete this exam",
        "Each question carries equal marks",
        "No negative marking",
      ],
    },
    {
      id: 2,
      title: "English Language Mock Test",
      subject: "English",
      description: "English language proficiency test focusing on grammar, comprehension, and vocabulary",
      duration: 150,
      questions: 40,
      difficulty: "Easy",
      attempts: 1,
      maxAttempts: 2,
      deadline: "2024-01-30",
      status: "available",
      instructions: [
        "Answer all questions",
        "Time limit: 2.5 hours",
        "Focus on accuracy over speed",
        "Review your answers before submission",
      ],
    },
    {
      id: 3,
      title: "Physics Practice Examination",
      subject: "Physics",
      description: "Physics examination covering mechanics, thermodynamics, and electromagnetism",
      duration: 120,
      questions: 45,
      difficulty: "Hard",
      attempts: 0,
      maxAttempts: 1,
      deadline: "2024-02-05",
      status: "available",
      instructions: [
        "Calculator allowed for numerical problems",
        "Show all working where applicable",
        "Time management is crucial",
        "Attempt all questions",
      ],
    },
  ]

  const scheduledExams = [
    {
      id: 4,
      title: "Chemistry Final Assessment",
      subject: "Chemistry",
      description: "Final chemistry assessment for the semester",
      duration: 180,
      questions: 60,
      difficulty: "Medium",
      scheduledDate: "2024-02-10",
      scheduledTime: "09:00 AM",
      status: "scheduled",
    },
    {
      id: 5,
      title: "Biology Comprehensive Test",
      subject: "Biology",
      description: "Comprehensive biology test covering all topics",
      duration: 150,
      questions: 50,
      difficulty: "Medium",
      scheduledDate: "2024-02-15",
      scheduledTime: "02:00 PM",
      status: "scheduled",
    },
  ]

  const completedExams = [
    {
      id: 6,
      title: "Mathematics Diagnostic Test",
      subject: "Mathematics",
      score: 85,
      completedDate: "2024-01-15",
      grade: "A",
      status: "completed",
    },
    {
      id: 7,
      title: "English Placement Test",
      subject: "English",
      score: 78,
      completedDate: "2024-01-12",
      grade: "B+",
      status: "completed",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "default"
      case "scheduled":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Examinations</h1>
          <p className="text-slate-600 mt-1">Manage your exam schedule and take available tests</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
      </div>

      {/* Exam Tabs */}
      <Tabs defaultValue="available" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Exams</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Exams</TabsTrigger>
          <TabsTrigger value="completed">Completed Exams</TabsTrigger>
        </TabsList>

        {/* Available Exams */}
        <TabsContent value="available" className="space-y-6">
          <div className="grid gap-6">
            {availableExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{exam.title}</CardTitle>
                      <CardDescription className="mt-2">{exam.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(exam.difficulty)}>{exam.difficulty}</Badge>
                      <Badge variant={getStatusColor(exam.status)}>Available</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Exam Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-slate-800">{exam.duration} min</div>
                      <div className="text-xs text-slate-600">Duration</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-slate-800">{exam.questions}</div>
                      <div className="text-xs text-slate-600">Questions</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-slate-800">
                        {exam.attempts}/{exam.maxAttempts}
                      </div>
                      <div className="text-xs text-slate-600">Attempts</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-slate-800">{exam.deadline}</div>
                      <div className="text-xs text-slate-600">Deadline</div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Info className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-blue-900">Exam Instructions</h4>
                    </div>
                    <ul className="space-y-1 text-sm text-blue-800">
                      {exam.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="text-sm text-slate-600">
                      {exam.attempts < exam.maxAttempts ? (
                        <span className="text-green-600">{exam.maxAttempts - exam.attempts} attempt(s) remaining</span>
                      ) : (
                        <span className="text-red-600">No attempts remaining</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm">
                        <Info className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      <Button
                        size="sm"
                        disabled={exam.attempts >= exam.maxAttempts}
                        asChild={exam.attempts < exam.maxAttempts}
                      >
                        <Link href={`/student/exam/${exam.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Start Exam
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scheduled Exams */}
        <TabsContent value="scheduled" className="space-y-6">
          <div className="grid gap-6">
            {scheduledExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{exam.title}</CardTitle>
                      <CardDescription className="mt-2">{exam.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(exam.difficulty)}>{exam.difficulty}</Badge>
                      <Badge variant="secondary">Scheduled</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-slate-800">{exam.scheduledDate}</div>
                      <div className="text-xs text-slate-600">Date</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Clock className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-slate-800">{exam.scheduledTime}</div>
                      <div className="text-xs text-slate-600">Time</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-slate-800">{exam.questions}</div>
                      <div className="text-xs text-slate-600">Questions</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Target className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-slate-800">{exam.duration} min</div>
                      <div className="text-xs text-slate-600">Duration</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-yellow-800 font-medium">
                        This exam is scheduled for {exam.scheduledDate} at {exam.scheduledTime}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Exams */}
        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-6">
            {completedExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-slate-800">{exam.title}</h3>
                        <p className="text-sm text-slate-600">Completed on {exam.completedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">{exam.score}%</div>
                        <Badge variant={exam.score >= 80 ? "default" : "secondary"}>{exam.grade}</Badge>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/student/results/${exam.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
 