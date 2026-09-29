"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function CivicMapPreviewSection() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5 bg-[#03111F]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          <div className="lg:col-span-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Your Neighborhood.<br/>At a Glance.</h2>
            <p className="text-lg text-white/60 mb-8">
              Explore issues around you, see what's being fixed, and understand what is happening nearby.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {['All Issues', 'Potholes', 'Garbage', 'Streetlights', 'Water'].map((filter, i) => (
                <div key={i} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0 ? 'bg-emerald-500 text-[#03111F]' : 'bg-white/5 text-white/60 border border-white/10'
                }`}>
                  {filter}
                </div>
              ))}
            </div>

            <Link href="/map">
              <Button size="lg" className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-full backdrop-blur-sm w-full md:w-auto">
                Explore Full Map
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-2 relative h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 glass-card">
            <div className="absolute inset-0 bg-[#081F2F]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" 
                alt="Map Background" 
                className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
              />
            </div>

            {/* Map Markers */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-[30%] left-[40%] flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)] border-2 border-[#03111F]">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute top-[50%] left-[20%] flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-[#03111F]">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 1 }} className="absolute top-[60%] right-[30%] flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)] border-2 border-[#03111F]">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            
            {/* Map UI Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#03111F]/80 backdrop-blur-md rounded-2xl border border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Streetlight Issue</h4>
                  <p className="text-xs text-white/50">Ward 10 • Reported 2h ago</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-white/10 text-white rounded-full">
                View Details
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
