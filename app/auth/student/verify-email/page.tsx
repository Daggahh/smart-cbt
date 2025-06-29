"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";

export default function VerifyEmailPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      verifyEmail(tokenParam);
    } else {
      setError("Invalid or missing verification token");
      setLoading(false);
    }
  }, [searchParams]);

  async function verifyEmail(token: string) {
    try {
      const response = await authAPI.verifyEmail({ token });

      if (response.success) {
        setSuccess(
          "Email verified successfully! You can now log in to your account."
        );
      } else {
        setError(response.error || "Failed to verify email");
      }
    } catch (error) {
      setError("An error occurred during verification");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 space-y-6 border border-neutral-200 dark:border-neutral-800 text-center">
        {success ? (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              {success}
            </p>
            <Button
              onClick={() => router.push("/auth/student/login")}
              className="w-full"
            >
              Continue to Login
            </Button>
          </>
        ) : (
          <>
            <div className="text-red-500 text-6xl mb-4">✗</div>
            <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              {error}
            </p>
            <div className="space-y-3">
              <Link href="/auth/student/login">
                <Button variant="outline" className="w-full">
                  Go to Login
                </Button>
              </Link>
              <p className="text-xs text-neutral-500">
                Need a new verification link?{" "}
                <Link
                  href="/auth/student/login"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
