"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { ChevronRight, CalendarIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    dateOfBirth: undefined as Date | undefined,
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

  const handleDateChange = (date: Date | undefined) => {
    setFormData({
      ...formData,
      dateOfBirth: date,
    });
  };

  const validateForm = () => {
    if (formType === "signup" || formType === "reset-password") {
      if (formData.password !== formData.confirmPassword) {
        const errorMessage = "Passwords do not match";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
      if (formData.password.length < 8) {
        const errorMessage = "Password must be at least 8 characters long";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    }
    if (formType === "signup") {
      if (!formData.email || !formData.firstName || !formData.lastName) {
        const errorMessage = "Please fill in all required fields";
        setError(errorMessage);
        toast.error(errorMessage);
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
      // Convert date to ISO string for API
      const submitData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth
          ? formData.dateOfBirth.toISOString()
          : undefined,
      };

      switch (formType) {
        case "login":
          toast.loading("Signing in...");
          await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: true,
            callbackUrl: "/student",
          });
          break;
        case "signup":
          const { confirmPassword, ...signupData } = submitData;
          console.log("Sending signup request with data:", signupData);
          toast.loading("Creating your account...");
          response = await authAPI.signup(signupData);
          console.log("Signup response:", response);
          toast.dismiss();

          if (response.success) {
            const successMessage =
              "Account created successfully! Please check your email to verify your account.";
            setSuccess(successMessage);
            toast.success(successMessage, {
              duration: 5000,
              description: "You'll be redirected to login in 3 seconds",
            });
            setTimeout(() => {
              router.push("/auth/student/login");
            }, 3000);
          } else {
            const errorMessage = response.error || "Signup failed";
            setError(errorMessage);
            toast.error(errorMessage, {
              duration: 4000,
            });
          }
          break;
        case "forgot-password":
          toast.loading("Sending reset instructions...");
          response = await authAPI.forgotPassword({ email: formData.email });
          toast.dismiss();

          if (response.success) {
            const successMessage =
              "Password reset instructions have been sent to your email address.";
            setSuccess(successMessage);
            toast.success(successMessage);
            setFormData({ ...formData, email: "" });
          } else {
            const errorMessage = response.error || "Failed to send reset email";
            setError(errorMessage);
            toast.error(errorMessage);
          }
          break;
        case "reset-password":
          const token = searchParams.get("token");
          if (!token) {
            const errorMessage = "Invalid or missing reset token";
            setError(errorMessage);
            toast.error(errorMessage);
            break;
          }
          toast.loading("Resetting your password...");
          response = await authAPI.resetPassword({
            token,
            password: formData.password,
          });
          toast.dismiss();

          if (response.success) {
            const successMessage =
              "Password reset successfully! Redirecting to login...";
            setSuccess(successMessage);
            toast.success(successMessage);
            setTimeout(() => {
              router.push("/auth/student/login");
            }, 2000);
          } else {
            const errorMessage = response.error || "Failed to reset password";
            setError(errorMessage);
            toast.error(errorMessage);
          }
          break;
        case "verify-email":
          const verifyToken = searchParams.get("token");
          if (!verifyToken) {
            const errorMessage = "Invalid or missing verification token";
            setError(errorMessage);
            toast.error(errorMessage);
            break;
          }
          toast.loading("Verifying your email...");
          response = await authAPI.verifyEmail({ token: verifyToken });
          toast.dismiss();

          if (response.success) {
            const successMessage =
              "Email verified successfully! You can now log in to your account.";
            setSuccess(successMessage);
            toast.success(successMessage);
          } else {
            const errorMessage = response.error || "Failed to verify email";
            setError(errorMessage);
            toast.error(errorMessage);
          }
          break;
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage = "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !formData.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    {formData.dateOfBirth ? (
                      format(formData.dateOfBirth, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => handleDateChange(date)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Need to verify your email?{" "}
              <button
                type="button"
                onClick={async () => {
                  if (!formData.email) {
                    toast.error("Please enter your email first");
                    return;
                  }
                  toast.loading("Sending verification email...");
                  const response = await authAPI.resendVerification(
                    formData.email
                  );
                  toast.dismiss();
                  if (response.success) {
                    toast.success("Verification email sent! Check your inbox.");
                  } else {
                    toast.error(
                      response.error || "Failed to send verification email"
                    );
                  }
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Resend verification
              </button>
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
    <div
      className={cn(
        "shadow-input mx-auto w-full max-w-md rounded-lg bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black",
        formType === "signup" && "mt-20 mb-12 md:my-20"
      )}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-neutral-900 dark:text-neutral-100 drop-shadow-sm mb-2">
        {config.title}
      </h2>
      <p className="mt-2 max-w-sm mx-auto text-base text-center text-neutral-600 dark:text-neutral-300 mb-4">
        {config.subtitle}
      </p>

      {formType === "signup" && process.env.NODE_ENV === "development" && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Development Mode:</strong> Verification emails are logged to
            the console instead of being sent. Check the server logs for the
            email content.
          </p>
        </div>
      )}

      {formType === "forgot-password" &&
        process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Development Mode:</strong> Password reset emails are
              logged to the console instead of being sent. Check the server logs
              for the reset link.
            </p>
          </div>
        )}

      <form className="my-8" onSubmit={handleSubmit}>
        {renderFormFields()}

        <button
          className="group/btn relative h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          <span className="flex items-center gap-2">
            {loading ? config.loadingText : config.submitText}
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </span>
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
