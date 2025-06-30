"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";

type FormType =
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "verify-email";

interface StudentAuthFormProps {
  formType: FormType;
}

export default function StudentAuthForm({ formType }: StudentAuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    registrationNumber: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formType === "signup" || formType === "reset-password") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return false;
      }
    }
    if (formType === "signup") {
      if (!formData.email || !formData.firstName || !formData.lastName) {
        setError("Please fill in all required fields");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      let response;
      switch (formType) {
        case "login":
          response = await authAPI.login({
            email: formData.email,
            password: formData.password,
            role: "student",
          });
          if (response.success) {
            router.push("/student");
          } else {
            setError(response.error || "Login failed");
          }
          break;

        case "signup":
          const { confirmPassword, ...signupData } = formData;
          response = await authAPI.signup(signupData);
          if (response.success) {
            setSuccess(
              "Account created successfully! Please check your email to verify your account."
            );
            setTimeout(() => {
              router.push("/auth/student/login");
            }, 3000);
          } else {
            setError(response.error || "Signup failed");
          }
          break;

        case "forgot-password":
          response = await authAPI.forgotPassword({ email: formData.email });
          if (response.success) {
            setSuccess(
              "Password reset instructions have been sent to your email address."
            );
            setFormData({ ...formData, email: "" });
          } else {
            setError(response.error || "Failed to send reset email");
          }
          break;

        case "reset-password":
          const token = searchParams.get("token");
          if (!token) {
            setError("Invalid or missing reset token");
            break;
          }
          response = await authAPI.resetPassword({
            token,
            password: formData.password,
          });
          if (response.success) {
            setSuccess("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
              router.push("/auth/student/login");
            }, 2000);
          } else {
            setError(response.error || "Failed to reset password");
          }
          break;

        case "verify-email":
          const verifyToken = searchParams.get("token");
          if (!verifyToken) {
            setError("Invalid or missing verification token");
            break;
          }
          response = await authAPI.verifyEmail({ token: verifyToken });
          if (response.success) {
            setSuccess(
              "Email verified successfully! You can now log in to your account."
            );
          } else {
            setError(response.error || "Failed to verify email");
          }
          break;
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const getFormConfig = () => {
    switch (formType) {
      case "login":
        return {
          title: "Welcome back",
          subtitle: "Sign in to your Smart CBT account",
          submitText: "Sign in",
          loadingText: "Signing in...",
        };
      case "signup":
        return {
          title: "Create your account",
          subtitle: "Join Smart CBT to start your learning journey",
          submitText: "Create account",
          loadingText: "Creating account...",
        };
      case "forgot-password":
        return {
          title: "Forgot your password?",
          subtitle: "Enter your email and we'll send you reset instructions",
          submitText: "Send reset instructions",
          loadingText: "Sending...",
        };
      case "reset-password":
        return {
          title: "Reset your password",
          subtitle: "Enter your new password below",
          submitText: "Reset password",
          loadingText: "Resetting...",
        };
      case "verify-email":
        return {
          title: "Verify your email",
          subtitle: "We're verifying your email address",
          submitText: "Verify email",
          loadingText: "Verifying...",
        };
    }
  };

  const config = getFormConfig();

  const renderFormFields = () => {
    switch (formType) {
      case "login":
        return (
          <>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </>
        );

      case "signup":
        return (
          <>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="dateOfBirth">Date of Birth (optional)</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="registrationNumber">
                Registration Number (optional)
              </Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                placeholder="STU001"
                value={formData.registrationNumber}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </>
        );

      case "forgot-password":
        return (
          <LabelInputContainer className="mb-8">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        );

      case "reset-password":
        return (
          <>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </>
        );

      case "verify-email":
        return null; // No form fields for verification
    }
  };

  const renderLinks = () => {
    switch (formType) {
      case "login":
        return (
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
        );

      case "signup":
        return (
          <div className="text-center">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                href="/auth/student/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        );

      case "forgot-password":
        return (
          <div className="text-center">
            <Link
              href="/auth/student/login"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to login
            </Link>
          </div>
        );

      case "reset-password":
        return (
          <div className="text-center">
            <Link
              href="/auth/student/login"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to login
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  if (formType === "verify-email") {
    // Handle verification automatically
    React.useEffect(() => {
      const token = searchParams.get("token");
      if (token) {
        handleSubmit({ preventDefault: () => {} } as any);
      }
    }, []);

    return (
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          {config.title}
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          {config.subtitle}
        </p>
        {loading && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Verifying your email...</p>
          </div>
        )}
        {error && (
          <div className="mt-6 text-center">
            <div className="text-red-500 text-6xl mb-4">✗</div>
            <h3 className="text-lg font-semibold mb-2">Verification Failed</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              {error}
            </p>
            <Link href="/auth/student/login">
              <Button variant="outline" className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        )}
        {success && (
          <div className="mt-6 text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h3 className="text-lg font-semibold mb-2">Email Verified!</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              {success}
            </p>
            <Button
              onClick={() => router.push("/auth/student/login")}
              className="w-full"
            >
              Continue to Login
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {config.title}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {config.subtitle}
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {renderFormFields()}

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        {success && (
          <div className="mb-4 text-green-500 text-sm text-center">
            {success}
          </div>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? config.loadingText : config.submitText} &rarr;
          <BottomGradient />
        </button>
      </form>

      {renderLinks()}

      <div className="mt-6 text-center text-xs text-neutral-500">
        <p>
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
