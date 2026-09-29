"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#03111F]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/20" />
        {/* Animated Map Pins in Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ 
                y: "-20vh", 
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute"
              style={{ left: `${Math.random() * 100}%` }}
            >
              <MapPin className="text-emerald-500 w-8 h-8" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Your City.<br/>Your Voice.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Your Impact.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/70 mb-12"
        >
          See an issue? Report it. Track it. Help create change.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/report-issue">
            <Button size="lg" className="w-full sm:w-auto h-16 px-10 bg-emerald-500 hover:bg-emerald-600 text-[#03111F] font-bold text-xl rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] group transition-all hover:scale-105">
              Report an Issue
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 border-white/20 hover:bg-white/5 text-white font-bold text-xl rounded-full backdrop-blur-sm transition-all">
              Join CivicConnect
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
