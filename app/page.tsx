"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from "@/components/ui/moving-border";
import { SmartCBTLogo } from "@/components/smart-cbt-logo";
import {
  Shield,
  Users,
  Brain,
  BarChart3,
  Globe,
  Zap,
  Github,
  BookOpen,
  Download,
  Star,
  GitFork,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/ui/grid-background";
import { motion } from "framer-motion";
import { GridBackgroundStack } from "@/components/ui/grid-background-stack";
import { IconBrandNextjs } from "@tabler/icons-react";
import {
  siDocker,
  siGithub,
  siGoogle,
  siGooglegemini,
  siKubernetes,
  siNextdotjs,
  siPostgresql,
  siRedis,
  siX,
} from "simple-icons";

const navItems = [
  {
    name: "Features",
    link: "#features",
    icon: <BookOpen className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Stack",
    link: "#stack",
    icon: <Shield className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Documentation",
    link: "/docs",
    icon: <BookOpen className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "GitHub",
    link: "https://github.com/smartcbt/platform",
    icon: <Github className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

// Helper to render a simple-icons SVG
function SimpleIcon({
  icon,
  size = 32,
  className = "",
}: {
  icon: any;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  const words = "Secure Digital Testing for Millions of Candidates";

  return (
    <div className="min-h-screen bg-background antialiased relative overflow-hidden">
      <FloatingNav navItems={navItems} />

      {/* Hero Section */}
      <div
        className="pt-24 w-full rounded-md relative flex flex-col items-center justify-center antialiased"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        {/* Minimal, theme-adaptive grid background */}
        <GridBackground />
        <div className="max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 px-4">
          <div className="text-center">
            {/* Hero Badge in Emphasized Box */}
            <Badge variant="secondary" className="mb-2">
              Open-Source Digital Testing Platform
            </Badge>

            {/* Animated Description */}
            <TextGenerateEffect
              words={words}
              className="text-center text-[40px] md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 max-w-4xl mx-auto"
            />

            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto my-8 text-lg text-center relative z-10">
              Built for high-stakes examinations like JAMB, WAEC, and national
              assessments. Smart CBT delivers uncompromising security,
              AI-powered scoring, and seamless scalability.
            </p>

            {/* GitHub Stats */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2 text-neutral-400">
                <Star className="w-4 h-4" />
                <span className="text-sm">2.1k stars</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400">
                <GitFork className="w-4 h-4" />
                <span className="text-sm">456 forks</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400">
                <Download className="w-4 h-4" />
                <span className="text-sm">12k downloads</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                borderRadius="1.75rem"
                className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:text-white dark:hover:text-black transition-colors duration-200 shadow-lg"
                as={Link}
                href="/auth/login"
              >
                Get Started
              </Button>

              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors duration-200 shadow-lg"
                as={Link}
                href="https://github.com/Daggahh/smart-cbt"
              >
                <Github className="w-4 h-4 mr-2 text-black dark:text-white" />
                <span className="font-semibold">View on GitHub</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Every feature designed for large-scale, high-integrity digital
              examinations
            </p>
          </motion.div>

          <BentoGrid className="max-w-4xl mx-auto">
            <BentoGridItem
              title="AI-Powered Scoring"
              description="Gemini AI instantly scores MCQs and provides detailed explanatory feedback with natural language processing."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 0.7 }}
                    whileTap={{ scale: 0.6 }}
                    className="flex items-center justify-center w-10 h-10"
                  >
                    <Brain className="h-5 w-5 text-black dark:text-white" />
                  </motion.div>
                </div>
              }
              icon={null}
            />
            <BentoGridItem
              title="Anti-Cheating System"
              description="Advanced security measures including randomized questions, activity monitoring, and behavior analysis."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 0.7 }}
                    whileTap={{ scale: 0.6 }}
                    className="flex items-center justify-center w-10 h-10"
                  >
                    <Shield className="h-5 w-5 text-black dark:text-white" />
                  </motion.div>
                </div>
              }
              icon={null}
            />
            <BentoGridItem
              title="Batch Management"
              description="Organize millions of candidates into manageable examination batches with regional distribution."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 0.7 }}
                    whileTap={{ scale: 0.6 }}
                    className="flex items-center justify-center w-10 h-10"
                  >
                    <Users className="h-5 w-5 text-black dark:text-white" />
                  </motion.div>
                </div>
              }
              icon={null}
            />
            <BentoGridItem
              title="Offline Capability"
              description="Reliable testing with local exam caching, auto-resume sessions, and sync capabilities."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 0.7 }}
                    whileTap={{ scale: 0.6 }}
                    className="flex items-center justify-center w-10 h-10"
                  >
                    <Globe className="h-5 w-5 text-black dark:text-white" />
                  </motion.div>
                </div>
              }
              icon={null}
            />
            <BentoGridItem
              title="Real-time Analytics"
              description="Comprehensive insights with performance metrics, system health monitoring, and custom reports."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 0.7 }}
                    whileTap={{ scale: 0.6 }}
                    className="flex items-center justify-center w-10 h-10"
                  >
                    <BarChart3 className="h-5 w-5 text-black dark:text-white" />
                  </motion.div>
                </div>
              }
              icon={null}
            />
            <BentoGridItem
              title="Content Management"
              description="Flexible question bank management with AI-assisted formatting and bulk import capabilities."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 0.7 }}
                    whileTap={{ scale: 0.6 }}
                    className="flex items-center justify-center w-10 h-10"
                  >
                    <Zap className="h-5 w-5 text-black dark:text-white" />
                  </motion.div>
                </div>
              }
              icon={null}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="py-20 px-4 relative overflow-hidden">
        <GridBackgroundStack fade="both" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
              Modern Tech Stack
            </h2>
            <p className="text-xl text-black dark:text-neutral-400 max-w-2xl mx-auto">
              Built with cutting-edge technologies for scalability and
              performance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              {
                name: "Next.js",
                color: "from-gray-700 to-gray-900",
                icon: siNextdotjs,
              },
              {
                name: "PostgreSQL",
                color: "from-blue-600 to-blue-800",
                icon: siPostgresql,
              },
              {
                name: "Gemini AI",
                color: "from-purple-600 to-purple-800",
                icon: siGooglegemini,
              },
              {
                name: "Redis",
                color: "from-red-600 to-red-800",
                icon: siRedis,
              },
              {
                name: "Docker",
                color: "from-blue-500 to-blue-700",
                icon: siDocker,
              },
              {
                name: "Kubernetes",
                color: "from-indigo-600 to-indigo-800",
                icon: siKubernetes,
              },
            ].map((tech, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <SimpleIcon
                    icon={tech.icon}
                    size={32}
                    className="text-white"
                  />
                </div>
                <p className="text-neutral-300 text-sm">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <SmartCBTLogo className="w-8 h-8" />
                <div>
                  <h3 className="font-bold text-white">Smart CBT</h3>
                  <p className="text-xs text-neutral-400">
                    Open-Source Testing Platform
                  </p>
                </div>
              </div>
              <p className="text-neutral-400 text-sm max-w-md">
                Secure, scalable, and intelligent computer-based testing
                platform for educational institutions worldwide.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <a
                  href="https://github.com/Daggahh/smart-cbt"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <SimpleIcon
                    icon={siGithub}
                    size={20}
                    className="text-white"
                  />
                </a>
                <a
                  href="https://x.com/smartcbt"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <SimpleIcon icon={siX} size={20} className="text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Project</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a
                    href="https://github.com/Daggahh/smart-cbt"
                    className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="/docs"
                    className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="/status"
                    className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a
                    href="https://github.com/Daggahh/smart-cbt/blob/main/CONTRIBUTING.md"
                    className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Contributing
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Daggahh/smart-cbt/issues"
                    className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Issues
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Daggahh/smart-cbt/blob/main/LICENSE"
                    className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dashed border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
            <p>
              &copy; 2025 Smart CBT. Open source under MIT License. Built for
              educational excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
