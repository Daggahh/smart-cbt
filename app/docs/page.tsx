"use client"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/moving-border"
import { Badge } from "@/components/ui/badge"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"
import {
  BookOpen,
  Code,
  ExternalLink,
  Github,
  Play,
  Shield,
  Users,
  Zap,
  Terminal,
  Database,
  Brain,
  Lock,
  Globe,
  Rocket,
} from "lucide-react"
import Link from "next/link"

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <BookOpen className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Features",
    link: "#features",
    icon: <Zap className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "API",
    link: "#api",
    icon: <Code className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "GitHub",
    link: "https://github.com/smartcbt/platform",
    icon: <Github className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
]

export default function DocsPage() {
  const words = "Complete Documentation for Smart CBT Platform"

  const quickStartSteps = [
    {
      step: 1,
      title: "Clone Repository",
      description: "Get the Smart CBT source code",
      code: "git clone https://github.com/smartcbt/platform.git",
      icon: <Github className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Install Dependencies",
      description: "Install required packages",
      code: "npm install && npm run setup",
      icon: <Terminal className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Setup Database",
      description: "Configure PostgreSQL database",
      code: "npm run db:setup && npm run db:seed",
      icon: <Database className="w-6 h-6" />,
    },
    {
      step: 4,
      title: "Start Development",
      description: "Run the development server",
      code: "npm run dev",
      icon: <Rocket className="w-6 h-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <FloatingNav navItems={navItems} />

      {/* Hero Section */}
      <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="absolute inset-0 w-full h-full bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <BackgroundBeams />

        <div className="max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <SmartCBTLogo className="w-16 h-16" />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                  Documentation
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                  Smart CBT Platform Guide
                </p>
              </div>
            </div>

            <TextGenerateEffect
              words={words}
              className="text-center text-[30px] md:text-4xl lg:text-5xl font-bold text-neutral-200 max-w-4xl mx-auto"
            />

            <p className="text-neutral-500 max-w-2xl mx-auto my-8 text-lg text-center relative z-10">
              Everything you need to deploy, customize, and scale Smart CBT for your organization. From quick setup to
              advanced configurations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                as={Link}
                href="#quick-start"
              >
                <Play className="w-4 h-4 mr-2" />
                Quick Start
              </Button>

              <Button
                borderRadius="1.75rem"
                className="bg-transparent text-white border-slate-800"
                as={Link}
                href="https://github.com/smartcbt/platform"
              >
                <Github className="w-4 h-4 mr-2" />
                View Source
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <section id="quick-start" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Quick Start Guide</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Get Smart CBT running in your environment within minutes
            </p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto">
            {quickStartSteps.map((step, index) => (
              <BentoGridItem
                key={step.step}
                title={`${step.step}. ${step.title}`}
                description={step.description}
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 items-center justify-center">
                    <div className="text-white">{step.icon}</div>
                  </div>
                }
                icon={
                  <div className="bg-neutral-900 text-green-400 p-3 rounded-md font-mono text-xs w-full overflow-x-auto">
                    {step.code}
                  </div>
                }
                className={index === 0 || index === 3 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Features Documentation */}
      <section id="features" className="py-20 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Feature Documentation</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Comprehensive guides for every Smart CBT feature
            </p>
          </div>

          <BentoGrid className="max-w-4xl mx-auto">
            <BentoGridItem
              title="Student Portal"
              description="Dashboard, exam interface, results, and performance tracking"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"></div>
              }
              icon={<Users className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="Admin Management"
              description="Exam creation, batch management, monitoring, and analytics"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500"></div>
              }
              icon={<Shield className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="AI Integration"
              description="Gemini AI scoring, feedback generation, and content processing"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500"></div>
              }
              icon={<Brain className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="Security & Anti-Cheating"
              description="Advanced security measures, monitoring, and fraud detection"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-red-500 via-pink-500 to-rose-500"></div>
              }
              icon={<Lock className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="API Reference"
              description="Complete REST API documentation with examples"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500"></div>
              }
              icon={<Code className="h-4 w-4 text-neutral-500" />}
            />
            <BentoGridItem
              title="Deployment Guide"
              description="Docker, Kubernetes, and production deployment strategies"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500"></div>
              }
              icon={<Globe className="h-4 w-4 text-neutral-500" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* API Documentation */}
      <section id="api" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">API Documentation</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              RESTful APIs for integration and custom development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Authentication",
                description: "JWT-based authentication and authorization",
                endpoint: "/api/auth",
                methods: ["POST", "GET"],
              },
              {
                title: "Exams",
                description: "Create, manage, and monitor examinations",
                endpoint: "/api/exams",
                methods: ["GET", "POST", "PUT", "DELETE"],
              },
              {
                title: "Students",
                description: "Student management and registration",
                endpoint: "/api/students",
                methods: ["GET", "POST", "PUT"],
              },
              {
                title: "Results",
                description: "Exam results and performance analytics",
                endpoint: "/api/results",
                methods: ["GET", "POST"],
              },
              {
                title: "AI Scoring",
                description: "Gemini AI integration for automated scoring",
                endpoint: "/api/ai/score",
                methods: ["POST"],
              },
              {
                title: "File Upload",
                description: "Question bank and media file uploads",
                endpoint: "/api/upload",
                methods: ["POST"],
              },
            ].map((api, index) => (
              <div
                key={index}
                className="group relative bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{api.title}</h3>
                </div>
                <p className="text-neutral-400 mb-4">{api.description}</p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-neutral-500">Endpoint:</span>
                    <code className="ml-2 text-green-400 bg-neutral-800 px-2 py-1 rounded">{api.endpoint}</code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-500 text-sm">Methods:</span>
                    {api.methods.map((method) => (
                      <Badge key={method} variant="outline" className="text-xs">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technology Stack</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Modern, scalable technologies powering Smart CBT
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Frontend", techs: ["Next.js 14", "TailwindCSS", "Framer Motion", "shadcn/ui"] },
              { category: "Backend", techs: ["Node.js", "PostgreSQL", "Prisma ORM", "Redis"] },
              { category: "AI & Services", techs: ["Gemini AI", "Resend", "Cloudinary", "BullMQ"] },
              { category: "DevOps", techs: ["Docker", "Kubernetes", "Prometheus", "Grafana"] },
            ].map((stack, index) => (
              <div
                key={index}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{stack.category}</h3>
                <div className="space-y-2">
                  {stack.techs.map((tech) => (
                    <div key={tech} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-neutral-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join the community building the future of digital testing. Deploy Smart CBT today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              as={Link}
              href="/auth/login"
            >
              <Play className="w-4 h-4 mr-2" />
              Try Demo
            </Button>
            <Button
              borderRadius="1.75rem"
              className="bg-transparent text-white border-slate-800"
              as={Link}
              href="https://github.com/smartcbt/platform"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Source
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
