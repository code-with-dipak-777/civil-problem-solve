"use client";

import { useState } from "react";
import { MapPin, Locate, Plus, Minus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const mapMarkers = [
  { id: 1, type: "pothole", x: 20, y: 30, color: "bg-red-500", cluster: 3 },
  { id: 2, type: "garbage", x: 45, y: 60, color: "bg-emerald-500", cluster: 0 },
  { id: 3, type: "streetlight", x: 70, y: 25, color: "bg-orange-500", cluster: 0 },
  { id: 4, type: "water", x: 80, y: 80, color: "bg-blue-500", cluster: 0 },
  { id: 5, type: "pothole", x: 30, y: 70, color: "bg-red-500", cluster: 0 },
  { id: 6, type: "garbage", x: 60, y: 40, color: "bg-emerald-500", cluster: 2 },
];

export function IssuesMap() {
  const [district, setDistrict] = useState("all");

  return (
    <div className="glass-card rounded-3xl overflow-hidden flex flex-col h-[400px] border border-white/5">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-card/50">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-white">Issues Around You</h3>
        </div>
        <div className="w-32">
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="h-8 bg-white/5 border-none text-xs">
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              <SelectItem value="ranchi">Ranchi</SelectItem>
              <SelectItem value="dhanbad">Dhanbad</SelectItem>
              <SelectItem value="east-singhbhum">East Singhbhum</SelectItem>
              <SelectItem value="bokaro">Bokaro</SelectItem>
              <SelectItem value="hazaribagh">Hazaribagh</SelectItem>
              <SelectItem value="deoghar">Deoghar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-900 overflow-hidden group">
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
        
        {/* Mock Map grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Fake street lines */}
        <div className="absolute top-1/3 left-0 right-0 h-1.5 bg-white/10 rotate-12 origin-left"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-white/10 -rotate-12 origin-top"></div>
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-white/10 -rotate-6 origin-right"></div>
        
        {/* City/Area Labels */}
        <span className="absolute top-1/4 left-1/4 text-white/30 font-bold text-xl uppercase tracking-widest">Domjuri</span>
        <span className="absolute bottom-1/4 right-1/4 text-white/20 font-bold text-lg uppercase tracking-widest">East Singhbhum</span>
        
        {/* Markers */}
        {mapMarkers.map((marker) => (
          <div 
            key={marker.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 z-10"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          >
            {marker.cluster > 0 ? (
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 border border-blue-400 text-white shadow-lg backdrop-blur-sm">
                <span className="font-bold">{marker.cluster}</span>
                <span className="absolute flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>
              </div>
            ) : (
              <div className="relative group/tooltip">
                <div className="absolute -top-12 -left-16 w-32 bg-popover text-popover-foreground text-xs p-2 rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 border border-white/10">
                  <p className="font-semibold text-white capitalize">{marker.type}</p>
                  <p className="text-muted-foreground truncate">Location details...</p>
                  <p className="text-primary mt-1">Status: Pending</p>
                </div>
                <MapPin className={`h-8 w-8 ${marker.color.replace('bg-', 'text-')} drop-shadow-md`} />
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-4 bg-black/40 blur-[2px] rounded-[100%] -z-10`}></div>
              </div>
            )}
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <div className="glass-card flex flex-col rounded-xl overflow-hidden shadow-lg border border-white/10">
            <button className="p-2 hover:bg-white/10 transition-colors border-b border-white/10">
              <Plus className="h-4 w-4 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 transition-colors">
              <Minus className="h-4 w-4 text-white" />
            </button>
          </div>
          <button className="glass-card p-2 rounded-xl shadow-lg hover:bg-white/10 transition-colors border border-white/10 mt-2 text-primary">
            <Locate className="h-4 w-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass-card p-2 rounded-xl flex items-center gap-3 text-[10px] border border-white/10">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div><span className="text-white/80">Pothole</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div><span className="text-white/80">Garbage</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]"></div><span className="text-white/80">Streetlight</span></div>
        </div>
        
        <div className="absolute bottom-2 right-2 opacity-50">
          <span className="text-[9px] text-white/50 font-mono">MockMap™</span>
        </div>
      </div>
    </div>
  );
}
