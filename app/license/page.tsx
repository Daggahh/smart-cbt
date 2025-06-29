import { BackgroundBeams } from "@/components/ui/background-beams"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"
import { ArrowLeft, Scale, Users, Code, Globe } from "lucide-react"
import Link from "next/link"

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
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

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <SmartCBTLogo className="w-16 h-16" />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                MIT License
              </h1>
              <p className="text-neutral-500 text-sm">Open Source License</p>
            </div>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Smart CBT is released under the MIT License, ensuring freedom and flexibility for all users.
          </p>
        </div>

        {/* License Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Commercial Use</h3>
              <p className="text-neutral-400 text-sm">Use Smart CBT in commercial projects without restrictions</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Modification</h3>
              <p className="text-neutral-400 text-sm">Modify and adapt the code to fit your specific needs</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Distribution</h3>
              <p className="text-neutral-400 text-sm">Distribute original or modified versions freely</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Private Use</h3>
              <p className="text-neutral-400 text-sm">Use privately for personal or internal projects</p>
            </CardContent>
          </Card>
        </div>

        {/* License Text */}
        <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-3">
              <Scale className="w-6 h-6 text-blue-400" />
              <span>MIT License</span>
            </CardTitle>
            <CardDescription className="text-neutral-400">Copyright (c) 2024 Smart CBT Contributors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-neutral-800 rounded-lg p-6 font-mono text-sm text-neutral-300 leading-relaxed">
              <p className="mb-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
                associated documentation files (the "Software"), to deal in the Software without restriction, including
                without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
                following conditions:
              </p>

              <p className="mb-4">
                The above copyright notice and this permission notice shall be included in all copies or substantial
                portions of the Software.
              </p>

              <p className="text-neutral-400 text-xs uppercase tracking-wider">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
                LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">What This Means</CardTitle>
              <CardDescription className="text-neutral-400">Your rights and freedoms with Smart CBT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-white">✅ You Can</h4>
                  <ul className="text-sm text-neutral-400 mt-1 space-y-1">
                    <li>• Use for commercial purposes</li>
                    <li>• Modify the source code</li>
                    <li>• Distribute copies</li>
                    <li>• Place warranty</li>
                    <li>• Use privately</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-white">❌ You Cannot</h4>
                  <ul className="text-sm text-neutral-400 mt-1 space-y-1">
                    <li>• Hold us liable</li>
                    <li>• Use our trademarks</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-white">⚠️ You Must</h4>
                  <ul className="text-sm text-neutral-400 mt-1 space-y-1">
                    <li>• Include copyright notice</li>
                    <li>• Include license text</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Third-Party Licenses</CardTitle>
              <CardDescription className="text-neutral-400">Dependencies and their licenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between items-center py-2 border-b border-neutral-700">
                  <span className="text-neutral-300">Next.js</span>
                  <span className="text-neutral-400">MIT</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-700">
                  <span className="text-neutral-300">React</span>
                  <span className="text-neutral-400">MIT</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-700">
                  <span className="text-neutral-300">TailwindCSS</span>
                  <span className="text-neutral-400">MIT</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-700">
                  <span className="text-neutral-300">Prisma</span>
                  <span className="text-neutral-400">Apache 2.0</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-neutral-300">PostgreSQL</span>
                  <span className="text-neutral-400">PostgreSQL</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-4">
                For a complete list of dependencies and their licenses, see the{" "}
                <Link href="https://github.com/smartcbt/platform/blob/main/package.json" className="text-blue-400">
                  package.json
                </Link>{" "}
                file.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions About Licensing?</h3>
          <p className="text-neutral-400 mb-6">
            Need clarification or have specific licensing questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              as={Link}
              href="https://github.com/smartcbt/platform/issues"
            >
              Ask on GitHub
            </Button>
            <Button
              borderRadius="1.75rem"
              className="bg-transparent text-white border-slate-800"
              as={Link}
              href="/contact"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
