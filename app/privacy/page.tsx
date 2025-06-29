import { BackgroundBeams } from "@/components/ui/background-beams"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/moving-border"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Globe } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-neutral-500 text-sm">Data Protection & Privacy</p>
            </div>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how Smart CBT collects, uses, and protects your
            personal information.
          </p>
          <p className="text-sm text-neutral-500 mt-4">Last updated: January 16, 2024</p>
        </div>

        {/* Privacy Principles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Data Protection</h3>
              <p className="text-neutral-400 text-sm">
                We implement industry-standard security measures to protect your data
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Transparency</h3>
              <p className="text-neutral-400 text-sm">Clear information about what data we collect and how we use it</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">User Control</h3>
              <p className="text-neutral-400 text-sm">You have control over your personal data and privacy settings</p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <Database className="w-6 h-6 text-blue-400" />
                <span>Information We Collect</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">Types of data we collect and process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Personal Information</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• Name, email address, and contact information</li>
                  <li>• Student registration numbers and institutional affiliations</li>
                  <li>• Date of birth and demographic information (when required)</li>
                  <li>• Profile pictures and identification documents</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Academic Information</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• Exam responses and scores</li>
                  <li>• Performance analytics and progress tracking</li>
                  <li>• Study patterns and learning preferences</li>
                  <li>• Certification and achievement records</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Technical Information</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>• IP addresses and device information</li>
                  <li>• Browser type and operating system</li>
                  <li>• Session logs and activity timestamps</li>
                  <li>• Security and anti-cheating monitoring data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <Globe className="w-6 h-6 text-green-400" />
                <span>How We Use Your Information</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">Purposes for data processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Service Delivery</h4>
                  <ul className="space-y-2 text-neutral-300 text-sm">
                    <li>• Providing access to examinations and assessments</li>
                    <li>• Generating and delivering exam results</li>
                    <li>• Creating personalized learning experiences</li>
                    <li>• Maintaining academic records and transcripts</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Platform Improvement</h4>
                  <ul className="space-y-2 text-neutral-300 text-sm">
                    <li>• Analyzing usage patterns to improve features</li>
                    <li>• Developing AI-powered scoring and feedback</li>
                    <li>• Enhancing security and anti-cheating measures</li>
                    <li>• Optimizing system performance and reliability</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Communication</h4>
                  <ul className="space-y-2 text-neutral-300 text-sm">
                    <li>• Sending exam notifications and reminders</li>
                    <li>• Delivering results and performance reports</li>
                    <li>• Providing customer support and assistance</li>
                    <li>• Sharing important platform updates</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Compliance & Security</h4>
                  <ul className="space-y-2 text-neutral-300 text-sm">
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
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <Mail className="w-6 h-6 text-purple-400" />
                <span>Data Sharing and Disclosure</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">When and how we share your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-neutral-800 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">We DO NOT sell your personal data</h4>
                <p className="text-neutral-300 text-sm">
                  Smart CBT never sells, rents, or trades your personal information to third parties for marketing
                  purposes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Limited Sharing Scenarios</h4>
                <ul className="space-y-2 text-neutral-300 text-sm">
                  <li>
                    • <strong>Educational Institutions:</strong> Sharing results with your registered institution
                  </li>
                  <li>
                    • <strong>Service Providers:</strong> Third-party services that help operate our platform (under
                    strict agreements)
                  </li>
                  <li>
                    • <strong>Legal Requirements:</strong> When required by law or to protect our rights and users
                  </li>
                  <li>
                    • <strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets (with user
                    notification)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <Shield className="w-6 h-6 text-red-400" />
                <span>Data Security</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">How we protect your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Technical Safeguards</h4>
                  <ul className="space-y-2 text-neutral-300 text-sm">
                    <li>• End-to-end encryption for data transmission</li>
                    <li>• Encrypted storage of sensitive information</li>
                    <li>• Regular security audits and penetration testing</li>
                    <li>• Multi-factor authentication for admin access</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Operational Safeguards</h4>
                  <ul className="space-y-2 text-neutral-300 text-sm">
                    <li>• Access controls and role-based permissions</li>
                    <li>• Regular staff training on data protection</li>
                    <li>• Incident response and breach notification procedures</li>
                    <li>• Secure data centers with physical security measures</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <Eye className="w-6 h-6 text-yellow-400" />
                <span>Your Privacy Rights</span>
              </CardTitle>
              <CardDescription className="text-neutral-400">Your rights regarding your personal data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Access and Control</h4>
                  <ul className="space-y-2 text-neutral-300 text-sm">
                    <li>
                      • <strong>Access:</strong> Request a copy of your personal data
                    </li>
                    <li>
                      • <strong>Correction:</strong> Update or correct inaccurate information
                    </li>
                    <li>
                      • <strong>Deletion:</strong> Request deletion of your personal data
                    </li>
                    <li>
                      • <strong>Portability:</strong> Export your data in a machine-readable format
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Communication Preferences</h4>
                  <ul className="space-y-2 text-neutral-300 text-sm">
                    <li>
                      • <strong>Opt-out:</strong> Unsubscribe from marketing communications
                    </li>
                    <li>
                      • <strong>Preferences:</strong> Choose which notifications to receive
                    </li>
                    <li>
                      • <strong>Consent:</strong> Withdraw consent for data processing
                    </li>
                    <li>
                      • <strong>Complaints:</strong> File complaints with data protection authorities
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mt-4">
                <p className="text-blue-300 text-sm">
                  <strong>To exercise your rights:</strong> Contact us at privacy@smartcbt.com or use the privacy
                  controls in your account settings.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Contact Us</CardTitle>
              <CardDescription className="text-neutral-400">Questions about this privacy policy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Privacy Officer</h4>
                  <div className="space-y-2 text-neutral-300 text-sm">
                    <p>Email: privacy@smartcbt.com</p>
                    <p>Phone: +234-800-PRIVACY</p>
                    <p>Response time: Within 30 days</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Mailing Address</h4>
                  <div className="text-neutral-300 text-sm">
                    <p>Smart CBT Privacy Team</p>
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
            This privacy policy is part of our commitment to protecting your personal information and maintaining your
            trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              as={Link}
              href="/terms"
            >
              Terms of Service
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
