import { BackgroundBeams } from "@/components/ui/background-beams"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"
import {
  Github,
  GitPullRequest,
  Bug,
  Lightbulb,
  Code,
  BookOpen,
  Users,
  Heart,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Star,
  Coffee,
} from "lucide-react"
import Link from "next/link"

export default function ContributingPage() {
  const words = "Join the Smart CBT Community"

  const contributionTypes = [
    {
      title: "Code Contributions",
      description: "Submit bug fixes, new features, and improvements to the codebase",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Documentation",
      description: "Help improve guides, API docs, and tutorials for better developer experience",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Bug Reports",
      description: "Report issues, provide detailed reproduction steps, and help with testing",
      icon: <Bug className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Feature Requests",
      description: "Suggest new features and enhancements to make Smart CBT even better",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Community Support",
      description: "Help other users in discussions, forums, and community channels",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Testing & QA",
      description: "Test new releases, provide feedback, and help ensure quality",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
    },
  ]

  const guidelines = [
    {
      title: "Code of Conduct",
      description: "Be respectful, inclusive, and professional in all interactions",
      icon: <Heart className="w-5 h-5 text-red-400" />,
    },
    {
      title: "Issue First",
      description: "Create an issue before starting work on significant changes",
      icon: <AlertCircle className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: "Follow Standards",
      description: "Adhere to coding standards, linting rules, and testing requirements",
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    },
    {
      title: "Clear Communication",
      description: "Write clear commit messages, PR descriptions, and documentation",
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
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
                  Contributing
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                  Open Source Community
                </p>
              </div>
            </div>

            <TextGenerateEffect
              words={words}
              className="text-center text-[40px] md:text-5xl lg:text-6xl font-bold text-neutral-200 max-w-4xl mx-auto"
            />

            <p className="text-neutral-500 max-w-2xl mx-auto my-8 text-lg text-center relative z-10">
              Smart CBT is built by the community, for the community. Whether you're a developer, designer, educator, or
              enthusiast, there are many ways to contribute and make a difference.
            </p>

            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2 text-neutral-400">
                <Star className="w-4 h-4" />
                <span className="text-sm">2.1k stars</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">150+ contributors</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400">
                <GitPullRequest className="w-4 h-4" />
                <span className="text-sm">500+ PRs merged</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                as={Link}
                href="https://github.com/smartcbt/platform"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>

              <Button
                borderRadius="1.75rem"
                className="bg-transparent text-white border-slate-800"
                as={Link}
                href="#get-started"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Ways to Contribute */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Ways to Contribute</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Every contribution matters, no matter how big or small
            </p>
          </div>

          <BentoGrid className="max-w-4xl mx-auto">
            {contributionTypes.map((type, index) => (
              <BentoGridItem
                key={index}
                title={type.title}
                description={type.description}
                header={
                  <div
                    className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br ${type.color} items-center justify-center`}
                  >
                    <div className="text-white">{type.icon}</div>
                  </div>
                }
                icon={type.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Getting Started */}
      <section id="get-started" className="py-20 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Getting Started</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Ready to contribute? Here's how to get started with Smart CBT development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <Github className="w-6 h-6 text-blue-400" />
                  <span>Development Setup</span>
                </CardTitle>
                <CardDescription className="text-neutral-400">
                  Set up your local development environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span className="text-neutral-300">Fork the repository on GitHub</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span className="text-neutral-300">Clone your fork locally</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span className="text-neutral-300">Install dependencies with npm install</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span className="text-neutral-300">Set up your development database</span>
                  </div>
                </div>
                <div className="bg-neutral-800 rounded-lg p-3">
                  <code className="text-green-400 text-sm font-mono">
                    git clone https://github.com/yourusername/smart-cbt.git
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <GitPullRequest className="w-6 h-6 text-green-400" />
                  <span>Making Changes</span>
                </CardTitle>
                <CardDescription className="text-neutral-400">Best practices for contributing code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span className="text-neutral-300">Create a feature branch</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span className="text-neutral-300">Make your changes with tests</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span className="text-neutral-300">Commit with clear messages</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span className="text-neutral-300">Submit a pull request</span>
                  </div>
                </div>
                <div className="bg-neutral-800 rounded-lg p-3">
                  <code className="text-green-400 text-sm font-mono">git checkout -b feature/your-feature-name</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Contribution Guidelines</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Follow these guidelines to ensure smooth collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {guidelines.map((guideline, index) => (
              <Card key={index} className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{guideline.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{guideline.title}</h3>
                      <p className="text-neutral-400">{guideline.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-20 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Recognition & Rewards</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">We appreciate and recognize our contributors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Contributor Badge</h3>
                <p className="text-neutral-400 text-sm">
                  Get recognized in our README and contributor wall for your contributions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Swag & Merch</h3>
                <p className="text-neutral-400 text-sm">
                  Significant contributors receive Smart CBT stickers, t-shirts, and other goodies
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Community Access</h3>
                <p className="text-neutral-400 text-sm">
                  Join our private Discord server and get early access to new features
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Contribute?</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of developers building the future of digital testing. Every contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              as={Link}
              href="https://github.com/smartcbt/platform/issues"
            >
              <Bug className="w-4 h-4 mr-2" />
              Browse Issues
            </Button>
            <Button
              borderRadius="1.75rem"
              className="bg-transparent text-white border-slate-800"
              as={Link}
              href="https://discord.gg/smartcbt"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Discord
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
