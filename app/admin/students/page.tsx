"use client"
import { useState } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Search,
  Filter,
  Users,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  Eye,
  Edit,
  Download,
  Upload,
  UserCheck,
  UserX,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const students = [
    {
      id: 1,
      registrationNumber: "STU001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@student.com",
      phone: "+234-801-234-5678",
      dateOfBirth: "2005-03-15",
      status: "active",
      examsTaken: 12,
      averageScore: 82,
      lastExam: "2024-01-15",
      institution: "University of Lagos",
      course: "Computer Science",
      level: "200",
    },
    {
      id: 2,
      registrationNumber: "STU002",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@student.com",
      phone: "+234-802-345-6789",
      dateOfBirth: "2004-07-22",
      status: "active",
      examsTaken: 8,
      averageScore: 78,
      lastExam: "2024-01-14",
      institution: "University of Ibadan",
      course: "Medicine",
      level: "300",
    },
    {
      id: 3,
      registrationNumber: "STU003",
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@student.com",
      phone: "+234-803-456-7890",
      dateOfBirth: "2005-11-08",
      status: "suspended",
      examsTaken: 5,
      averageScore: 65,
      lastExam: "2024-01-10",
      institution: "Ahmadu Bello University",
      course: "Engineering",
      level: "100",
    },
    {
      id: 4,
      registrationNumber: "STU004",
      firstName: "Sarah",
      lastName: "Williams",
      email: "sarah.williams@student.com",
      phone: "+234-804-567-8901",
      dateOfBirth: "2004-12-03",
      status: "active",
      examsTaken: 15,
      averageScore: 91,
      lastExam: "2024-01-16",
      institution: "University of Nigeria",
      course: "Law",
      level: "400",
    },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || student.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "suspended":
        return "destructive"
      case "inactive":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <UserCheck className="w-4 h-4" />
      case "suspended":
        return <UserX className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
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
              <p className="text-xs text-neutral-400">Student Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              borderRadius="1rem"
              className="bg-transparent text-white border-slate-800"
              as={Link}
              href="/admin/students/import"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Students
            </Button>
            <Button
              borderRadius="1rem"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
              as={Link}
              href="/admin/students/create"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
            Student Management
          </h1>
          <p className="text-neutral-400 text-lg">Manage student registrations, profiles, and academic records</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Total Students</p>
                  <p className="text-2xl font-bold text-white">{students.length.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Active Students</p>
                  <p className="text-2xl font-bold text-white">
                    {students.filter((s) => s.status === "active").length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Average Score</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(students.reduce((sum, s) => sum + s.averageScore, 0) / students.length)}%
                  </p>
                </div>
                <GraduationCap className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Total Exams</p>
                  <p className="text-2xl font-bold text-white">{students.reduce((sum, s) => sum + s.examsTaken, 0)}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-neutral-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Button borderRadius="0.5rem" className="bg-transparent text-white border-slate-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Students List */}
        <div className="space-y-6">
          {filteredStudents.map((student) => (
            <Card
              key={student.id}
              className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl hover:bg-neutral-900/70 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {student.firstName[0]}
                      {student.lastName[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">
                        {student.firstName} {student.lastName}
                      </CardTitle>
                      <CardDescription className="text-neutral-400">
                        {student.registrationNumber} • {student.course}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={getStatusColor(student.status)} className="flex items-center space-x-1">
                      {getStatusIcon(student.status)}
                      <span className="capitalize">{student.status}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
                    <TabsTrigger
                      value="profile"
                      className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="academic"
                      className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      Academic
                    </TabsTrigger>
                    <TabsTrigger
                      value="exams"
                      className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      Exams
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      Activity
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-400">Email</div>
                        <div className="text-sm text-neutral-300 flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{student.email}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-400">Phone</div>
                        <div className="text-sm text-neutral-300 flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{student.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-400">Date of Birth</div>
                        <div className="text-sm text-neutral-300 flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(student.dateOfBirth).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="academic" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-400">Institution</div>
                        <div className="text-sm text-neutral-300">{student.institution}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-400">Course</div>
                        <div className="text-sm text-neutral-300">{student.course}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-400">Level</div>
                        <div className="text-sm text-neutral-300">{student.level} Level</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="exams" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-400">{student.examsTaken}</div>
                        <div className="text-xs text-neutral-400">Exams Taken</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-semibold text-green-400">{student.averageScore}%</div>
                        <div className="text-xs text-neutral-400">Average Score</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-semibold text-purple-400">
                          {new Date(student.lastExam).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-neutral-400">Last Exam</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-neutral-300">
                        <span>Performance Trend</span>
                        <span>
                          {student.averageScore >= 80
                            ? "Excellent"
                            : student.averageScore >= 60
                              ? "Good"
                              : "Needs Improvement"}
                        </span>
                      </div>
                      <Progress value={student.averageScore} className="h-2 bg-neutral-800" />
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-300">Last Login</span>
                        <span className="text-neutral-400">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-300">Account Created</span>
                        <span className="text-neutral-400">Jan 1, 2024</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-300">Email Verified</span>
                        <span className="text-green-400">Yes</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-300">Security Flags</span>
                        <span className="text-green-400">None</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-neutral-800">
                  <Button
                    borderRadius="0.5rem"
                    className="bg-transparent text-white border-slate-800"
                    as={Link}
                    href={`/admin/students/${student.id}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    borderRadius="0.5rem"
                    className="bg-transparent text-white border-slate-800"
                    as={Link}
                    href={`/admin/students/${student.id}/edit`}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {student.status === "suspended" && (
                    <Button borderRadius="0.5rem" className="bg-green-600 text-white border-0">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Activate
                    </Button>
                  )}
                  {student.status === "active" && (
                    <Button borderRadius="0.5rem" className="bg-red-600 text-white border-0">
                      <UserX className="w-4 h-4 mr-2" />
                      Suspend
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-400 mb-4">
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-neutral-300 mb-2">No students found</h3>
            <p className="text-neutral-500 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              borderRadius="1rem"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
              as={Link}
              href="/admin/students/create"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Student
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
