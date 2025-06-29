import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, BarChart3, Shield, Upload, Settings, CheckCircle, Server } from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function AdminDashboard() {
  const systemStats = {
    totalCandidates: 2847392,
    activeExams: 15,
    completedToday: 12847,
    systemUptime: 99.97,
  }

  const recentExams = [
    {
      id: 1,
      title: "JAMB UTME 2024 - Batch A",
      candidates: 45000,
      status: "active",
      completion: 78,
      startTime: "09:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: 2,
      title: "WAEC Mathematics Mock",
      candidates: 12500,
      status: "completed",
      completion: 100,
      startTime: "02:00 PM",
      endTime: "04:00 PM",
    },
    {
      id: 3,
      title: "University Entrance - Science",
      candidates: 8750,
      status: "scheduled",
      completion: 0,
      startTime: "10:00 AM",
      endTime: "01:00 PM",
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
              <p className="text-xs text-slate-600">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Healthy
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* System Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">System Overview</h1>
          <p className="text-slate-600">Monitor and manage your CBT platform operations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Candidates</p>
                  <p className="text-2xl font-bold text-slate-800">{systemStats.totalCandidates.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Exams</p>
                  <p className="text-2xl font-bold text-slate-800">{systemStats.activeExams}</p>
                  <p className="text-xs text-blue-600 mt-1">Live monitoring</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed Today</p>
                  <p className="text-2xl font-bold text-slate-800">{systemStats.completedToday.toLocaleString()}</p>
                  <p className="text-xs text-orange-600 mt-1">Peak: 2:00 PM</p>
                </div>
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">System Uptime</p>
                  <p className="text-2xl font-bold text-slate-800">{systemStats.systemUptime}%</p>
                  <p className="text-xs text-green-600 mt-1">Last 30 days</p>
                </div>
                <Server className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="exams" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="exams">Live Exams</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Live Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                          <h3 className="font-semibold text-slate-800">{exam.title}</h3>
                          <Badge
                            variant={
                              exam.status === "active"
                                ? "default"
                                : exam.status === "completed"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {exam.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm text-slate-600 mb-4">
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
                            <div className="flex justify-between text-xs text-slate-500">
                              <span>
                                {Math.round((exam.completion / 100) * exam.candidates).toLocaleString()} completed
                              </span>
                              <span>
                                {(
                                  exam.candidates - Math.round((exam.completion / 100) * exam.candidates)
                                ).toLocaleString()}{" "}
                                in progress
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
              </div>

              {/* System Health */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Real-time system monitoring</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Load</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Performance</span>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Network Latency</span>
                      <span className="text-sm font-medium text-green-600">12ms</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Connections</span>
                      <span className="text-sm font-medium">45,231</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/admin/upload">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Questions
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/admin/batches">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Batches
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/admin/reports">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Generate Reports
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/admin/security">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Logs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Other tabs content would go here */}
          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Management</CardTitle>
                <CardDescription>Manage registered candidates and their exam assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Candidate management interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Upload and manage question banks, exam content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Content management interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Comprehensive analytics and performance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Analytics dashboard would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring</CardTitle>
                <CardDescription>Security logs, audit trails, and threat detection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Security monitoring interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
