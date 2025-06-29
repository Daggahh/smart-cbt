import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Award, Mail, ArrowRight, User, LogOut } from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function StudentDashboard() {
  const upcomingExams = [
    {
      id: 1,
      title: "Mathematics Mock Exam",
      date: "2024-01-15",
      time: "09:00 AM",
      duration: "2 hours",
      status: "scheduled",
      questions: 50,
    },
    {
      id: 2,
      title: "English Language Test",
      date: "2024-01-18",
      time: "02:00 PM",
      duration: "1.5 hours",
      status: "available",
      questions: 40,
    },
  ]

  const recentResults = [
    {
      id: 1,
      title: "Physics Practice Test",
      score: 85,
      totalQuestions: 30,
      date: "2024-01-10",
      grade: "A",
    },
    {
      id: 2,
      title: "Chemistry Quiz",
      score: 78,
      totalQuestions: 25,
      date: "2024-01-08",
      grade: "B+",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SmartCBTLogo />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Smart CBT</h1>
              <p className="text-xs text-slate-600">Student Portal</p>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, John!</h1>
          <p className="text-slate-600">Ready to take your next exam? Check your upcoming tests below.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Exams Completed</p>
                  <p className="text-2xl font-bold text-slate-800">12</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Score</p>
                  <p className="text-2xl font-bold text-slate-800">82%</p>
                </div>
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Time Spent</p>
                  <p className="text-2xl font-bold text-slate-800">24h</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Rank</p>
                  <p className="text-2xl font-bold text-slate-800">#15</p>
                </div>
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Exams */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Upcoming Exams
                  <Badge variant="secondary">{upcomingExams.length} scheduled</Badge>
                </CardTitle>
                <CardDescription>Your scheduled examinations and practice tests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-800">{exam.title}</h3>
                      <Badge variant={exam.status === "available" ? "default" : "secondary"}>{exam.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{exam.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{exam.questions} questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{exam.duration}</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button size="sm" disabled={exam.status !== "available"} asChild={exam.status === "available"}>
                        {exam.status === "available" ? (
                          <Link href={`/student/exam/${exam.id}`}>
                            Start Exam <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        ) : (
                          <>Scheduled</>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Results & Performance */}
          <div className="space-y-6">
            {/* Recent Results */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Results</CardTitle>
                <CardDescription>Your latest exam scores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-800">{result.title}</h4>
                      <Badge variant="outline">{result.grade}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Score: {result.score}%</span>
                        <span>{result.date}</span>
                      </div>
                      <Progress value={result.score} className="h-2" />
                      <p className="text-xs text-slate-500">
                        {Math.round((result.score / 100) * result.totalQuestions)}/{result.totalQuestions} correct
                      </p>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/student/results">View All Results</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your strengths and areas for improvement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Mathematics</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>English</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Physics</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Chemistry</span>
                    <span>74%</span>
                  </div>
                  <Progress value={74} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
