"use client"
import { useState } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Clock,
  ArrowLeft,
  Download,
  RefreshCw,
  Target,
  Award,
  BookOpen,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("7d")

  const performanceMetrics = {
    totalExams: 156,
    totalCandidates: 12847,
    averageScore: 76.8,
    completionRate: 94.2,
    passRate: 82.5,
    systemUptime: 99.97,
  }

  const examPerformance = [
    {
      subject: "Mathematics",
      totalCandidates: 4523,
      averageScore: 78.5,
      passRate: 85.2,
      difficulty: "Medium",
      trend: "up",
    },
    {
      subject: "English",
      totalCandidates: 3241,
      averageScore: 82.1,
      passRate: 89.7,
      difficulty: "Easy",
      trend: "up",
    },
    {
      subject: "Physics",
      totalCandidates: 2156,
      averageScore: 71.3,
      passRate: 76.8,
      difficulty: "Hard",
      trend: "down",
    },
    {
      subject: "Chemistry",
      totalCandidates: 1847,
      averageScore: 74.9,
      passRate: 79.4,
      difficulty: "Medium",
      trend: "up",
    },
    {
      subject: "Biology",
      totalCandidates: 1080,
      averageScore: 80.2,
      passRate: 87.1,
      difficulty: "Easy",
      trend: "up",
    },
  ]

  const institutionPerformance = [
    {
      name: "University of Lagos",
      candidates: 3456,
      averageScore: 81.2,
      passRate: 88.5,
      rank: 1,
    },
    {
      name: "University of Ibadan",
      candidates: 2987,
      averageScore: 79.8,
      passRate: 86.3,
      rank: 2,
    },
    {
      name: "Ahmadu Bello University",
      candidates: 2341,
      averageScore: 76.4,
      passRate: 82.1,
      rank: 3,
    },
    {
      name: "University of Nigeria",
      candidates: 2156,
      averageScore: 75.9,
      passRate: 81.7,
      rank: 4,
    },
    {
      name: "Obafemi Awolowo University",
      candidates: 1907,
      averageScore: 74.2,
      passRate: 79.8,
      rank: 5,
    },
  ]

  const timeSeriesData = [
    { period: "Week 1", exams: 23, candidates: 2341, avgScore: 75.2 },
    { period: "Week 2", exams: 28, candidates: 2876, avgScore: 77.8 },
    { period: "Week 3", exams: 31, candidates: 3124, avgScore: 76.4 },
    { period: "Week 4", exams: 35, candidates: 3456, avgScore: 78.9 },
    { period: "Week 5", exams: 39, candidates: 3789, avgScore: 79.2 },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-900/20 text-green-400 border-green-800"
      case "Medium":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-800"
      case "Hard":
        return "bg-red-900/20 text-red-400 border-red-800"
      default:
        return "bg-neutral-800 text-neutral-400"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-green-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-400" />
    )
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <BackgroundBeams />

      {/* Header */}
      <header className="bg-neutral-900/80 border-b border-neutral-800 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button borderRadius="1rem" className="bg-transparent text-white border-slate-800" as={Link} href="/admin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-neutral-700 mx-2" />
            <SmartCBTLogo className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-white">Smart CBT</h1>
              <p className="text-xs text-neutral-400">Analytics & Reports</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <Button borderRadius="1rem" className="bg-transparent text-white border-slate-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button borderRadius="1rem" className="bg-transparent text-white border-slate-800">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
            Analytics & Reports
          </h1>
          <p className="text-neutral-400 text-lg">Comprehensive insights into exam performance and system metrics</p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Total Exams</p>
                  <p className="text-2xl font-bold text-white">{performanceMetrics.totalExams}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Total Candidates</p>
                  <p className="text-2xl font-bold text-white">{performanceMetrics.totalCandidates.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Average Score</p>
                  <p className="text-2xl font-bold text-white">{performanceMetrics.averageScore}%</p>
                </div>
                <Target className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Completion Rate</p>
                  <p className="text-2xl font-bold text-white">{performanceMetrics.completionRate}%</p>
                </div>
                <Activity className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Pass Rate</p>
                  <p className="text-2xl font-bold text-white">{performanceMetrics.passRate}%</p>
                </div>
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">System Uptime</p>
                  <p className="text-2xl font-bold text-white">{performanceMetrics.systemUptime}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger value="subjects" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
              Subject Analysis
            </TabsTrigger>
            <TabsTrigger
              value="institutions"
              className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
            >
              Institutions
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
              Trends
            </TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                    <span>Score Distribution</span>
                  </CardTitle>
                  <CardDescription className="text-neutral-400">Distribution of exam scores</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">90-100% (Excellent)</span>
                      <span className="text-green-400 font-medium">18.5%</span>
                    </div>
                    <Progress value={18.5} className="h-2 bg-neutral-800" />

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">80-89% (Very Good)</span>
                      <span className="text-blue-400 font-medium">32.1%</span>
                    </div>
                    <Progress value={32.1} className="h-2 bg-neutral-800" />

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">70-79% (Good)</span>
                      <span className="text-yellow-400 font-medium">28.7%</span>
                    </div>
                    <Progress value={28.7} className="h-2 bg-neutral-800" />

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">60-69% (Fair)</span>
                      <span className="text-orange-400 font-medium">15.2%</span>
                    </div>
                    <Progress value={15.2} className="h-2 bg-neutral-800" />

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Below 60% (Poor)</span>
                      <span className="text-red-400 font-medium">5.5%</span>
                    </div>
                    <Progress value={5.5} className="h-2 bg-neutral-800" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Clock className="w-6 h-6 text-purple-400" />
                    <span>Time Analysis</span>
                  </CardTitle>
                  <CardDescription className="text-neutral-400">Exam completion time patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Average Completion Time</span>
                      <span className="text-white font-medium">1h 45m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Fastest Completion</span>
                      <span className="text-green-400 font-medium">32m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Slowest Completion</span>
                      <span className="text-red-400 font-medium">2h 58m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Time Utilization</span>
                      <span className="text-blue-400 font-medium">87.3%</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-neutral-800">
                    <h4 className="font-medium text-white mb-3">Time vs Score Correlation</h4>
                    <div className="text-sm text-neutral-400">
                      Students who spend 80-90% of allocated time typically achieve the highest scores (avg. 84.2%)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subject Analysis Tab */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="space-y-6">
              {examPerformance.map((subject, index) => (
                <Card
                  key={index}
                  className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl hover:bg-neutral-900/70 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <BookOpen className="w-8 h-8 text-blue-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{subject.subject}</h3>
                          <p className="text-sm text-neutral-400">
                            {subject.totalCandidates.toLocaleString()} candidates
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getDifficultyColor(subject.difficulty)}>{subject.difficulty}</Badge>
                        {getTrendIcon(subject.trend)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">{subject.averageScore}%</div>
                        <div className="text-xs text-neutral-400">Average Score</div>
                      </div>
                      <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">{subject.passRate}%</div>
                        <div className="text-xs text-neutral-400">Pass Rate</div>
                      </div>
                      <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">
                          {subject.totalCandidates.toLocaleString()}
                        </div>
                        <div className="text-xs text-neutral-400">Total Candidates</div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm text-neutral-300">
                        <span>Performance Score</span>
                        <span>{subject.averageScore}%</span>
                      </div>
                      <Progress value={subject.averageScore} className="h-2 bg-neutral-800" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Institutions Tab */}
          <TabsContent value="institutions" className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <span>Institution Rankings</span>
                </CardTitle>
                <CardDescription className="text-neutral-400">Performance ranking by institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {institutionPerformance.map((institution, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg hover:bg-neutral-800/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {institution.rank}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{institution.name}</h4>
                          <p className="text-sm text-neutral-400">
                            {institution.candidates.toLocaleString()} candidates
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-blue-400">{institution.averageScore}%</div>
                          <div className="text-neutral-400">Avg Score</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-green-400">{institution.passRate}%</div>
                          <div className="text-neutral-400">Pass Rate</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    <span>Exam Volume Trends</span>
                  </CardTitle>
                  <CardDescription className="text-neutral-400">Weekly exam and candidate trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeSeriesData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                        <span className="text-neutral-300">{data.period}</span>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-blue-400">{data.exams} exams</div>
                          <div className="text-green-400">{data.candidates.toLocaleString()} candidates</div>
                          <div className="text-purple-400">{data.avgScore}% avg</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Activity className="w-6 h-6 text-purple-400" />
                    <span>Key Insights</span>
                  </CardTitle>
                  <CardDescription className="text-neutral-400">AI-generated performance insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">Positive Trend</span>
                      </div>
                      <p className="text-sm text-neutral-300">
                        Average scores have increased by 3.2% over the last month
                      </p>
                    </div>

                    <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-medium">Peak Performance</span>
                      </div>
                      <p className="text-sm text-neutral-300">
                        Morning exam sessions (9-11 AM) show 5% higher average scores
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">Time Optimization</span>
                      </div>
                      <p className="text-sm text-neutral-300">
                        Students using 85-90% of allocated time achieve optimal results
                      </p>
                    </div>

                    <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 font-medium">Subject Focus</span>
                      </div>
                      <p className="text-sm text-neutral-300">
                        Physics requires additional support - 24% below average performance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
