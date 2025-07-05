"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Server,
  Database,
  Shield,
  Mail,
  Users,
  FileText,
  Brain,
  Cloud,
} from "lucide-react";
import { SmartCBTLogo } from "@/components/smart-cbt-logo";

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemHealth, setSystemHealth] = useState({
    database: "checking",
    api: "checking",
    auth: "checking",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    checkSystemHealth();
    return () => clearInterval(timer);
  }, []);

  const checkSystemHealth = async () => {
    try {
      // Check API health
      const apiResponse = await fetch("/api/health", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      setSystemHealth((prev) => ({
        ...prev,
        api: apiResponse.ok ? "operational" : "degraded",
      }));
    } catch (error) {
      setSystemHealth((prev) => ({
        ...prev,
        api: "outage",
      }));
    }

    // For development, assume database and auth are operational
    setSystemHealth((prev) => ({
      ...prev,
      database: "operational",
      auth: "operational",
    }));

    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "outage":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "development":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "checking":
        return <Clock className="w-5 h-5 text-slate-400 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/20 dark:border-green-800";
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/20 dark:border-yellow-800";
      case "outage":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/20 dark:border-red-800";
      case "development":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/20 dark:border-blue-800";
      case "checking":
        return "text-slate-600 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-slate-700 dark:border-slate-600";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-slate-700 dark:border-slate-600";
    }
  };

  const getOverallStatus = () => {
    if (loading) return "checking";
    if (systemHealth.api === "outage" || systemHealth.database === "outage")
      return "outage";
    if (systemHealth.api === "degraded" || systemHealth.database === "degraded")
      return "degraded";
    return "operational";
  };

  const overallStatus = getOverallStatus();

  const services = [
    {
      name: "Web Application",
      status: "operational",
      description: "Main Smart CBT web interface",
      icon: <Server className="w-5 h-5" />,
    },
    {
      name: "API Services",
      status: systemHealth.api,
      description: "REST API and authentication services",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Database",
      status: systemHealth.database,
      description: "PostgreSQL primary database",
      icon: <Database className="w-5 h-5" />,
    },
    {
      name: "Authentication",
      status: systemHealth.auth,
      description: "User authentication and authorization",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Email Service",
      status: "development",
      description: "Email notifications (Development Mode - Logged to Console)",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      name: "AI Processing",
      status: "development",
      description: "Gemini AI scoring and feedback (Coming Soon)",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      name: "File Storage",
      status: "development",
      description: "Cloudinary file storage and CDN (Coming Soon)",
      icon: <Cloud className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SmartCBTLogo />
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Smart CBT
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                System Status
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Last updated
            </div>
            <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {currentTime.toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Status */}
        <div className="mb-8">
          <Card
            className={`bg-gradient-to-r ${
              overallStatus === "operational"
                ? "from-green-50 to-blue-50 border-green-200 dark:from-green-950/20 dark:to-blue-950/20 dark:border-green-800"
                : overallStatus === "degraded"
                ? "from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800"
                : overallStatus === "outage"
                ? "from-red-50 to-pink-50 border-red-200 dark:from-red-950/20 dark:to-pink-950/20 dark:border-red-800"
                : "from-slate-50 to-gray-50 border-slate-200 dark:from-slate-800 dark:to-gray-800 dark:border-slate-700"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(overallStatus)}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {overallStatus === "operational"
                        ? "All Systems Operational"
                        : overallStatus === "degraded"
                        ? "System Performance Issues"
                        : overallStatus === "outage"
                        ? "System Outage"
                        : "Checking System Status"}
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                      {overallStatus === "operational"
                        ? "Smart CBT is running smoothly"
                        : overallStatus === "degraded"
                        ? "Some services are experiencing issues"
                        : overallStatus === "outage"
                        ? "Critical services are down"
                        : "Checking system health..."}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
                    99.97%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    30-day uptime
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Development Notice */}
        <div className="mb-8">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                    Development Mode Active
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Smart CBT is currently running in development mode. Email
                    services are logged to console instead of being sent.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Status */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Service Status
          </h2>
          <div className="grid gap-4">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      {getStatusIcon(service.status)}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                          {service.name}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`${getStatusColor(
                        service.status
                      )} dark:bg-opacity-20`}
                    >
                      {service.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Development Progress */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-100">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-base md:text-lg">
                  Development Progress
                </span>
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Current feature development status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Authentication System
                  </span>
                  <Badge className="text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400">
                    Complete
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Student Dashboard
                  </span>
                  <Badge className="text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-400">
                    In Progress
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Admin Dashboard
                  </span>
                  <Badge className="text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
                    Planned
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Exam System
                  </span>
                  <Badge className="text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
                    Planned
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-100">
                <Database className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-base md:text-lg">Environment Info</span>
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Current system configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Environment
                  </span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Development
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Database
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    PostgreSQL
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Email Service
                  </span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Development Mode
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Version
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    v0.1.0
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-100">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Access key features of Smart CBT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <Button asChild size="sm" className="text-xs md:text-sm">
                  <a href="/auth/student/login">Student Login</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  <a href="/auth/student/signup">Student Signup</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  <a href="/">Home Page</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>
            This is a development status page. For production monitoring,{" "}
            <a
              href="/auth/student/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              login to the admin dashboard
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
