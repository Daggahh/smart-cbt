"use client"
import { useState } from "react"
import type React from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, AlertCircle, User, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "student",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        if (data.user.role === "admin" || data.user.role === "super_admin") {
          window.location.href = "/admin"
        } else {
          window.location.href = "/student"
        }
      } else {
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <BackgroundBeams />

      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-50">
        <Button borderRadius="1.75rem" className="bg-transparent text-white border-slate-800" as={Link} href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <SmartCBTLogo className="w-16 h-16" />
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Smart CBT
                </h1>
                <p className="text-neutral-500 text-sm">Digital Testing Platform</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-neutral-400">Sign in to access your account</p>
          </div>

          {/* Login Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
            <Card className="relative bg-neutral-900/80 border-neutral-800 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-8">
                <Tabs defaultValue="student" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-neutral-800 border-neutral-700">
                    <TabsTrigger
                      value="student"
                      className="flex items-center space-x-2 data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      <User className="w-4 h-4" />
                      <span>Student</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="admin"
                      className="flex items-center space-x-2 data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="student" className="space-y-6 mt-6">
                    <form onSubmit={handleLogin} className="space-y-6">
                      {error && (
                        <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-400">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="student-email" className="text-neutral-200">
                          Email Address
                        </Label>
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="student@example.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student-password" className="text-neutral-200">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="student-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500 pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 text-neutral-300">
                          <input type="checkbox" className="rounded border-neutral-600 bg-neutral-800" />
                          <span>Remember me</span>
                        </label>
                        <Link href="/auth/forgot-password" className="text-blue-400 hover:text-blue-300">
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        borderRadius="1rem"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
                        disabled={isLoading}
                        onClick={handleLogin}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Signing in...
                          </>
                        ) : (
                          "Sign In as Student"
                        )}
                      </Button>
                    </form>

                    <div className="text-center">
                      <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                        <p className="text-xs text-neutral-400 mb-1">Demo Credentials:</p>
                        <p className="text-xs text-neutral-300 font-mono">john.doe@student.com / password123</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="admin" className="space-y-6 mt-6">
                    <form onSubmit={handleLogin} className="space-y-6">
                      {error && (
                        <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-400">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="admin-email" className="text-neutral-200">
                          Admin Email
                        </Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@smartcbt.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="admin-password" className="text-neutral-200">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="admin-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter admin password"
                            value={loginData.password}
                            onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500 pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 text-neutral-300">
                          <input type="checkbox" className="rounded border-neutral-600 bg-neutral-800" />
                          <span>Remember me</span>
                        </label>
                        <Link href="/auth/forgot-password" className="text-blue-400 hover:text-blue-300">
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        borderRadius="1rem"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
                        disabled={isLoading}
                        onClick={handleLogin}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Signing in...
                          </>
                        ) : (
                          "Sign In as Admin"
                        )}
                      </Button>
                    </form>

                    <div className="text-center">
                      <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                        <p className="text-xs text-neutral-400 mb-1">Demo Credentials:</p>
                        <p className="text-xs text-neutral-300 font-mono">admin@smartcbt.com / password123</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 text-center text-sm text-neutral-400">
                  <p>
                    Need help?{" "}
                    <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                      Contact Support
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center text-xs text-neutral-500">
            <p>
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
