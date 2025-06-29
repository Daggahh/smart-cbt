"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Award,
  Calendar,
  Clock,
  Download,
  Eye,
  Filter,
  Search,
  TrendingUp,
  User,
  LogOut,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function StudentResults() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const examResults = [
    {
      id: 1,
      title: "JAMB UTME Mathematics Mock",
      date: "2024-01-15",
      score: 85,
      totalQuestions: 50,
      correctAnswers: 43,
      timeSpent: "1h 45m",
      grade: "A",
      status: "completed",
      feedback: "Excellent performance in algebra and geometry. Focus on calculus for improvement.",
      subjects: {
        Algebra: 92,
        Geometry: 88,
        Calculus: 75,
        Statistics: 90,
      },
    },
    {
      id: 2,
      title: "English Language Practice Test",
      date: "2024-01-12",
      score: 78,
      totalQuestions: 40,
      correctAnswers: 31,
      timeSpent: "1h 20m",
      grade: "B+",
      status: "completed",
      feedback: "Good comprehension skills. Work on grammar and vocabulary expansion.",
      subjects: {
        Comprehension: 85,
        Grammar: 70,
        Vocabulary: 75,
        Essay: 82,
      },
    },
    {
      id: 3,
      title: "Physics Mock Examination",
      date: "2024-01-10",
      score: 92,
      totalQuestions: 45,
      correctAnswers: 41,
      timeSpent: "2h 10m",
      grade: "A+",
      status: "completed",
      feedback: "Outstanding performance across all topics. Keep up the excellent work!",
      subjects: {
        Mechanics: 95,
        Thermodynamics: 88,
        Electromagnetism: 94,
        Optics: 92,
      },
    },
    {
      id: 4,
      title: "Chemistry Practice Quiz",
      date: "2024-01-08",
      score: 68,
      totalQuestions: 30,
      correctAnswers: 20,
      timeSpent: "1h 30m",
      grade: "C+",
      status: "completed",
      feedback: "Need improvement in organic chemistry. Strong performance in inorganic chemistry.",
      subjects: {
        "Organic Chemistry": 55,
        "Inorganic Chemistry": 80,
        "Physical Chemistry": 70,
        "Analytical Chemistry": 65,
      },
    },
  ]

  const filteredResults = examResults.filter((result) => {
    const matchesSearch = result.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || result.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const averageScore = Math.round(examResults.reduce((sum, result) => sum + result.score, 0) / examResults.length)
  const totalExams = examResults.length
  const bestScore = Math.max(...examResults.map((r) => r.score))
  const totalTimeSpent = examResults.reduce((total, result) => {
    const [hours, minutes] = result.timeSpent.split("h ")
    return total + Number.parseInt(hours) * 60 + Number.parseInt(minutes.replace("m", ""))
  }, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="h-6 w-px bg-slate-300 mx-2" />
            <SmartCBTLogo className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Smart CBT</h1>
              <p className="text-xs text-slate-600">Exam Results</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <User className="w-4 h-4" />
              <span>John Doe</span>
            </div>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Exam Results</h1>
          <p className="text-slate-600">View your exam performance and detailed feedback</p>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Score</p>
                  <p className="text-2xl font-bold text-slate-800">{averageScore}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Exams</p>
                  <p className="text-2xl font-bold text-slate-800">{totalExams}</p>
                </div>
                <Award className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Best Score</p>
                  <p className="text-2xl font-bold text-slate-800">{bestScore}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Time Spent</p>
                  <p className="text-2xl font-bold text-slate-800">{Math.floor(totalTimeSpent / 60)}h</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Results</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {filteredResults.map((result) => (
            <Card key={result.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{result.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{result.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{result.timeSpent}</span>
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"}>
                      {result.grade}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-800">{result.score}%</div>
                      <div className="text-sm text-slate-600">
                        {result.correctAnswers}/{result.totalQuestions}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="subjects">Subject Breakdown</TabsTrigger>
                    <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">{result.correctAnswers}</div>
                        <div className="text-xs text-slate-600">Correct</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-red-600">
                          {result.totalQuestions - result.correctAnswers}
                        </div>
                        <div className="text-xs text-slate-600">Incorrect</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">{result.score}%</div>
                        <div className="text-xs text-slate-600">Score</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-orange-600">{result.timeSpent}</div>
                        <div className="text-xs text-slate-600">Time</div>
                      </div>
                    </div>
                    <Progress value={result.score} className="h-3" />
                  </TabsContent>

                  <TabsContent value="subjects" className="space-y-4">
                    {Object.entries(result.subjects).map(([subject, score]) => (
                      <div key={subject} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{subject}</span>
                          <span className="text-slate-600">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="feedback" className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-2">AI Analysis</h4>
                          <p className="text-blue-800 text-sm">{result.feedback}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Award className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">No results found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
