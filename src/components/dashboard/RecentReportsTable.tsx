"use client";

import { useDashboardStore } from "@/store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { mockIssues } from "@/data/mock-data";

export function RecentReportsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Resolved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="glass-card rounded-3xl border border-white/5 overflow-hidden flex flex-col">
      <div className="p-5 border-b border-white/5 flex items-center justify-between bg-card/50">
        <h3 className="font-semibold text-white">Recent Reports</h3>
        <Link href="/my-reports" className="text-xs font-medium text-primary hover:text-primary/80 flex items-center transition-colors">
          View all <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="w-[80px] text-xs font-medium text-muted-foreground h-10">Photo</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground h-10">Issue</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground h-10 hidden sm:table-cell">Location</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground h-10 hidden md:table-cell">District</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground h-10">Status</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground h-10 hidden lg:table-cell text-right">Reported On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIssues.slice(0, 5).map((issue) => (
              <TableRow key={issue.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                <TableCell>
                  <div className="h-10 w-12 rounded-lg overflow-hidden border border-white/10 relative">
                    <img src={issue.photoUrl} alt={issue.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-white text-sm line-clamp-1">{issue.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 sm:hidden line-clamp-1">{issue.location}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-xs text-muted-foreground max-w-[200px] truncate">
                  {issue.location}
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                  {issue.district}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider rounded-md py-0 h-6 ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-right text-xs text-muted-foreground whitespace-nowrap">
                  {issue.reportedOn}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
