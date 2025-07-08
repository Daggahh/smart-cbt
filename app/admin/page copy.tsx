"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Calendar,
  BarChart3,
  Upload,
  Settings,
  CheckCircle,
  Plus,
  FileText,
  Brain,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const systemStats = {
    totalCandidates: 2847,
    activeExams: 12,
    completedToday: 847,
    systemUptime: 99.97,
  }

  const recentExams = [
    {
      id: 1,
      title: "Mathematics Mock Test 2024",
      candidates: 450,
      status: "active",
      completion: 78,
      startTime: "09:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: 2,
      title: "English Language Assessment",
      candidates: 325,
      status: "completed",
      completion: 100,
      startTime: "02:00 PM",
      endTime: "04:00 PM",
    },
    {
      id: 3,
      title: "Physics Practice Exam",
      candidates: 275,
      status: "scheduled",
      completion: 0,
      startTime: "10:00 AM",
      endTime: "01:00 PM",
    },
  ]

  const quickActions = [
    {
      title: "Create New Exam",
      description: "Design a comprehensive examination",
      icon: <Plus className="w-6 h-6" />,
      href: "/admin/exams/create",
      color: "bg-blue-500",
      badge: "Core",
    },
    {
      title: "Upload Questions",
      description: "Bulk import from documents",
      icon: <Upload className="w-6 h-6" />,
      href: "/admin/upload",
      color: "bg-green-500",
      badge: "Core",
    },
    {
      title: "Manage Students",
      description: "Organize candidates and batches",
      icon: <Users className="w-6 h-6" />,
      href: "/admin/students",
      color: "bg-purple-500",
      badge: "Management",
    },
    {
      title: "View Analytics",
      description: "Performance insights and reports",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "/admin/analytics",
      color: "bg-orange-500",
      badge: "Insights",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <SmartCBTLogo className="w-6 h-6 mr-2" />
                Dashboard
              </Link>
            </Button>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600 mx-2" />
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">Admin Panel</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">System Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Healthy
            </Badge>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Welcome to Admin Panel</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor and manage your CBT platform operations efficiently
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Students</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {systemStats.totalCandidates.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">+12% from last month</p>
                </div>
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Active Exams</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{systemStats.activeExams}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Live monitoring</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Completed Today</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                    {systemStats.completedToday.toLocaleString()}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Peak: 2:00 PM</p>
                </div>
                <CheckCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">System Uptime</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{systemStats.systemUptime}%</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Last 30 days</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${action.color} text-white`}>{action.icon}</div>
                    <Badge variant={action.badge === "Core" ? "default" : "secondary"}>{action.badge}</Badge>
                  </div>

                  <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{action.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{action.description}</p>

                  <Button
                    asChild
                    className="w-full group-hover:bg-slate-800 dark:group-hover:bg-white dark:group-hover:text-slate-800"
                  >
                    <Link href={action.href}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exams">Live Exams</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Platform Activity</span>
                  </CardTitle>
                  <CardDescription>Recent system activity and performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Exams Created</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Questions Uploaded</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Students Registered</span>
                        <span className="font-semibold text-green-600">342</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Avg. Score</span>
                        <span className="font-semibold">78.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Pass Rate</span>
                        <span className="font-semibold text-green-600">94.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">System Load</span>
                        <span className="font-semibold text-blue-600">23%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Question Quality Score</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">92%</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">AI-analyzed content quality</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Processing Speed</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">2.3s</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Avg. document processing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Live Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Active Examinations
                  <Button size="sm" asChild>
                    <Link href="/admin/exams/create">Schedule New Exam</Link>
                  </Button>
                </CardTitle>
                <CardDescription>Real-time monitoring of ongoing examinations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentExams.map((exam) => (
                  <div key={exam.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-800 dark:text-white">{exam.title}</h3>
                      <Badge
                        variant={
                          exam.status === "active" ? "default" : exam.status === "completed" ? "secondary" : "outline"
                        }
                      >
                        {exam.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                      <div>
                        <span className="font-medium">Candidates:</span> {exam.candidates.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {exam.startTime} - {exam.endTime}
                      </div>
                      <div>
                        <span className="font-medium">Progress:</span> {exam.completion}%
                      </div>
                    </div>

                    {exam.status === "active" && (
                      <div className="space-y-2">
                        <Progress value={exam.completion} className="h-2" />
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>{Math.round((exam.completion / 100) * exam.candidates)} completed</span>
                          <span>
                            {exam.candidates - Math.round((exam.completion / 100) * exam.candidates)} in progress
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/exams/${exam.id}/monitor`}>Monitor</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/exams/${exam.id}/results`}>Results</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Manage registered students and their exam assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">Student Management</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    Access comprehensive student management tools
                  </p>
                  <Button asChild>
                    <Link href="/admin/students">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Students
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Upload and manage question banks, exam content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">Content Management</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    Upload questions and manage your content library
                  </p>
                  <div className="flex justify-center space-x-3">
                    <Button asChild>
                      <Link href="/admin/upload">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Content
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/admin/content">
                        <FileText className="w-4 h-4 mr-2" />
                        View Library
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
