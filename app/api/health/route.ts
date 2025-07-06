import { NextResponse } from "next/server";
import { Pool } from "pg";
import { getSystemUptime } from "@/lib/admin-utils";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    // Check database connectivity
    let dbStatus = "operational";
    try {
      const client = await pool.connect();
      await client.query("SELECT 1");
      client.release();
    } catch (error) {
      dbStatus = "outage";
    }

    // Check environment variables
    const envStatus = {
      database: !!process.env.DATABASE_URL,
      jwt: !!process.env.JWT_SECRET,
      resend: !!process.env.RESEND_API_KEY,
      nextauth: !!process.env.NEXTAUTH_SECRET,
    };

    const overallStatus =
      dbStatus === "operational" ? "operational" : "degraded";
    const isDevelopment = process.env.NODE_ENV === "development";

    return NextResponse.json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      environment: isDevelopment ? "development" : "production",
      services: {
        database: dbStatus,
        api: "operational",
        auth: "operational",
        email: isDevelopment
          ? "development"
          : envStatus.resend
          ? "operational"
          : "degraded",
        ai: isDevelopment ? "development" : "planned",
        storage: isDevelopment ? "development" : "planned",
      },
      environment_config: {
        node_env: process.env.NODE_ENV || "development",
        database_configured: envStatus.database,
        jwt_configured: envStatus.jwt,
        email_configured: envStatus.resend,
        auth_configured: envStatus.nextauth,
      },
      version: "0.1.0",
      uptime: getSystemUptime(),
      message: isDevelopment
        ? "Smart CBT is running in development mode"
        : "Smart CBT is operational",
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        status: "outage",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
        environment: process.env.NODE_ENV || "development",
      },
      { status: 500 }
    );
  }
}
