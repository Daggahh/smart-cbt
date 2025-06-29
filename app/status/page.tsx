"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Server,
  Database,
  Zap,
  Globe,
  Activity,
  TrendingUp,
} from "lucide-react"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const systemStatus = {
    overall: "operational",
    lastUpdated: new Date().toISOString(),
    uptime: 99.97,
  }

  const services = [
    {
      name: "Web Application",
      status: "operational",
      uptime: 99.98,
      responseTime: "145ms",
      description: "Main Smart CBT web interface",
    },
    {
      name: "API Services",
      status: "operational",
      uptime: 99.95,
      responseTime: "89ms",
      description: "REST API and authentication services",
    },
    {
      name: "Database",
      status: "operational",
      uptime: 99.99,
      responseTime: "12ms",
      description: "PostgreSQL primary database",
    },
    {
      name: "AI Processing",
      status: "operational",
      uptime: 99.92,
      responseTime: "2.3s",
      description: "Gemini AI scoring and feedback",
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: 99.96,
      responseTime: "234ms",
      description: "Cloudinary file storage and CDN",
    },
    {
      name: "Email Service",
      status: "degraded",
      uptime: 98.45,
      responseTime: "1.2s",
      description: "Email notifications and results delivery",
    },
    {
      name: "Monitoring",
      status: "operational",
      uptime: 99.94,
      responseTime: "67ms",
      description: "System monitoring and alerting",
    },
    {
      name: "Cache Layer",
      status: "operational",
      uptime: 99.89,
      responseTime: "8ms",
      description: "Redis caching and session storage",
    },
  ]

  const incidents = [
    {
      id: 1,
      title: "Email Service Degraded Performance",
      status: "investigating",
      severity: "minor",
      startTime: "2024-01-15T14:30:00Z",
      description: "Some users may experience delays in receiving email notifications. We are investigating the issue.",
      updates: [
        {
          time: "2024-01-15T15:15:00Z",
          message: "We have identified the issue and are working on a fix.",
        },
        {
          time: "2024-01-15T14:45:00Z",
          message: "Investigating reports of delayed email delivery.",
        },
      ],
    },
  ]

  const metrics = [
    {
      name: "Active Exams",
      value: "15",
      change: "+3",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      name: "Concurrent Users",
      value: "12,847",
      change: "+1,234",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      name: "API Requests/min",
      value: "45,231",
      change: "+5,432",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      name: "Avg Response Time",
      value: "156ms",
      change: "-12ms",
      icon: <Zap className="w-5 h-5" />,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "outage":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-50 border-green-200"
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "outage":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-slate-600 bg-slate-50 border-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SmartCBTLogo />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Smart CBT</h1>
              <p className="text-xs text-slate-600">System Status</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Last updated</div>
            <div className="text-sm font-medium">{currentTime.toLocaleString()}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Status */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">All Systems Operational</h2>
                    <p className="text-slate-600">Smart CBT is running smoothly with {systemStatus.uptime}% uptime</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">{systemStatus.uptime}%</div>
                  <div className="text-sm text-slate-600">30-day uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{metric.name}</p>
                    <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                    <p className="text-sm text-green-600">{metric.change} from last hour</p>
                  </div>
                  <div className="text-slate-400">{metric.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Incidents */}
        {incidents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Active Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <Card key={incident.id} className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span>{incident.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                          {incident.status}
                        </Badge>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                          {incident.severity}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{incident.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-800">Updates</h4>
                      {incident.updates.map((update, index) => (
                        <div key={index} className="flex space-x-3 text-sm">
                          <div className="text-slate-500 min-w-0 flex-shrink-0">
                            {new Date(update.time).toLocaleTimeString()}
                          </div>
                          <div className="text-slate-700">{update.message}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Service Status */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Service Status</h2>
          <div className="grid gap-4">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="font-semibold text-slate-800">{service.name}</h3>
                        <p className="text-sm text-slate-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-slate-800">{service.uptime}%</div>
                        <div className="text-slate-500">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-slate-800">{service.responseTime}</div>
                        <div className="text-slate-500">Response</div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={service.uptime} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Historical Data */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="w-5 h-5" />
                <span>System Performance</span>
              </CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Average Response Time</span>
                  <span className="font-medium">156ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Peak Concurrent Users</span>
                  <span className="font-medium">18,432</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total API Requests</span>
                  <span className="font-medium">2.4M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Error Rate</span>
                  <span className="font-medium text-green-600">0.02%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Database Metrics</span>
              </CardTitle>
              <CardDescription>Current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Connection Pool</span>
                  <span className="font-medium">85% utilized</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Query Performance</span>
                  <span className="font-medium">12ms avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Storage Used</span>
                  <span className="font-medium">2.1TB / 5TB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Backup Status</span>
                  <span className="font-medium text-green-600">Healthy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>
            For real-time updates, follow us on{" "}
            <a href="https://twitter.com/smartcbt" className="text-blue-600 hover:underline">
              Twitter
            </a>{" "}
            or subscribe to our{" "}
            <a href="/status/rss" className="text-blue-600 hover:underline">
              RSS feed
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
