"use client"
import { useState } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Clock,
  Play,
  Eye,
  Edit,
  ArrowLeft,
  MapPin,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function AdminBatches() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const batches = [
    {
      id: 1,
      name: "Morning Batch A",
      examTitle: "JAMB UTME Mathematics 2024",
      startTime: "2024-01-15T09:00:00",
      endTime: "2024-01-15T12:00:00",
      maxCandidates: 1000,
      registeredCandidates: 950,
      completedCandidates: 847,
      status: "completed",
      center: "Lagos CBT Center",
      location: "Victoria Island, Lagos",
      supervisor: "Dr. Adebayo Johnson",
    },
    {
      id: 2,
      name: "Afternoon Batch B",
      examTitle: "JAMB UTME Mathematics 2024",
      startTime: "2024-01-15T14:00:00",
      endTime: "2024-01-15T17:00:00",
      maxCandidates: 1000,
      registeredCandidates: 1000,
      completedCandidates: 0,
      status: "active",
      center: "Lagos CBT Center",
      location: "Victoria Island, Lagos",
      supervisor: "Prof. Sarah Okafor",
    },
    {
      id: 3,
      name: "Evening Batch C",
      examTitle: "JAMB UTME Mathematics 2024",
      startTime: "2024-01-15T18:00:00",
      endTime: "2024-01-15T21:00:00",
      maxCandidates: 800,
      registeredCandidates: 756,
      completedCandidates: 0,
      status: "scheduled",
      center: "Abuja CBT Center",
      location: "Wuse II, Abuja",
      supervisor: "Mr. Ibrahim Musa",
    },
    {
      id: 4,
      name: "Morning Batch D",
      examTitle: "English Language Mock Test",
      startTime: "2024-01-16T09:00:00",
      endTime: "2024-01-16T11:30:00",
      maxCandidates: 500,
      registeredCandidates: 423,
      completedCandidates: 0,
      status: "scheduled",
      center: "Port Harcourt CBT Center",
      location: "GRA, Port Harcourt",
      supervisor: "Mrs. Grace Okoro",
    },
  ]

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.examTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || batch.status === filterStatus
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
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
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
              <p className="text-xs text-neutral-400">Batch Management</p>
            </div>
          </div>

          <Button
            borderRadius="1rem"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
            as={Link}
            href="/admin/batches/create"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Batch
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
            Batch Management
          </h1>
          <p className="text-neutral-400 text-lg">Organize and monitor examination batches across centers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Total Batches</p>
                  <p className="text-2xl font-bold text-white">{batches.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Active Batches</p>
                  <p className="text-2xl font-bold text-white">{batches.filter((b) => b.status === "active").length}</p>
                </div>
                <Play className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Total Candidates</p>
                  <p className="text-2xl font-bold text-white">
                    {batches.reduce((sum, b) => sum + b.registeredCandidates, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Completed</p>
                  <p className="text-2xl font-bold text-white">
                    {batches.reduce((sum, b) => sum + b.completedCandidates, 0).toLocaleString()}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              placeholder="Search batches..."
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
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Batches List */}
        <div className="space-y-6">
          {filteredBatches.map((batch) => (
            <Card
              key={batch.id}
              className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl hover:bg-neutral-900/70 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg text-white">{batch.name}</CardTitle>
                      <Badge variant={getStatusColor(batch.status)} className="flex items-center space-x-1">
                        {getStatusIcon(batch.status)}
                        <span className="capitalize">{batch.status}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-neutral-400">{batch.examTitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="candidates"
                      className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      Candidates
                    </TabsTrigger>
                    <TabsTrigger
                      value="location"
                      className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      Location
                    </TabsTrigger>
                    <TabsTrigger
                      value="monitoring"
                      className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      Monitoring
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-400">{batch.maxCandidates}</div>
                        <div className="text-xs text-neutral-400">Max Capacity</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-semibold text-green-400">{batch.registeredCandidates}</div>
                        <div className="text-xs text-neutral-400">Registered</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-semibold text-purple-400">
                          {new Date(batch.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="text-xs text-neutral-400">Start Time</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-semibold text-orange-400">
                          {Math.floor(
                            (new Date(batch.endTime).getTime() - new Date(batch.startTime).getTime()) / (1000 * 60),
                          )}
                          m
                        </div>
                        <div className="text-xs text-neutral-400">Duration</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-neutral-300">
                        <span>Date</span>
                        <span>{new Date(batch.startTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-neutral-300">
                        <span>Supervisor</span>
                        <span>{batch.supervisor}</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="candidates" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-800">
                        <div className="text-lg font-semibold text-blue-400">{batch.registeredCandidates}</div>
                        <div className="text-xs text-neutral-400">Registered</div>
                      </div>
                      <div className="text-center p-3 bg-green-900/20 rounded-lg border border-green-800">
                        <div className="text-lg font-semibold text-green-400">{batch.completedCandidates}</div>
                        <div className="text-xs text-neutral-400">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-orange-900/20 rounded-lg border border-orange-800">
                        <div className="text-lg font-semibold text-orange-400">
                          {batch.registeredCandidates - batch.completedCandidates}
                        </div>
                        <div className="text-xs text-neutral-400">In Progress</div>
                      </div>
                    </div>
                    {batch.registeredCandidates > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-neutral-300">
                          <span>Completion Rate</span>
                          <span>{Math.round((batch.completedCandidates / batch.registeredCandidates) * 100)}%</span>
                        </div>
                        <Progress
                          value={(batch.completedCandidates / batch.registeredCandidates) * 100}
                          className="h-2 bg-neutral-800"
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="location" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="font-medium text-white">{batch.center}</div>
                          <div className="text-sm text-neutral-400">{batch.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Supervisor</div>
                          <div className="text-sm text-neutral-400">{batch.supervisor}</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="monitoring" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-neutral-300">System Status: Online</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-neutral-300">Network: Stable</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span className="text-neutral-300">Security: Active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        <span className="text-neutral-300">Backup: Ready</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-neutral-800">
                  <Button
                    borderRadius="0.5rem"
                    className="bg-transparent text-white border-slate-800"
                    as={Link}
                    href={`/admin/batches/${batch.id}/monitor`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Monitor
                  </Button>
                  <Button
                    borderRadius="0.5rem"
                    className="bg-transparent text-white border-slate-800"
                    as={Link}
                    href={`/admin/batches/${batch.id}/edit`}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBatches.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-neutral-300 mb-2">No batches found</h3>
            <p className="text-neutral-500 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              borderRadius="1rem"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
              as={Link}
              href="/admin/batches/create"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Batch
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
