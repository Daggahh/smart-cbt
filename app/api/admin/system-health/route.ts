import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { Pool } from "pg";

// Database connection for health checks
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userRole = (session.user as any)?.role;
    if (userRole !== "admin" && userRole !== "super_admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Database performance check
    let databasePerformance = 100;
    let activeConnections = 0;
    try {
      const startTime = Date.now();
      const client = await pool.connect();
      await client.query("SELECT 1");
      const queryTime = Date.now() - startTime;

      // Calculate performance based on query time (lower is better)
      databasePerformance = Math.max(70, 100 - Math.floor(queryTime / 10));

      // Get active connections (simplified - in real world you'd query pg_stat_activity)
      const connectionsResult = await client.query(
        "SELECT count(*) FROM pg_stat_activity WHERE state = 'active'"
      );
      activeConnections = parseInt(connectionsResult.rows[0].count) || 0;

      client.release();
    } catch (error) {
      databasePerformance = 0;
      activeConnections = 0;
    }

    // Server load (simplified - in production you'd use os.cpuUsage() or similar)
    const serverLoad = Math.floor(Math.random() * 20) + 15; // 15-35% for demo

    // Network latency (simplified - in production you'd measure actual API response times)
    const networkLatency = Math.floor(Math.random() * 15) + 8; // 8-23ms for demo

    return NextResponse.json({
      success: true,
      data: {
        serverLoad,
        databasePerformance,
        networkLatency,
        activeConnections,
      },
    });
  } catch (error) {
    console.error("System health error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
