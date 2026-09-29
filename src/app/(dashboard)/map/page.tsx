"use client";

import { IssuesMap } from "@/components/dashboard/IssuesMap";

export default function MapViewPage() {
  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">City Issues Map</h1>
        <p className="text-muted-foreground">Explore civic issues reported across the city in real-time.</p>
      </div>
      
      <div className="flex-1 rounded-3xl overflow-hidden glass-card border border-white/5 shadow-xl relative">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <IssuesMap />
        </div>
      </div>
    </div>
  );
}
