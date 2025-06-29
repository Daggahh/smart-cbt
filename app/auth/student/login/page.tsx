"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "student" }),
    });
    if (res.ok) {
      router.push("/student");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 space-y-6 border border-neutral-200 dark:border-neutral-800"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Student Login</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        
        <div className="text-center space-y-2">
          <Link 
            href="/auth/student/forgot-password" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Forgot your password?
          </Link>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Don't have an account?{" "}
            <Link 
              href="/auth/student/signup" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign up
            </Link>
          </div>
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
      </form>
    </div>
  );
}