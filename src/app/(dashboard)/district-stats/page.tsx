"use client";

import { BarChart3, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { IssueTypeDistribution, TopDistrictsChart } from "@/components/dashboard/Charts";
import { IssuesByDistrictList } from "@/components/dashboard/IssuesByDistrictList";

export default function DistrictStatsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-primary" />
            District-wise Statistics
          </h1>
          <p className="text-muted-foreground">Comprehensive overview of civic issues across all districts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-3xl border border-white/5">
          <p className="text-sm font-medium text-muted-foreground mb-2">Overall Resolution Rate</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-emerald-400">58.3%</h3>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded mb-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +5%
            </span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/5">
          <p className="text-sm font-medium text-muted-foreground mb-2">Average Resolution Time</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-blue-400">2.4 Days</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/5">
          <p className="text-sm font-medium text-muted-foreground mb-2">Most Active District</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-purple-400">Ranchi</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/5">
          <p className="text-sm font-medium text-muted-foreground mb-2">Critical Open Issues</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-red-400">3</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="h-[400px]">
          <IssueTypeDistribution />
        </div>
        <div className="h-[400px]">
          <TopDistrictsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6">
        <IssuesByDistrictList />
      </div>
    </div>
  );
}
