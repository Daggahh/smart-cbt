"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  BarChart3,
  Shield,
  Upload,
  Settings,
  CheckCircle,
  Server,
  AlertTriangle,
  Clock,
  FileText,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { SmartCBTLogo } from "@/components/smart-cbt-logo";
import { adminAPI } from "@/lib/api";
import {
  getStatusColor,
  getHealthColor,
  generateMockSystemHealth,
  generateMockExams,
  getSystemHealthStatus,
} from "@/lib/admin-utils";

// Types for admin dashboard
interface SystemStats {
  totalCandidates: number;
  activeExams: number;
  completedToday: number;
  systemUptime: number;
}

interface SystemHealth {
  serverLoad: number;
  databasePerformance: number;
  networkLatency: number;
  activeConnections: number;
}

interface Exam {
  id: number;
  title: string;
  candidates: number;
  status: string;
  completion: number;
  startTime: string;
  endTime: string;
}

export default function AdminDashboard() {
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalCandidates: 0,
    activeExams: 0,
    completedToday: 0,
    systemUptime: 0,
  });
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    serverLoad: 0,
    databasePerformance: 0,
    networkLatency: 0,
    activeConnections: 0,
  });
  const [recentExams, setRecentExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState<{ status: string }>({
    status: "checking",
  });

  useEffect(() => {
    // Fetch real data from API
    fetchDashboardData();
    fetchSystemHealth();

    // Fetch system health status for header badge
    getSystemHealthStatus().then((res) =>
      setSystemStatus({ status: res.status || "outage" })
    );

    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
      fetchSystemHealth();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getDashboard();
      if (res.success && res.data) {
        setSystemStats(res.data);
      } else {
        setSystemStats({
          totalCandidates: 0,
          activeExams: 0,
          completedToday: 0,
          systemUptime: 0,
        });
      }

      const mockExams = generateMockExams();
      setRecentExams(mockExams);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemHealth = async () => {
    try {
      // TODO: Replace with actual system health API
      const mockHealth = generateMockSystemHealth();
      setSystemHealth(mockHealth);
    } catch (error) {
      console.error("Failed to fetch system health:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-slate-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SmartCBTLogo />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                Smart CBT
              </h1>
              <p className="text-xs text-slate-600 dark:text-gray-400">
                Admin Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Badge
              variant="outline"
              className={
                systemStatus.status === "operational"
                  ? "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400 text-xs md:text-sm"
                  : systemStatus.status === "degraded"
                  ? "text-yellow-600 border-yellow-600 dark:text-yellow-400 dark:border-yellow-400 text-xs md:text-sm"
                  : systemStatus.status === "checking"
                  ? "text-gray-600 border-gray-600 dark:text-gray-400 dark:border-gray-400 text-xs md:text-sm"
                  : "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400 text-xs md:text-sm"
              }
            >
              {systemStatus.status === "operational" && (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              {systemStatus.status === "degraded" && (
                <AlertTriangle className="w-3 h-3 mr-1" />
              )}
              {systemStatus.status === "checking" && (
                <Clock className="w-3 h-3 mr-1 animate-spin" />
              )}
              {systemStatus.status === "outage" && (
                <XCircle className="w-3 h-3 mr-1" />
              )}
              <span className="hidden sm:inline">
                {systemStatus.status === "operational"
                  ? "System Healthy"
                  : systemStatus.status === "degraded"
                  ? "Performance Issues"
                  : systemStatus.status === "checking"
                  ? "Checking..."
                  : "System Outage"}
              </span>
              <span className="sm:hidden">
                {systemStatus.status === "operational"
                  ? "Healthy"
                  : systemStatus.status === "degraded"
                  ? "Issues"
                  : systemStatus.status === "checking"
                  ? "..."
                  : "Outage"}
              </span>
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex group"
              asChild
            >
              <Link href="/admin/settings">
                <Settings className="w-4 h-4 mr-2 transition-transform group-hover:rotate-180" />
                Settings
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden group"
              asChild
            >
              <Link href="/admin/settings">
                <Settings className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* System Overview */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">
            System Overview
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-gray-400">
            Monitor and manage your CBT platform operations
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="dark:bg-black dark:border-gray-800">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-gray-400">
                    Total Candidates
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white">
                    {loading
                      ? "..."
                      : (systemStats.totalCandidates || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Registered candidates
                  </p>
                </div>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-black dark:border-gray-800">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-gray-400">
                    Active Exams
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white">
                    {loading ? "..." : systemStats.activeExams || 0}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Currently running
                  </p>
                </div>
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-black dark:border-gray-800">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-gray-400">
                    Completed Today
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white">
                    {loading
                      ? "..."
                      : (systemStats.completedToday || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    Today's completions
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-orange-600 dark:text-orange-400 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-black dark:border-gray-800">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-gray-400">
                    System Uptime
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white">
                    {loading ? "..." : systemStats.systemUptime || 0}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Last 30 days
                  </p>
                </div>
                <Server className="w-6 h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="exams" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto">
            <TabsTrigger
              value="exams"
              className="text-xs md:text-sm py-2 md:py-3"
            >
              Live Exams
            </TabsTrigger>
            <TabsTrigger
              value="candidates"
              className="text-xs md:text-sm py-2 md:py-3"
            >
              Candidates
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="text-xs md:text-sm py-2 md:py-3"
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-xs md:text-sm py-2 md:py-3 hidden md:block"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="text-xs md:text-sm py-2 md:py-3 hidden md:block"
            >
              Security
            </TabsTrigger>
          </TabsList>

          {/* Live Exams Tab */}
          <TabsContent value="exams" className="space-y-4 md:space-y-6">
            <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2">
                <Card className="dark:bg-black dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-slate-800 dark:text-white">
                      <span className="text-base md:text-lg">
                        Active Examinations
                      </span>
                      <Button size="sm" asChild className="text-xs md:text-sm">
                        <Link href="/admin/exams/create">
                          Schedule New Exam
                        </Link>
                      </Button>
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-gray-400">
                      Real-time monitoring of ongoing examinations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                          Loading exams...
                        </p>
                      </div>
                    ) : recentExams.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600 dark:text-gray-400">
                          No exams scheduled
                        </p>
                        <Button size="sm" className="mt-4" asChild>
                          <Link href="/admin/exams/create">
                            Create First Exam
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      recentExams.map((exam) => (
                        <div
                          key={exam.id}
                          className="border border-slate-200 dark:border-gray-800 rounded-lg p-3 md:p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base truncate">
                              {exam.title}
                            </h3>
                            <Badge
                              className={`${getStatusColor(
                                exam.status
                              )} text-xs`}
                            >
                              {exam.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm text-slate-600 dark:text-gray-400 mb-4">
                            <div>
                              <span className="font-medium">Candidates:</span>{" "}
                              {exam.candidates.toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span>{" "}
                              {exam.startTime} - {exam.endTime}
                            </div>
                            <div>
                              <span className="font-medium">Progress:</span>{" "}
                              {exam.completion}%
                            </div>
                          </div>

                          {exam.status === "active" && (
                            <div className="space-y-2">
                              <Progress
                                value={exam.completion}
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-slate-500 dark:text-gray-500">
                                <span>
                                  {Math.round(
                                    (exam.completion / 100) * exam.candidates
                                  ).toLocaleString()}{" "}
                                  completed
                                </span>
                                <span>
                                  {(
                                    exam.candidates -
                                    Math.round(
                                      (exam.completion / 100) * exam.candidates
                                    )
                                  ).toLocaleString()}{" "}
                                  in progress
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-end mt-4 space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="text-xs"
                            >
                              <Link href={`/admin/exams/${exam.id}/monitor`}>
                                Monitor
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="text-xs"
                            >
                              <Link href={`/admin/exams/${exam.id}/results`}>
                                Results
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* System Health */}
              <div className="space-y-4 md:space-y-6">
                <Card className="dark:bg-black dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-slate-800 dark:text-white text-base md:text-lg">
                      System Health
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-gray-400">
                      Real-time system monitoring
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-slate-600 dark:text-gray-400">
                        Server Load
                      </span>
                      <span
                        className={`text-xs md:text-sm font-medium ${getHealthColor(
                          systemHealth.serverLoad,
                          "performance"
                        )}`}
                      >
                        {systemHealth.serverLoad}%
                      </span>
                    </div>
                    <Progress value={systemHealth.serverLoad} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-slate-600 dark:text-gray-400">
                        Database Performance
                      </span>
                      <span
                        className={`text-xs md:text-sm font-medium ${getHealthColor(
                          systemHealth.databasePerformance,
                          "performance"
                        )}`}
                      >
                        {systemHealth.databasePerformance}%
                      </span>
                    </div>
                    <Progress
                      value={systemHealth.databasePerformance}
                      className="h-2"
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-slate-600 dark:text-gray-400">
                        Network Latency
                      </span>
                      <span
                        className={`text-xs md:text-sm font-medium ${getHealthColor(
                          systemHealth.networkLatency,
                          "latency"
                        )}`}
                      >
                        {systemHealth.networkLatency}ms
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-slate-600 dark:text-gray-400">
                        Active Connections
                      </span>
                      <span className="text-xs md:text-sm font-medium text-slate-800 dark:text-white">
                        {systemHealth.activeConnections.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-black dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-slate-800 dark:text-white text-base md:text-lg">
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start bg-transparent text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800"
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href="/admin/upload">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Questions
                      </Link>
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800"
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href="/admin/batches">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Batches
                      </Link>
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800"
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href="/admin/reports">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Generate Reports
                      </Link>
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800"
                      variant="outline"
                      size="sm"
                      asChild
                    >
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
            <Card className="dark:bg-black dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-white">
                  Candidate Management
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400">
                  Manage registered candidates and their exam assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-gray-400">
                  Candidate management interface would be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="dark:bg-black dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-white">
                  Content Management
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400">
                  Upload and manage question banks, exam content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-gray-400">
                  Content management interface would be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="dark:bg-black dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-white">
                  Analytics & Reports
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400">
                  Comprehensive analytics and performance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-gray-400">
                  Analytics dashboard would be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="dark:bg-black dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-white">
                  Security Monitoring
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400">
                  Security logs, audit trails, and threat detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-gray-400">
                  Security monitoring interface would be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
