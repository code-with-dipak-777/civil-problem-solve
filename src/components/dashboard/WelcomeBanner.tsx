"use client";

import { useDashboardStore } from "@/store";
import { Cloud, MapPin, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function WelcomeBanner() {
  const { currentUser } = useDashboardStore();
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Guest';

  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card to-card/50 border border-white/5 shadow-lg mb-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      
      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            {greeting}, {firstName} <span className="inline-block animate-wave">👋</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's what's happening in your community today.
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-4 min-w-[200px]">
          <div className="bg-white/10 p-3 rounded-full">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{currentUser?.district || 'Your District'}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{currentUser?.city || 'India'}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
