"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError("Invalid or missing reset token");
    }
  }, [searchParams]);

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const response = await authAPI.resetPassword({ token, password });

    if (response.success) {
      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/student/login");
      }, 2000);
    } else {
      setError(response.error || "Failed to reset password");
    }

    setLoading(false);
  }

  if (!token && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 space-y-6 border border-neutral-200 dark:border-neutral-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Enter your new password below.
          </p>
        </div>

        {error && !token && (
          <div className="text-red-500 text-sm text-center">
            {error}
            <div className="mt-4">
              <Link
                href="/auth/student/forgot-password"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Request new reset link
              </Link>
            </div>
          </div>
        )}

        {token && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {success && (
              <div className="text-green-500 text-sm text-center">
                {success}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}

        <div className="text-center">
          <Link
            href="/auth/student/login"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
