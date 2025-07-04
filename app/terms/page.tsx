import { AuroraBackground } from "@/components/ui/aurora-background";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Button } from "@/components/ui/moving-border";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  Scale,
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <AuroraBackground>
      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/">
          <button className="group relative inline-flex h-10 sm:h-12 items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-neutral-300 transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:scale-110" />
              Back to Home
            </span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
          </button>
        </Link>
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-2">
            Terms of Service
          </Badge>
          <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mt-4 mb-2">
            These terms govern your use of the Smart CBT platform. Please read
            them carefully before using our services.
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            Last updated: July 1, 2025
          </p>
        </div>

        <TracingBeam>
          {/* Key Points */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  User Responsibilities
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  Your obligations when using Smart CBT
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Academic Integrity
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  Maintaining fairness and honesty
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Service Availability
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  Platform access and limitations
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Legal Framework
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  Governing laws and jurisdiction
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <span>Acceptance of Terms</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Agreement to use Smart CBT services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-neutral-700 dark:text-neutral-400">
                  By accessing or using the Smart CBT platform, you agree to be
                  bound by these Terms of Service and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing this platform.
                </p>
                <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    <strong>Important:</strong> These terms constitute a legally
                    binding agreement between you and Smart CBT. Please read
                    them carefully.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Accounts and Registration */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  <span>User Accounts and Registration</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Account creation and management requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Account Requirements
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>
                      • You must be at least 13 years old to create an account
                    </li>
                    <li>
                      • Provide accurate, current, and complete information
                      during registration
                    </li>
                    <li>
                      • Maintain and update your account information as needed
                    </li>
                    <li>
                      • Use only one account per person unless explicitly
                      authorized
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Account Security
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>
                      • Keep your login credentials confidential and secure
                    </li>
                    <li>
                      • Notify us immediately of any unauthorized account access
                    </li>
                    <li>
                      • You are responsible for all activities under your
                      account
                    </li>
                    <li>
                      • Use strong passwords and enable two-factor
                      authentication when available
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Account Termination
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>• You may terminate your account at any time</li>
                    <li>
                      • We may suspend or terminate accounts for violations of
                      these terms
                    </li>
                    <li>
                      • Terminated accounts may result in loss of access to exam
                      results and data
                    </li>
                    <li>
                      • Some data may be retained for legal and administrative
                      purposes
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Academic Integrity and Conduct */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <span>Academic Integrity and Conduct</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Rules for fair and honest exam participation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Prohibited Activities
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>
                      • Cheating, plagiarism, or any form of academic dishonesty
                    </li>
                    <li>
                      • Sharing exam questions, answers, or content with others
                    </li>
                    <li>
                      • Using unauthorized materials, devices, or assistance
                      during exams
                    </li>
                    <li>
                      • Attempting to circumvent security measures or monitoring
                      systems
                    </li>
                    <li>
                      • Impersonating another person or allowing others to take
                      exams for you
                    </li>
                    <li>
                      • Disrupting the exam environment or interfering with
                      other candidates
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Monitoring and Detection
                  </h4>
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
                      <strong>AI-Powered Monitoring:</strong> Our platform uses
                      advanced AI and machine learning to detect suspicious
                      behavior, including:
                    </p>
                    <ul className="space-y-1 text-yellow-700 dark:text-yellow-300 text-sm">
                      <li>• Tab switching and window focus changes</li>
                      <li>• Copy-paste activities and keyboard patterns</li>
                      <li>• Unusual response times and answer patterns</li>
                      <li>
                        • Multiple login attempts from different locations
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Consequences of Violations
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>• Immediate exam termination and score invalidation</li>
                    <li>• Account suspension or permanent ban</li>
                    <li>
                      • Notification to educational institutions or exam bodies
                    </li>
                    <li>• Legal action for severe violations or fraud</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Platform Usage */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  <span>Platform Usage and Restrictions</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Acceptable use of Smart CBT services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Permitted Use
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>• Taking authorized examinations and assessments</li>
                    <li>
                      • Accessing your exam results and performance analytics
                    </li>
                    <li>
                      • Using platform features for legitimate educational
                      purposes
                    </li>
                    <li>• Communicating with support for assistance</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Restrictions
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>
                      • Reverse engineering, decompiling, or attempting to
                      extract source code
                    </li>
                    <li>
                      • Automated access through bots, scrapers, or similar
                      tools
                    </li>
                    <li>
                      • Overloading or attempting to disrupt platform
                      infrastructure
                    </li>
                    <li>
                      • Uploading malicious content, viruses, or harmful code
                    </li>
                    <li>• Violating any applicable laws or regulations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Technical Requirements
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>
                      • Stable internet connection with minimum bandwidth
                      requirements
                    </li>
                    <li>• Compatible web browser with JavaScript enabled</li>
                    <li>
                      • Camera and microphone access for proctored exams (when
                      required)
                    </li>
                    <li>• Updated operating system and security software</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  <span>Intellectual Property Rights</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Ownership and usage rights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Platform Content
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-400 text-sm mb-3">
                    All content on the Smart CBT platform, including but not
                    limited to text, graphics, logos, images, software, and exam
                    questions, is owned by Smart CBT or its licensors and is
                    protected by copyright, trademark, and other intellectual
                    property laws.
                  </p>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>
                      • You may not copy, reproduce, or distribute platform
                      content
                    </li>
                    <li>
                      • Screenshots or recordings of exam content are strictly
                      prohibited
                    </li>
                    <li>
                      • Trademarks and logos may not be used without written
                      permission
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    User Content
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                    By submitting content to the platform (such as exam
                    responses), you grant Smart CBT a license to use, store, and
                    process this content for the purposes of providing our
                    services, including scoring, analytics, and improvement of
                    our AI systems.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  <span>Service Availability and Limitations</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Platform availability and service limitations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Service Availability
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                    <li>
                      • We strive for 99.9% uptime but cannot guarantee
                      uninterrupted service
                    </li>
                    <li>
                      • Scheduled maintenance may temporarily affect platform
                      availability
                    </li>
                    <li>
                      • Emergency maintenance may be performed without prior
                      notice
                    </li>
                    <li>
                      • Service may be limited or unavailable in certain
                      geographic regions
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Disclaimers
                  </h4>
                  <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300 text-sm">
                      <strong>Important:</strong> Smart CBT provides services
                      "as is" without warranties of any kind. We do not
                      guarantee that the platform will be error-free, secure, or
                      available at all times. Use of the platform is at your own
                      risk.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Limitation of Liability
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                    Smart CBT shall not be liable for any indirect, incidental,
                    special, or consequential damages arising from your use of
                    the platform, including but not limited to lost profits,
                    data loss, or business interruption.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <span>Changes to Terms of Service</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  How we handle updates to these terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  Smart CBT reserves the right to modify these Terms of Service
                  at any time. We will notify users of significant changes
                  through:
                </p>
                <ul className="space-y-2 text-neutral-700 dark:text-neutral-400 text-sm">
                  <li>• Email notifications to registered users</li>
                  <li>• Platform announcements and notifications</li>
                  <li>• Updates to this page with revision dates</li>
                </ul>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  Continued use of the platform after changes constitutes
                  acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  <span>Contact Information</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Questions about these terms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Legal Department
                    </h4>
                    <div className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:legal@smartcbt.com"
                          className="underline"
                        >
                          legal@smartcbt.com
                        </a>
                      </p>
                      <p>Name: Smart CBT Legal Team</p>
                      <p>ID: SCBT-LEGAL-01</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Mailing Address
                    </h4>
                    <div className="text-neutral-700 dark:text-neutral-300 text-sm">
                      <p>—</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TracingBeam>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 mb-8 border-t-2 border-dashed border-neutral-800">
          <p className="text-neutral-700 dark:text-neutral-400 text-sm mb-4">
            By using Smart CBT, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service.
          </p>
          <div className="flex flex-row gap-2 sm:gap-4 justify-center">
            <Button
              borderRadius="1.75rem"
              className="bg-black dark:bg-slate-900 text-white dark:text-white border-neutral-200 dark:border-slate-800 transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:scale-105 active:scale-95"
              as={Link}
              href="/privacy"
            >
              Privacy Policy
            </Button>
            <Button
              borderRadius="1.75rem"
              className="bg-transparent text-black dark:text-white border-slate-800 transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:scale-105 active:scale-95"
              as={Link}
              href="mailto:contact.smartcbt@gmail.com"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
