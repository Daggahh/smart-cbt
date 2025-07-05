"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { SmartCBTLogo } from "@/components/smart-cbt-logo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(
        decodeURIComponent(error.replace(/\+/g, " ")) ||
          "Invalid email or password. Please try again."
      );
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/admin",
    });
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black px-4">
      {/* Go Back Home Button - Top Left */}
      <div className="pt-6 pb-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back Home
          </Link>
        </Button>
      </div>

      {/* Login Form Container */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-black rounded-xl shadow-lg p-8 space-y-6 border border-slate-200 dark:border-gray-800"
        >
          {/* Smart CBT Logo */}
          <div className="flex justify-center mb-6">
            <SmartCBTLogo />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Access the Smart CBT administration panel
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
