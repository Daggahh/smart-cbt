"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartCBTLogo } from "@/components/smart-cbt-logo";
import { authAPI, adminAPI } from "@/lib/api";
import { LogOut, Settings, ArrowLeft, User, Shield } from "lucide-react";
import { toast } from "sonner";
import { formatRole } from "@/lib/admin-utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function AdminSettingsPage() {
  return <AdminSettingsContent />;
}

function AdminSettingsContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [admins, setAdmins] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // adminId for which action is loading

  const fetchAdmins = () => {
    adminAPI.getAdmins?.().then((res) => {
      if (res?.success && res.data) {
        const adminsArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray((res.data as any).data)
          ? (res.data as any).data
          : [];
        setAdmins(adminsArray);
      } else {
        setAdmins([]);
      }
    });
  };

  useEffect(() => {
    // Fetch current user
    authAPI.getCurrentUser().then((res) => {
      if (res.success && res.data) {
        const userData = (res.data as any).data
          ? (res.data as any).data
          : res.data;
        setUser(userData);
      }
    });
    // Fetch all admins if super_admin
    fetchAdmins();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    const res = await authAPI.logout();
    setLoading(false);
    if (res.success) {
      router.push("/auth/admin/login");
    } else {
      setError(res.error || "Logout failed");
    }
  };

  const handleRevoke = async (adminId: string) => {
    setActionLoading(adminId);
    const res = await adminAPI.revokeAdmin(adminId);
    setActionLoading(null);
    if (res.success) {
      toast.success("Admin rights revoked successfully.");
      fetchAdmins();
    } else {
      toast.error(res.error || "Failed to revoke admin rights.");
    }
  };

  const handlePromote = async (adminId: string) => {
    setActionLoading(adminId);
    const res = await adminAPI.promoteAdmin(adminId);
    setActionLoading(null);
    if (res.success) {
      toast.success("Admin promoted to super admin successfully.");
      fetchAdmins();
    } else {
      toast.error(res.error || "Failed to promote admin.");
    }
  };

  const handleDemote = async (adminId: string) => {
    setActionLoading(adminId);
    const res = await adminAPI.demoteAdmin(adminId);
    setActionLoading(null);
    if (res.success) {
      toast.success("Admin demoted to admin successfully.");
      fetchAdmins();
    } else {
      toast.error(res.error || "Failed to demote admin.");
    }
  };

  // Filter out the current user from the admins list
  const filteredAdmins = user
    ? admins.filter((admin) => admin.id !== user.id)
    : admins;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex flex-col px-4 py-8">
      {/* Back to Dashboard */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin")}
          className="text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <Card className="dark:bg-black dark:border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-white">
              <Settings className="w-5 h-5" />
              <span>Account Settings</span>
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-gray-400">
              Manage your admin account and platform permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {user && (
              <div className="flex items-center space-x-4">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-bold text-lg text-slate-800 dark:text-white">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-gray-400">
                    {user.email}
                  </div>
                  <div className="text-xs mt-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 inline-block">
                    Role:{" "}
                    <span className="font-semibold">
                      {formatRole(user.role)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
              disabled={loading}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {loading ? "Logging out..." : "Logout"}
            </Button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </CardContent>
        </Card>
        {/* Super Admin Controls */}
        {user?.role === "super_admin" && (
          <TooltipProvider>
            <Card className="dark:bg-black dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-white">
                  <Shield className="w-5 h-5" />
                  <span>Admin Management</span>
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400">
                  View and manage all platform admins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredAdmins.length === 0 ? (
                  <div className="text-slate-600 dark:text-gray-400">
                    No other admins found.
                  </div>
                ) : (
                  filteredAdmins.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 py-2"
                    >
                      <div>
                        <div className="font-medium text-slate-800 dark:text-white">
                          {admin.firstName} {admin.lastName}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-gray-400">
                          {admin.email}
                        </div>
                        <div className="text-xs mt-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 inline-block">
                          Role:{" "}
                          <span className="font-semibold">
                            {formatRole(admin.role)}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {admin.role === "admin" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePromote(admin.id)}
                                disabled={actionLoading === admin.id}
                              >
                                {actionLoading === admin.id
                                  ? "Promoting..."
                                  : "Promote to SA"}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Promote this admin to Super Admin (full platform
                              access)
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {admin.role === "super_admin" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDemote(admin.id)}
                                disabled={actionLoading === admin.id}
                              >
                                {actionLoading === admin.id
                                  ? "Demoting..."
                                  : "Demote"}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Demote this Super Admin to Admin (removes full
                              platform access)
                            </TooltipContent>
                          </Tooltip>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRevoke(admin.id)}
                              disabled={actionLoading === admin.id}
                            >
                              {actionLoading === admin.id
                                ? "Revoking..."
                                : "Revoke"}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Revoke all admin rights (user becomes a student)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
