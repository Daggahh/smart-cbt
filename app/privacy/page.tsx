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
  Shield,
  Eye,
  Lock,
  Database,
  Mail,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
            Privacy Policy
          </Badge>
          <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mt-4 mb-2">
            Your privacy is important to us. This policy explains how Smart CBT
            collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            Last updated: July 1, 2025
          </p>
        </div>

        <TracingBeam>
          {/* Privacy Principles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span>Data Protection</span>
                </CardTitle>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  We implement industry-standard security measures to protect
                  your data
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span>Transparency</span>
                </CardTitle>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  Clear information about what data we collect and how we use it
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span>User Control</span>
                </CardTitle>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  You have control over your personal data and privacy settings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Policy Content  */}
          <div className="space-y-8">
            {/* Information We Collect */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  <span>Information We Collect</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Types of data we collect and process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Personal Information
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <li>• Name, email address, and contact information</li>
                    <li>
                      • Student registration numbers and institutional
                      affiliations
                    </li>
                    <li>
                      • Date of birth and demographic information (when
                      required)
                    </li>
                    <li>• Profile pictures and identification documents</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Academic Information
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <li>• Exam responses and scores</li>
                    <li>• Performance analytics and progress tracking</li>
                    <li>• Study patterns and learning preferences</li>
                    <li>• Certification and achievement records</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Technical Information
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <li>• IP addresses and device information</li>
                    <li>• Browser type and operating system</li>
                    <li>• Session logs and activity timestamps</li>
                    <li>• Security and anti-cheating monitoring data</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            {/* How We Use Information */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <span>How We Use Your Information</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Purposes for data processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Service Delivery
                    </h4>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <li>
                        • Providing access to examinations and assessments
                      </li>
                      <li>• Generating and delivering exam results</li>
                      <li>• Creating personalized learning experiences</li>
                      <li>• Maintaining academic records and transcripts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Platform Improvement
                    </h4>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <li>• Analyzing usage patterns to improve features</li>
                      <li>• Developing AI-powered scoring and feedback</li>
                      <li>• Enhancing security and anti-cheating measures</li>
                      <li>• Optimizing system performance and reliability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Communication
                    </h4>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <li>• Sending exam notifications and reminders</li>
                      <li>• Delivering results and performance reports</li>
                      <li>• Providing customer support and assistance</li>
                      <li>• Sharing important platform updates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Compliance & Security
                    </h4>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <li>• Ensuring exam integrity and preventing fraud</li>
                      <li>• Complying with educational regulations</li>
                      <li>• Maintaining audit trails and security logs</li>
                      <li>• Protecting against unauthorized access</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Data Sharing */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  <span>Data Sharing and Disclosure</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  When and how we share your information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
                  <h4 className="font-semibold text-black dark:text-white mb-2">
                    We DO NOT sell your personal data
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Smart CBT never sells, rents, or trades your personal
                    information to third parties for marketing purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Limited Sharing Scenarios
                  </h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <li>
                      • <strong>Educational Institutions:</strong> Sharing
                      results with your registered institution
                    </li>
                    <li>
                      • <strong>Service Providers:</strong> Third-party services
                      that help operate our platform (under strict agreements)
                    </li>
                    <li>
                      • <strong>Legal Requirements:</strong> When required by
                      law or to protect our rights and users
                    </li>
                    <li>
                      • <strong>Business Transfers:</strong> In case of merger,
                      acquisition, or sale of assets (with user notification)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            {/* Data Security */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  <span>Data Security</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  How we protect your information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Technical Safeguards
                    </h4>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <li>• End-to-end encryption for data transmission</li>
                      <li>• Encrypted storage of sensitive information</li>
                      <li>• Regular security audits and penetration testing</li>
                      <li>• Multi-factor authentication for admin access</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Operational Safeguards
                    </h4>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <li>• Access controls and role-based permissions</li>
                      <li>• Regular staff training on data protection</li>
                      <li>
                        • Incident response and breach notification procedures
                      </li>
                      <li>
                        • Secure data centers with physical security measures
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Your Rights */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center space-x-3 text-base sm:text-lg">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  <span>Your Privacy Rights</span>
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Your rights regarding your personal data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Access and Control
                    </h4>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <li>
                        • <strong>Access:</strong> Request a copy of your
                        personal data
                      </li>
                      <li>
                        • <strong>Correction:</strong> Update or correct
                        inaccurate information
                      </li>
                      <li>
                        • <strong>Deletion:</strong> Request deletion of your
                        personal data
                      </li>
                      <li>
                        • <strong>Portability:</strong> Export your data in a
                        machine-readable format
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Communication Preferences
                    </h4>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <li>
                        • <strong>Opt-out:</strong> Unsubscribe from marketing
                        communications
                      </li>
                      <li>
                        • <strong>Preferences:</strong> Choose which
                        notifications to receive
                      </li>
                      <li>
                        • <strong>Consent:</strong> Withdraw consent for data
                        processing
                      </li>
                      <li>
                        • <strong>Complaints:</strong> File complaints with data
                        protection authorities
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    <strong>To exercise your rights:</strong> Contact us at{" "}
                    <a
                      href="mailto:contact.smartcbt@gmail.com"
                      className="underline"
                    >
                      contact.smartcbt@gmail.com
                    </a>{" "}
                    or use the privacy controls in your account settings.
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Contact Information */}
            <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">
                  Contact Us
                </CardTitle>
                <CardDescription className="text-neutral-700 dark:text-neutral-400">
                  Questions about this privacy policy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-3">
                      Privacy Officer
                    </h4>
                    <div className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:contact.smartcbt@gmail.com"
                          className="underline"
                        >
                          contact.smartcbt@gmail.com
                        </a>
                      </p>
                      <p>Name: Smart CBT Team</p>
                      <p>ID: SCBT-001</p>
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
        <div className="text-center mt-12 pt-8 mb-8 border-t-2 border-dashed border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-700 dark:text-neutral-400 text-sm mb-4">
            This privacy policy is part of our commitment to protecting your
            personal information and maintaining your trust.
          </p>
          <div className="flex flex-row gap-2 sm:gap-4 justify-center">
            <Button
              borderRadius="1.75rem"
              className="bg-black dark:bg-slate-900 text-white dark:text-white border-neutral-200 dark:border-slate-800 transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:scale-105 active:scale-95"
              as={Link}
              href="/terms"
            >
              Terms of Service
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
