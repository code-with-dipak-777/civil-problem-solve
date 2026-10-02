"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function IssuesByDistrictList() {
  const [districtStats, setDistrictStats] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats/district')
      .then(res => res.json())
      .then(data => setDistrictStats(Array.isArray(data) ? data : data.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="glass-card rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-white/5 flex items-center justify-between bg-card/50">
        <h3 className="font-semibold text-white">Issues by District</h3>
        <Link href="/district-stats" className="text-xs font-medium text-primary hover:text-primary/80 flex items-center transition-colors">
          View all <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
      
      <div className="p-2 overflow-y-auto flex-1">
        {districtStats.map((district, index) => {
          const resolvedPercent = district.total > 0 ? (district.resolved / district.total) * 100 : 0;
          const pendingPercent = district.total > 0 ? (district.pending / district.total) * 100 : 0;
          
          return (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={district.district} 
              className="p-3 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-white/5 mb-1"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{district.district}</h4>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0" />
              </div>
              
              <div className="flex justify-between items-end mb-2">
                <div className="space-y-0.5">
                  <p className="text-xs text-orange-400 font-medium">{district.pending} pending</p>
                  <p className="text-xs text-emerald-400 font-medium">{district.resolved} resolved</p>
                </div>
                <div className="text-xs text-muted-foreground font-medium bg-white/5 px-2 py-1 rounded-md">
                  {district.total} total
                </div>
              </div>
              
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${resolvedPercent}%` }}
                  transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${pendingPercent}%` }}
                  transition={{ duration: 1, delay: 0.4 + (index * 0.1) }}
                  className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
