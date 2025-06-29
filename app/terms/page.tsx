import { BackgroundBeams } from "@/components/ui/background-beams"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"
import { ArrowLeft, FileText, Shield, Users, AlertTriangle, CheckCircle, Scale } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
                Terms of Service
              </h1>
              <p className="text-neutral-500 text-sm">Platform Usage Agreement</p>
            </div>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            These terms govern your use of the Smart CBT platform. Please read them carefully before using our services.
          </p>
          <p className="text-sm text-neutral-500 mt-4">Last updated: January 16, 2024</p>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">User Responsibilities</h3>
              <p className="text-neutral-400 text-sm">Your obligations when using Smart CBT</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Academic Integrity</h3>
              <p className="text-neutral-400 text-sm">Maintaining fairness and honesty</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Service Availability</h3>
              <p className="text-neutral-400 text-sm">Platform access and limitations</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Legal Framework</h3>
              <p className="text-neutral-400 text-sm">Governing laws and jurisdiction</p>
            </CardContent>
          </Card>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span>Acceptance of Terms</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">Agreement to use Smart CBT services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-300">
                By accessing or using the Smart CBT platform, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                using or accessing this platform.
              </p>
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  <strong>Important:</strong> These terms constitute a legally binding agreement between you and Smart
                  CBT. Please read them carefully.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts and Registration */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-400" />
                <span>User Accounts and Registration</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Account creation and management requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Account Requirements</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• You must be at least 13 years old to create an account</li>
                  <li>• Provide accurate, current, and complete information during registration</li>
                  <li>• Maintain and update your account information as needed</li>
                  <li>• Use only one account per person unless explicitly authorized</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Account Security</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• Keep your login credentials confidential and secure</li>
                  <li>• Notify us immediately of any unauthorized account access</li>
                  <li>• You are responsible for all activities under your account</li>
                  <li>• Use strong passwords and enable two-factor authentication when available</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Account Termination</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• You may terminate your account at any time</li>
                  <li>• We may suspend or terminate accounts for violations of these terms</li>
                  <li>• Terminated accounts may result in loss of access to exam results and data</li>
                  <li>• Some data may be retained for legal and administrative purposes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Academic Integrity and Conduct */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-400" />
                <span>Academic Integrity and Conduct</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Rules for fair and honest exam participation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Prohibited Activities</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• Cheating, plagiarism, or any form of academic dishonesty</li>
                  <li>• Sharing exam questions, answers, or content with others</li>
                  <li>• Using unauthorized materials, devices, or assistance during exams</li>
                  <li>• Attempting to circumvent security measures or monitoring systems</li>
                  <li>• Impersonating another person or allowing others to take exams for you</li>
                  <li>• Disrupting the exam environment or interfering with other candidates</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Monitoring and Detection</h4>
                <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
                  <p className="text-yellow-300 text-sm mb-2">
                    <strong>AI-Powered Monitoring:</strong> Our platform uses advanced AI and machine learning to detect
                    suspicious behavior, including:
                  </p>
                  <ul className="space-y-1 text-yellow-300 text-sm">
                    <li>• Tab switching and window focus changes</li>
                    <li>• Copy-paste activities and keyboard patterns</li>
                    <li>• Unusual response times and answer patterns</li>
                    <li>• Multiple login attempts from different locations</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Consequences of Violations</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• Immediate exam termination and score invalidation</li>
                  <li>• Account suspension or permanent ban</li>
                  <li>• Notification to educational institutions or exam bodies</li>
                  <li>• Legal action for severe violations or fraud</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Platform Usage */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <FileText className="w-6 h-6 text-purple-400" />
                <span>Platform Usage and Restrictions</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">Acceptable use of Smart CBT services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Permitted Use</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• Taking authorized examinations and assessments</li>
                  <li>• Accessing your exam results and performance analytics</li>
                  <li>• Using platform features for legitimate educational purposes</li>
                  <li>• Communicating with support for assistance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Restrictions</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• Reverse engineering, decompiling, or attempting to extract source code</li>
                  <li>• Automated access through bots, scrapers, or similar tools</li>
                  <li>• Overloading or attempting to disrupt platform infrastructure</li>
                  <li>• Uploading malicious content, viruses, or harmful code</li>
                  <li>• Violating any applicable laws or regulations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Technical Requirements</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• Stable internet connection with minimum bandwidth requirements</li>
                  <li>• Compatible web browser with JavaScript enabled</li>
                  <li>• Camera and microphone access for proctored exams (when required)</li>
                  <li>• Updated operating system and security software</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <Scale className="w-6 h-6 text-red-400" />
                <span>Intellectual Property Rights</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">Ownership and usage rights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Platform Content</h4>
                <p className="text-neutral-300 text-sm mb-3">
                  All content on the Smart CBT platform, including but not limited to text, graphics, logos, images,
                  software, and exam questions, is owned by Smart CBT or its licensors and is protected by copyright,
                  trademark, and other intellectual property laws.
                </p>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• You may not copy, reproduce, or distribute platform content</li>
                  <li>• Screenshots or recordings of exam content are strictly prohibited</li>
                  <li>• Trademarks and logos may not be used without written permission</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">User Content</h4>
                <p className="text-neutral-300 text-sm">
                  By submitting content to the platform (such as exam responses), you grant Smart CBT a license to use,
                  store, and process this content for the purposes of providing our services, including scoring,
                  analytics, and improvement of our AI systems.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <span>Service Availability and Limitations</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Platform availability and service limitations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Service Availability</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
                  <li>• Scheduled maintenance may temporarily affect platform availability</li>
                  <li>• Emergency maintenance may be performed without prior notice</li>
                  <li>• Service may be limited or unavailable in certain geographic regions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Disclaimers</h4>
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <p className="text-red-300 text-sm">
                    <strong>Important:</strong> Smart CBT provides services "as is" without warranties of any kind. We
                    do not guarantee that the platform will be error-free, secure, or available at all times. Use of the
                    platform is at your own risk.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Limitation of Liability</h4>
                <p className="text-neutral-300 text-sm">
                  Smart CBT shall not be liable for any indirect, incidental, special, or consequential damages arising
                  from your use of the platform, including but not limited to lost profits, data loss, or business
                  interruption.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Changes to Terms of Service</CardTitle>
              <CardDescription className="text-neutral-400">How we handle updates to these terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-300 text-sm">
                Smart CBT reserves the right to modify these Terms of Service at any time. We will notify users of
                significant changes through:
              </p>
              <ul className="space-y-2 text-neutral-300 text-sm">
                <li>• Email notifications to registered users</li>
                <li>• Platform announcements and notifications</li>
                <li>• Updates to this page with revision dates</li>
              </ul>
              <p className="text-neutral-300 text-sm">
                Continued use of the platform after changes constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
              <CardDescription className="text-neutral-400">Questions about these terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Legal Department</h4>
                  <div className="space-y-2 text-neutral-300 text-sm">
                    <p>Email: legal@smartcbt.com</p>
                    <p>Phone: +234-800-LEGAL-01</p>
                    <p>Response time: Within 5 business days</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Mailing Address</h4>
                  <div className="text-neutral-300 text-sm">
                    <p>Smart CBT Legal Team</p>
                    <p>123 Education Drive</p>
                    <p>Victoria Island, Lagos</p>
                    <p>Nigeria</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-400 text-sm mb-4">
            By using Smart CBT, you acknowledge that you have read, understood, and agree to be bound by these Terms of
            Service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              as={Link}
              href="/privacy"
            >
              Privacy Policy
            </Button>
            <Button
              borderRadius="1.75rem"
              className="bg-transparent text-white border-slate-800"
              as={Link}
              href="/contact"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
