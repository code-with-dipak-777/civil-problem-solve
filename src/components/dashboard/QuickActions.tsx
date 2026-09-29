"use client";

import { FilePlus, Map as MapIcon, BarChart3, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Report New Issue",
    description: "Add photo & location",
    icon: FilePlus,
    href: "/report-issue",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40"
  },
  {
    title: "View Map",
    description: "Explore all issues",
    icon: MapIcon,
    href: "/map",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40"
  },
  {
    title: "District-wise Stats",
    description: "Check district performance",
    icon: BarChart3,
    href: "/district-stats",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20 hover:border-purple-500/40"
  },
  {
    title: "My Reports",
    description: "Track your submissions",
    icon: FileText,
    href: "/my-reports",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20 hover:border-orange-500/40"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export function QuickActions() {
  return (
    <div className="glass-card rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-white/5 flex items-center bg-card/50">
        <h3 className="font-semibold text-white">Quick Actions</h3>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="p-4 grid grid-cols-1 gap-3 flex-1"
      >
        {actions.map((action, i) => (
          <Link key={i} href={action.href} className="block">
            <motion.div variants={item} className={`flex items-center gap-4 p-3 rounded-2xl border bg-card/50 transition-all duration-300 group ${action.border} hover:bg-white/5`}>
              <div className={`p-3 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{action.title}</h4>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-white transition-all transform group-hover:translate-x-1" />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
