// Centralized API management for Smart CBT
// All API calls should go through this file for better maintainability

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface LoginRequest {
  email: string;
  password: string;
  role: "student" | "admin";
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  registrationNumber?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || "An error occurred",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("API call error:", error);
    return {
      success: false,
      error: "Network error occurred",
    };
  }
}

// Authentication API functions
export const authAPI = {
  // Login
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return apiCall<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // Student signup
  async signup(
    userData: SignupRequest
  ): Promise<ApiResponse<{ message: string }>> {
    return apiCall<{ message: string }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Forgot password
  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<ApiResponse<{ message: string }>> {
    return apiCall<{ message: string }>("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Reset password
  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<ApiResponse<{ message: string }>> {
    return apiCall<{ message: string }>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Verify email
  async verifyEmail(
    data: VerifyEmailRequest
  ): Promise<ApiResponse<{ message: string }>> {
    return apiCall<{ message: string }>("/api/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Resend verification email
  async resendVerification(
    email: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiCall<{ message: string }>("/api/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Logout
  async logout(): Promise<ApiResponse<{ message: string }>> {
    return apiCall<{ message: string }>("/api/auth/logout", {
      method: "POST",
    });
  },

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<AuthResponse["user"]>> {
    return apiCall<AuthResponse["user"]>("/api/auth/me", {
      method: "GET",
    });
  },
};

// Student-specific API functions
export const studentAPI = {
  // Get student dashboard data
  async getDashboard(): Promise<ApiResponse<any>> {
    return apiCall("/api/student/dashboard", {
      method: "GET",
    });
  },

  // Get available exams
  async getAvailableExams(): Promise<ApiResponse<any>> {
    return apiCall("/api/student/exams", {
      method: "GET",
    });
  },

  // Get exam results
  async getResults(): Promise<ApiResponse<any>> {
    return apiCall("/api/student/results", {
      method: "GET",
    });
  },
};

// Admin-specific API functions
export const adminAPI = {
  // Get admin dashboard data (key metrics)
  async getDashboard(): Promise<ApiResponse<any>> {
    return apiCall("/api/admin/dashboard", {
      method: "GET",
    });
  },

  // Get all students
  async getStudents(): Promise<ApiResponse<any>> {
    return apiCall("/api/admin/students", {
      method: "GET",
    });
  },

  // Get all exams
  async getExams(): Promise<ApiResponse<any>> {
    return apiCall("/api/admin/exams", {
      method: "GET",
    });
  },

  // Get all admins (super_admin only)
  async getAdmins(): Promise<ApiResponse<any>> {
    return apiCall("/api/admin/admins", {
      method: "GET",
    });
  },

  // Revoke admin rights (super_admin only)
  async revokeAdmin(adminId: string): Promise<ApiResponse<any>> {
    return apiCall(`/api/admin/admins/${adminId}/revoke`, {
      method: "POST",
    });
  },

  // Promote admin to super_admin (super_admin only)
  async promoteAdmin(adminId: string): Promise<ApiResponse<any>> {
    return apiCall(`/api/admin/admins/${adminId}/promote`, {
      method: "POST",
    });
  },

  // Demote super_admin to admin (super_admin only)
  async demoteAdmin(adminId: string): Promise<ApiResponse<any>> {
    return apiCall(`/api/admin/admins/${adminId}/demote`, {
      method: "POST",
    });
  },
};

// Utility function to set auth token in cookies
export function setAuthToken(token: string) {
  document.cookie = `auth-token=${token}; path=/; max-age=${
    60 * 60 * 24 * 7
  }; SameSite=Strict`;
}

// Utility function to get auth token from cookies
export function getAuthToken(): string | null {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("auth-token=")
  );
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}

// Utility function to remove auth token
export function removeAuthToken() {
  document.cookie =
    "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
