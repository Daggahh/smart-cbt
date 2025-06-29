"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Clock,
  Play,
  Square,
  Eye,
  Edit,
  Trash2,
  Copy,
  ArrowLeft,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function AdminExams() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const exams = [
    {
      id: 1,
      title: "JAMB UTME Mathematics 2024",
      description: "Comprehensive mathematics examination for university admission",
      status: "active",
      totalQuestions: 50,
      duration: 120,
      candidates: 45000,
      registered: 48000,
      completed: 35000,
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      passingScore: 50,
      batches: 12,
      subjects: ["Algebra", "Geometry", "Calculus", "Statistics"],
    },
    {
      id: 2,
      title: "English Language Mock Test",
      description: "Practice test for English language proficiency",
      status: "scheduled",
      totalQuestions: 40,
      duration: 90,
      candidates: 0,
      registered: 12500,
      completed: 0,
      startDate: "2024-01-25",
      endDate: "2024-01-27",
      passingScore: 60,
      batches: 8,
      subjects: ["Comprehension", "Grammar", "Vocabulary", "Essay"],
    },
    {
      id: 3,
      title: "Physics Practice Examination",
      description: "Advanced physics concepts and problem solving",
      status: "completed",
      totalQuestions: 45,
      duration: 150,
      candidates: 8750,
      registered: 8750,
      completed: 8750,
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      passingScore: 55,
      batches: 6,
      subjects: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics"],
    },
    {
      id: 4,
      title: "Chemistry Mock Assessment",
      description: "Comprehensive chemistry evaluation",
      status: "draft",
      totalQuestions: 35,
      duration: 100,
      candidates: 0,
      registered: 0,
      completed: 0,
      startDate: "2024-02-01",
      endDate: "2024-02-03",
      passingScore: 50,
      batches: 0,
      subjects: ["Organic", "Inorganic", "Physical", "Analytical"],
    },
  ]

  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || exam.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "scheduled":
        return "secondary"
      case "completed":
        return "outline"
      case "draft":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-4 h-4" />
      case "scheduled":
        return <Calendar className="w-4 h-4" />
      case "completed":
        return <Square className="w-4 h-4" />
      case "draft":
        return <Edit className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="h-6 w-px bg-slate-300 mx-2" />
            <SmartCBTLogo className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Smart CBT</h1>
              <p className="text-xs text-slate-600">Exam Management</p>
            </div>
          </div>

          <Button asChild>
            <Link href="/admin/exams/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Exam
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Exam Management</h1>
          <p className="text-slate-600">Create, manage, and monitor your examinations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Exams</p>
                  <p className="text-2xl font-bold text-slate-800">{exams.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Exams</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {exams.filter((e) => e.status === "active").length}
                  </p>
                </div>
                <Play className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Candidates</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {exams.reduce((sum, e) => sum + e.registered, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {exams.reduce((sum, e) => sum + e.completed, 0).toLocaleString()}
                  </p>
                </div>
                <Square className="w-8 h-8 text-orange-600" />
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
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Exams List */}
        <div className="space-y-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{exam.title}</CardTitle>
                      <Badge variant={getStatusColor(exam.status)} className="flex items-center space-x-1">
                        {getStatusIcon(exam.status)}
                        <span className="capitalize">{exam.status}</span>
                      </Badge>
                    </div>
                    <CardDescription>{exam.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="candidates">Candidates</TabsTrigger>
                    <TabsTrigger value="batches">Batches</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">{exam.totalQuestions}</div>
                        <div className="text-xs text-slate-600">Questions</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">{exam.duration}m</div>
                        <div className="text-xs text-slate-600">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-purple-600">{exam.passingScore}%</div>
                        <div className="text-xs text-slate-600">Pass Score</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-semibold text-orange-600">{exam.batches}</div>
                        <div className="text-xs text-slate-600">Batches</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Exam Period</span>
                        <span>
                          {exam.startDate} to {exam.endDate}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {exam.subjects.map((subject) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="candidates" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">{exam.registered.toLocaleString()}</div>
                        <div className="text-xs text-slate-600">Registered</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">{exam.candidates.toLocaleString()}</div>
                        <div className="text-xs text-slate-600">Started</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-lg font-semibold text-orange-600">{exam.completed.toLocaleString()}</div>
                        <div className="text-xs text-slate-600">Completed</div>
                      </div>
                    </div>
                    {exam.registered > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completion Rate</span>
                          <span>{Math.round((exam.completed / exam.registered) * 100)}%</span>
                        </div>
                        <Progress value={(exam.completed / exam.registered) * 100} className="h-2" />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="batches" className="space-y-4">
                    <div className="text-center py-8 text-slate-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Batch management interface would be implemented here</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent" asChild>
                        <Link href={`/admin/exams/${exam.id}/batches`}>Manage Batches</Link>
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Randomize Questions:</span>
                        <span className="ml-2 text-green-600">Enabled</span>
                      </div>
                      <div>
                        <span className="font-medium">Randomize Options:</span>
                        <span className="ml-2 text-green-600">Enabled</span>
                      </div>
                      <div>
                        <span className="font-medium">Allow Review:</span>
                        <span className="ml-2 text-blue-600">Enabled</span>
                      </div>
                      <div>
                        <span className="font-medium">Instant Results:</span>
                        <span className="ml-2 text-red-600">Disabled</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/exams/${exam.id}/monitor`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Monitor
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/exams/${exam.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </Button>
                  {exam.status === "draft" && (
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">No exams found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filter criteria</p>
            <Button asChild>
              <Link href="/admin/exams/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Exam
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
