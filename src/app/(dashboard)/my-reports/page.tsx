"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, Eye, MapPin, Calendar, Clock, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardStore } from "@/store";
import { useEffect } from "react";

const filters = ["All", "Pending", "In Progress", "Resolved", "Rejected"];

export default function MyReportsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { issues, fetchIssues } = useDashboardStore();

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Resolved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const filteredIssues = issues.filter(issue => 
    activeFilter === "All" || issue.status === activeFilter
  );

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Reports</h1>
          <p className="text-muted-foreground">Track and manage all the civic issues you've reported.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reports..." 
              className="pl-9 bg-white/5 border-white/10 rounded-xl"
            />
          </div>
          <Button variant="outline" className="bg-white/5 border-white/10 rounded-xl shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-4 gap-2 scrollbar-none">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter 
                ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.map((issue, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={issue.id}
            className="glass-card rounded-3xl overflow-hidden border border-white/5 group hover:border-white/10 transition-colors flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={issue.photoUrl} 
                alt={issue.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className={`font-bold uppercase tracking-wider backdrop-blur-md ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </Badge>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-xs text-primary font-medium mb-1">{issue.complaintId}</div>
                  <h3 className="font-bold text-lg text-white leading-tight">{issue.title}</h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-muted-foreground hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="space-y-2 mt-4 mb-6">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-white/50 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{issue.location}, {issue.district}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-white/50 shrink-0" />
                  <span>{issue.reportedOn}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-white/50 shrink-0" />
                  <span>{issue.votes} people support this</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5">
                <Link href={`/reports/${issue.id}`} className="w-full">
                  <Button variant="ghost" className="w-full justify-between hover:bg-white/5 hover:text-primary">
                    View Details
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredIssues.length === 0 && (
          <div className="col-span-full py-20 text-center glass-card rounded-3xl border border-white/5 border-dashed">
            <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No reports found</h3>
            <p className="text-muted-foreground mb-6">You don't have any {activeFilter.toLowerCase()} reports.</p>
            {activeFilter !== "All" && (
              <Button onClick={() => setActiveFilter("All")} variant="outline" className="border-white/10">
                View All Reports
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
