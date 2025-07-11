// Admin utility functions for Smart CBT dashboard

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    case "scheduled":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
  }
};

export const getHealthColor = (value: number, type: string) => {
  if (type === "latency") {
    return value < 15
      ? "text-green-600 dark:text-green-400"
      : value < 30
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-red-600 dark:text-red-400";
  }
  if (type === "performance") {
    return value > 90
      ? "text-green-600 dark:text-green-400"
      : value > 70
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-red-600 dark:text-red-400";
  }
  return "text-slate-600 dark:text-gray-400";
};

export const generateMockExams = () => [
  {
    id: 1,
    title: "JAMB UTME 2024 - Batch A",
    candidates: 450,
    status: "active",
    completion: 78,
    startTime: "09:00 AM",
    endTime: "12:00 PM",
  },
  {
    id: 2,
    title: "WAEC Mathematics Mock",
    candidates: 125,
    status: "completed",
    completion: 100,
    startTime: "02:00 PM",
    endTime: "04:00 PM",
  },
  {
    id: 3,
    title: "University Entrance - Science",
    candidates: 87,
    status: "scheduled",
    completion: 0,
    startTime: "10:00 AM",
    endTime: "01:00 PM",
  },
];

// Uptime calculation utility
export function calculateUptime(startTimeInput?: string | Date): number {
  let startTime: Date;
  if (startTimeInput instanceof Date) {
    startTime = startTimeInput;
  } else if (typeof startTimeInput === "string") {
    startTime = new Date(startTimeInput);
  } else if (typeof process !== "undefined" && process.env.SYSTEM_START_TIME) {
    startTime = new Date(process.env.SYSTEM_START_TIME);
  } else {
    // Fallback: use server start time (now)
    startTime = new Date();
  }
  const now = new Date();
  const diffInMs = now.getTime() - startTime.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const totalHours = 30 * 24; // 30 days
  const uptimePercentage = Math.max(0, 100 - (diffInHours / totalHours) * 100);
  // Ensure it doesn't go below 99.5% for demo/demo purposes
  return Math.max(99.5, uptimePercentage);
}

// Server-side utility to get system uptime from env
export function getSystemUptime(): number {
  return calculateUptime(process.env.SYSTEM_START_TIME);
}

// System health fetch utility
export async function getSystemHealthStatus(): Promise<any> {
  try {
    const res = await fetch("/api/health", { method: "GET" });
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (e) {
    return {
      status: "outage",
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

// Utility to format role slugs to human-readable form
export function formatRole(role: string): string {
  if (!role) return "";
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
