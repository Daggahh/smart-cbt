"use client"
import { useState } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Shield,
  AlertTriangle,
  Eye,
  Clock,
  ArrowLeft,
  Activity,
  Lock,
  UserX,
  Wifi,
  Monitor,
  Globe,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function AdminSecurity() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")

  const securityEvents = [
    {
      id: 1,
      type: "suspicious_activity",
      severity: "high",
      description: "Multiple tab switches detected during exam",
      user: "John Doe (STU001)",
      examTitle: "Mathematics Mock Exam",
      timestamp: "2024-01-16T14:23:45Z",
      ipAddress: "192.168.1.45",
      userAgent: "Chrome 120.0.0.0",
      location: "Lagos, Nigeria",
      status: "investigating",
    },
    {
      id: 2,
      type: "login_anomaly",
      severity: "medium",
      description: "Login from unusual location",
      user: "Jane Smith (STU002)",
      examTitle: null,
      timestamp: "2024-01-16T13:15:22Z",
      ipAddress: "41.203.45.123",
      userAgent: "Firefox 121.0.0.0",
      location: "Abuja, Nigeria",
      status: "resolved",
    },
    {
      id: 3,
      type: "copy_attempt",
      severity: "high",
      description: "Copy operation attempted during exam",
      user: "Mike Johnson (STU003)",
      examTitle: "English Language Test",
      timestamp: "2024-01-16T12:45:18Z",
      ipAddress: "192.168.1.67",
      userAgent: "Chrome 120.0.0.0",
      location: "Port Harcourt, Nigeria",
      status: "flagged",
    },
    {
      id: 4,
      type: "failed_login",
      severity: "low",
      description: "Multiple failed login attempts",
      user: "Unknown User",
      examTitle: null,
      timestamp: "2024-01-16T11:30:12Z",
      ipAddress: "203.45.67.89",
      userAgent: "Chrome 119.0.0.0",
      location: "Unknown",
      status: "blocked",
    },
    {
      id: 5,
      type: "window_blur",
      severity: "medium",
      description: "Window lost focus multiple times",
      user: "Sarah Williams (STU004)",
      examTitle: "Physics Practice Test",
      timestamp: "2024-01-16T10:15:33Z",
      ipAddress: "192.168.1.89",
      userAgent: "Safari 17.0.0.0",
      location: "Kano, Nigeria",
      status: "monitoring",
    },
  ]

  const systemMetrics = {
    activeConnections: 12847,
    blockedAttempts: 234,
    flaggedSessions: 15,
    securityScore: 94,
  }

  const filteredEvents = securityEvents.filter((event) => {
    const matchesSearch =
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterSeverity === "all" || event.severity === filterSeverity
    return matchesSearch && matchesFilter
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "outline"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Eye className="w-4 h-4" />
      case "low":
        return <Clock className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "investigating":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-800"
      case "resolved":
        return "bg-green-900/20 text-green-400 border-green-800"
      case "flagged":
        return "bg-red-900/20 text-red-400 border-red-800"
      case "blocked":
        return "bg-red-900/20 text-red-400 border-red-800"
      case "monitoring":
        return "bg-blue-900/20 text-blue-400 border-blue-800"
      default:
        return "bg-neutral-800 text-neutral-400"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "suspicious_activity":
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case "login_anomaly":
        return <UserX className="w-5 h-5 text-yellow-400" />
      case "copy_attempt":
        return <Shield className="w-5 h-5 text-red-400" />
      case "failed_login":
        return <Lock className="w-5 h-5 text-orange-400" />
      case "window_blur":
        return <Monitor className="w-5 h-5 text-blue-400" />
      default:
        return <Activity className="w-5 h-5 text-neutral-400" />
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
              <p className="text-xs text-neutral-400">Security Monitoring</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button borderRadius="1rem" className="bg-transparent text-white border-slate-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button borderRadius="1rem" className="bg-transparent text-white border-slate-800">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
            Security Monitoring
          </h1>
          <p className="text-neutral-400 text-lg">Monitor security events, threats, and system integrity</p>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Security Score</p>
                  <p className="text-2xl font-bold text-green-400">{systemMetrics.securityScore}%</p>
                </div>
                <Shield className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Active Connections</p>
                  <p className="text-2xl font-bold text-white">{systemMetrics.activeConnections.toLocaleString()}</p>
                </div>
                <Wifi className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Blocked Attempts</p>
                  <p className="text-2xl font-bold text-white">{systemMetrics.blockedAttempts}</p>
                </div>
                <UserX className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Flagged Sessions</p>
                  <p className="text-2xl font-bold text-white">{systemMetrics.flaggedSessions}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Security Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
            <TabsTrigger value="events" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
              Security Events
            </TabsTrigger>
            <TabsTrigger
              value="monitoring"
              className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
            >
              Live Monitoring
            </TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
              Threat Detection
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
              Audit Logs
            </TabsTrigger>
          </TabsList>

          {/* Security Events Tab */}
          <TabsContent value="events" className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  placeholder="Search security events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-neutral-400" />
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white"
                >
                  <option value="all">All Severity</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl hover:bg-neutral-900/70 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">{getEventTypeIcon(event.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-white">{event.description}</h3>
                            <Badge variant={getSeverityColor(event.severity)} className="flex items-center space-x-1">
                              {getSeverityIcon(event.severity)}
                              <span className="capitalize">{event.severity}</span>
                            </Badge>
                            <Badge className={getStatusColor(event.status)}>
                              <span className="capitalize">{event.status}</span>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-400">
                            <div>
                              <span className="font-medium">User:</span> {event.user}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span> {new Date(event.timestamp).toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">IP:</span> {event.ipAddress}
                            </div>
                            <div>
                              <span className="font-medium">Location:</span> {event.location}
                            </div>
                          </div>
                          {event.examTitle && (
                            <div className="mt-2 text-sm text-neutral-400">
                              <span className="font-medium">Exam:</span> {event.examTitle}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button borderRadius="0.5rem" className="bg-transparent text-white border-slate-800">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Activity className="w-6 h-6 text-green-400" />
                    <span>Real-time Activity</span>
                  </CardTitle>
                  <CardDescription className="text-neutral-400">Live system monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Active Exam Sessions</span>
                      <span className="text-green-400 font-medium">847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Concurrent Users</span>
                      <span className="text-blue-400 font-medium">12,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Failed Login Attempts</span>
                      <span className="text-red-400 font-medium">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Suspicious Activities</span>
                      <span className="text-yellow-400 font-medium">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Globe className="w-6 h-6 text-blue-400" />
                    <span>Geographic Distribution</span>
                  </CardTitle>
                  <CardDescription className="text-neutral-400">User locations and access patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Lagos, Nigeria</span>
                      <span className="text-white font-medium">4,523</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Abuja, Nigeria</span>
                      <span className="text-white font-medium">3,241</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Kano, Nigeria</span>
                      <span className="text-white font-medium">2,156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Port Harcourt, Nigeria</span>
                      <span className="text-white font-medium">1,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Other Locations</span>
                      <span className="text-white font-medium">1,080</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Threat Detection Tab */}
          <TabsContent value="threats" className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <Shield className="w-6 h-6 text-red-400" />
                  <span>Threat Detection System</span>
                </CardTitle>
                <CardDescription className="text-neutral-400">
                  AI-powered threat detection and prevention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-800">
                    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-red-400">15</div>
                    <div className="text-xs text-neutral-400">High Risk Events</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-800">
                    <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-yellow-400">47</div>
                    <div className="text-xs text-neutral-400">Medium Risk Events</div>
                  </div>
                  <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-blue-400">123</div>
                    <div className="text-xs text-neutral-400">Low Risk Events</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-white">Detection Rules</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-neutral-300">Multiple Tab Switching</span>
                      </div>
                      <Badge className="bg-green-900/20 text-green-400 border-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-neutral-300">Copy/Paste Detection</span>
                      </div>
                      <Badge className="bg-green-900/20 text-green-400 border-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-neutral-300">Unusual Login Patterns</span>
                      </div>
                      <Badge className="bg-green-900/20 text-green-400 border-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-neutral-300">Window Focus Loss</span>
                      </div>
                      <Badge className="bg-green-900/20 text-green-400 border-green-800">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <Activity className="w-6 h-6 text-purple-400" />
                  <span>System Audit Logs</span>
                </CardTitle>
                <CardDescription className="text-neutral-400">
                  Comprehensive audit trail of all system activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-neutral-300">Admin login: admin@smartcbt.com</span>
                    </div>
                    <span className="text-neutral-400 text-sm">2 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-neutral-300">Exam created: Mathematics Mock Test</span>
                    </div>
                    <span className="text-neutral-400 text-sm">15 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                    <div className="flex items-center space-x-3">
                      <UserX className="w-4 h-4 text-red-400" />
                      <span className="text-neutral-300">Student suspended: STU003</span>
                    </div>
                    <span className="text-neutral-400 text-sm">1 hour ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-4 h-4 text-purple-400" />
                      <span className="text-neutral-300">Batch created: Morning Batch E</span>
                    </div>
                    <span className="text-neutral-400 text-sm">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-4 h-4 text-yellow-400" />
                      <span className="text-neutral-300">System backup completed</span>
                    </div>
                    <span className="text-neutral-400 text-sm">3 hours ago</span>
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
