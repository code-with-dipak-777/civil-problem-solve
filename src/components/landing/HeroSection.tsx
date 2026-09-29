"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Camera, MapPin, Brain, Activity, ArrowRight, Play, CloudRain, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const floatingCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax floating effect for the phone
    gsap.to(phoneRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Subtly float the surrounding cards in opposite directions
    if (floatingCardsRef.current) {
      const cards = floatingCardsRef.current.children;
      gsap.to(cards[0], { y: 15, x: -10, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0 });
      gsap.to(cards[1], { y: -15, x: 10, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
      gsap.to(cards[2], { y: -10, x: -15, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    }
  }, []);

  const features = [
    { icon: Camera, text: "Report with Photo" },
    { icon: MapPin, text: "Add Location" },
    { icon: Brain, text: "AI Auto-Merge" },
    { icon: Activity, text: "Track Real-Time Status" },
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image Overlay (Simulating Indian city at dusk) */}
      <div className="absolute inset-0 z-[-1] opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03111F]/50 via-[#03111F]/80 to-[#03111F] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2000&auto=format&fit=crop" 
          alt="City at dusk" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 mb-6 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 mr-2 inline" />
                A Cleaner, Safer & Better Tomorrow
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Report Local Issues.<br />
              Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 animate-gradient">Better Community.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-xl"
            >
              CivicConnect helps citizens report potholes, garbage, broken streetlights and other local issues — then track their progress from report to resolution.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/report-issue">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-[#03111F] font-bold text-lg rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] group">
                  Report an Issue
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-white/20 hover:bg-white/5 text-white font-semibold text-lg rounded-full backdrop-blur-sm">
                  <Play className="ml-2 w-5 h-5 mr-2" />
                  Explore the Map
                </Button>
              </Link>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-white/50 mb-8"
            >
              No complicated forms. Just capture, report and track.
            </motion.p>

            {/* Feature Mini-Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                  className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2 text-emerald-400">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-white/80">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Visual (Phone Mockup) */}
          <div className="relative hidden lg:block h-[700px] w-full perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Glow Behind Phone */}
              <div className="absolute w-[300px] h-[500px] bg-emerald-500/20 blur-[100px] rounded-full" />
              
              {/* Phone Container */}
              <div ref={phoneRef} className="relative z-10 w-[320px] h-[650px] bg-[#0A1A2A] rounded-[40px] border-[8px] border-[#1E293B] shadow-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-[#1E293B] rounded-b-2xl z-20" />
                
                {/* Phone Content (Mini Dashboard) */}
                <div className="flex-1 p-5 pt-10 overflow-hidden relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                        <MapPin className="text-[#03111F] h-3 w-3" />
                      </div>
                      <span className="font-bold text-sm text-white">CivicConnect</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                      <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-1">Good Evening, Dipak 👋</h3>
                    <p className="text-[10px] text-white/50 leading-tight">Together we can make our city cleaner, safer and better.</p>
                  </div>

                  {/* Weather Widget */}
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="text-sm font-bold text-white">28°C</div>
                        <div className="text-[10px] text-white/50">Partly Cloudy</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-white">Domjuri</div>
                      <div className="text-[9px] text-white/50">East Singhbhum</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-2xl">
                      <div className="text-[10px] text-blue-400 font-medium mb-1 flex items-center gap-1"><Activity className="w-3 h-3"/> Total Issues</div>
                      <div className="text-xl font-bold text-white">12</div>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-2xl">
                      <div className="text-[10px] text-orange-400 font-medium mb-1">Pending</div>
                      <div className="text-xl font-bold text-white">5</div>
                    </div>
                  </div>

                  {/* Map Preview */}
                  <div className="w-full h-[180px] rounded-2xl border border-white/10 bg-[#081F2F] relative overflow-hidden mb-4">
                    <img src="https://www.transparenttextures.com/patterns/cubes.png" className="absolute inset-0 opacity-20" alt="map" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                      <MapPin className="text-emerald-500 w-4 h-4" />
                    </div>
                  </div>

                  {/* Floating Add Button */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20 cursor-pointer">
                    <div className="w-6 h-6 text-[#03111F] font-bold text-xl flex items-center justify-center">+</div>
                  </div>
                </div>
              </div>

              {/* Floating Cards around Phone */}
              <div ref={floatingCardsRef} className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-[20%] right-[10%] bg-[#081F2F]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Pothole Reported</div>
                    <div className="text-[10px] text-white/50">RCC Road • Just now</div>
                  </div>
                </div>
                
                <div className="absolute bottom-[30%] left-[5%] bg-[#081F2F]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Garbage Cleared</div>
                    <div className="text-[10px] text-white/50">Ward 10 • Resolved</div>
                  </div>
                </div>

                <div className="absolute top-[60%] right-[5%] bg-[#081F2F]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Issue Auto-Merged</div>
                    <div className="text-[10px] text-white/50">Streetlight Issue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
