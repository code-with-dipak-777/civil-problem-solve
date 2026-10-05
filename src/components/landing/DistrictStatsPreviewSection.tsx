"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DistrictStat {
  name: string;
  pending: number;
  resolved: number;
  rate: number;
}

export function DistrictStatsPreviewSection() {
  const [districts, setDistricts] = useState<DistrictStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats/district')
      .then(res => res.json())
      .then(data => {
        const stats = Array.isArray(data) ? data : data.data || [];
        const mapped = stats.slice(0, 4).map((d: any) => ({
          name: d.district,
          pending: d.pending || 0,
          resolved: d.resolved || 0,
          rate: d.total > 0 ? Math.round((d.resolved / d.total) * 100) : 0,
        }));
        setDistricts(mapped);
        setLoading(false);
      })
      .catch(() => {
        setDistricts([]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#03111F] border-t border-white/5">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">See What's Happening in Every District.</h2>
            <p className="text-lg text-white/60">Transparency is key to accountability. View real-time issue statistics and resolution performance across all state districts.</p>
          </div>
          <Link href="/district-stats">
            <Button variant="outline" className="h-12 px-6 border-white/20 hover:bg-white/5 text-white rounded-full">
              Explore District Stats <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
          </div>
        ) : districts.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p>No district data available yet. Reports will appear here once issues are submitted.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {districts.map((district, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">{district.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-400"/> Pending</span>
                    <span className="text-white font-bold">{district.pending}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Resolved</span>
                    <span className="text-white font-bold">{district.resolved}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white/50">Resolution Rate</span>
                    <span className="text-emerald-400 font-bold">{district.rate}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${district.rate}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
