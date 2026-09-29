"use client";

import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { DashboardStats } from "@/types";

const mockStats: DashboardStats = {
  totalIssues: 12,
  newToday: 2,
  pending: 5,
  pendingPercentage: 41.7,
  resolved: 7,
  resolvedPercentage: 58.3,
  userReports: 4,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function StatCards() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {/* Total Issues */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/20 p-5 group hover:border-blue-500/40 transition-colors">
        <div className="absolute -right-6 -top-6 bg-blue-500/10 p-8 rounded-full group-hover:scale-110 transition-transform duration-500" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-blue-200/70 mb-1">Total Issues</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{mockStats.totalIssues}</h3>
            <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="h-3 w-3 mr-1" /> {mockStats.newToday} new today
            </span>
          </div>
        </div>
      </motion.div>

      {/* Pending */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-900/20 border border-orange-500/20 p-5 group hover:border-orange-500/40 transition-colors">
        <div className="absolute -right-6 -top-6 bg-orange-500/10 p-8 rounded-full group-hover:scale-110 transition-transform duration-500" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="bg-orange-500/20 p-2.5 rounded-xl text-orange-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-orange-200/70 mb-1">Pending</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{mockStats.pending}</h3>
            <span className="text-sm font-medium text-orange-200/70">{mockStats.pendingPercentage}%</span>
          </div>
        </div>
      </motion.div>

      {/* Resolved */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 border border-emerald-500/20 p-5 group hover:border-emerald-500/40 transition-colors subtle-glow">
        <div className="absolute -right-6 -top-6 bg-emerald-500/10 p-8 rounded-full group-hover:scale-110 transition-transform duration-500" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="bg-emerald-500/20 p-2.5 rounded-xl text-emerald-400">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-emerald-200/70 mb-1">Resolved</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{mockStats.resolved}</h3>
            <span className="text-sm font-medium text-emerald-200/70">{mockStats.resolvedPercentage}%</span>
          </div>
        </div>
      </motion.div>

      {/* Your Reports */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/20 p-5 group hover:border-purple-500/40 transition-colors">
        <div className="absolute -right-6 -top-6 bg-purple-500/10 p-8 rounded-full group-hover:scale-110 transition-transform duration-500" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="bg-purple-500/20 p-2.5 rounded-xl text-purple-400">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        <div className="relative z-10 flex flex-col h-full justify-end">
          <p className="text-sm font-medium text-purple-200/70 mb-1">Your Reports</p>
          <div className="flex items-end justify-between w-full">
            <h3 className="text-3xl font-bold text-white">{mockStats.userReports}</h3>
            <Link href="/my-reports" className="flex items-center text-xs font-medium text-purple-300 hover:text-white transition-colors">
              View all <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
