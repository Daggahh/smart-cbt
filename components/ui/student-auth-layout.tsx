"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import StudentAuthForm from "@/components/ui/student-auth-form";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

interface StudentAuthLayoutProps {
  formType:
    | "login"
    | "signup"
    | "forgot-password"
    | "reset-password"
    | "verify-email";
}

export default function StudentAuthLayout({
  formType,
}: StudentAuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center overflow-hidden rounded-md">
      {/* Background Beams */}
      <BackgroundBeams />

      {/* Back to Home Button */}
      <motion.div
        className="absolute top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <motion.button
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-300 transition-all duration-300 hover:bg-neutral-800 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
              Back to Home
            </span>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
              initial={false}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-40 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <StudentAuthForm formType={formType} />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
    </div>
  );
}
