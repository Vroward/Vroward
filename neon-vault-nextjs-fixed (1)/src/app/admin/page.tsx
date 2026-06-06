"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, ShoppingCart, Ticket, Activity, Shield } from "lucide-react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user as any;

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
    if (status === "authenticated" && user?.role !== "ADMIN") router.push("/client");
  }, [status, router, user]);

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-nv-pink border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session || user?.role !== "ADMIN") return null;

  return (
    <div className="min-h-[80vh] px-6 py-8 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-6 h-6 text-nv-warning" />
        <h1 className="font-display text-3xl font-extrabold gradient-text">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Users className="w-5 h-5" />, title: "Total Users", value: "1,247", color: "nv-pink" },
          { icon: <ShoppingCart className="w-5 h-5" />, title: "Orders Today", value: "43", color: "nv-purple" },
          { icon: <Ticket className="w-5 h-5" />, title: "Open Tickets", value: "7", color: "nv-warning" },
          { icon: <Activity className="w-5 h-5" />, title: "Active Licenses", value: "892", color: "nv-success" },
        ].map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-nv-card border border-nv-border rounded-2xl p-5 hover:border-nv-pink/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-nv-text-muted uppercase tracking-wider">{card.title}</span>
              <span className={`text-${card.color}`}>{card.icon}</span>
            </div>
            <div className="font-display text-2xl font-bold">{card.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-nv-card border border-nv-border rounded-2xl p-6">
        <h3 className="font-display text-lg font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="p-4 bg-nv-darker border border-nv-border rounded-xl hover:border-nv-pink/30 transition-all text-left">
            <div className="font-semibold text-sm mb-1">Manage Orders</div>
            <div className="text-xs text-nv-text-muted">View and edit all customer orders</div>
          </button>
          <button className="p-4 bg-nv-darker border border-nv-border rounded-xl hover:border-nv-pink/30 transition-all text-left">
            <div className="font-semibold text-sm mb-1">Support Tickets</div>
            <div className="text-xs text-nv-text-muted">Reply to open customer tickets</div>
          </button>
          <button className="p-4 bg-nv-darker border border-nv-border rounded-xl hover:border-nv-pink/30 transition-all text-left">
            <div className="font-semibold text-sm mb-1">User Management</div>
            <div className="text-xs text-nv-text-muted">Ban, promote, or edit users</div>
          </button>
        </div>
      </div>
    </div>
  );
}