"use client";

import { motion } from "framer-motion";
import { Camera, Brain, Activity, BarChart, Map, Users } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Smart Issue Reporting",
    desc: "Report local problems with photos, location and detailed descriptions.",
  },
  {
    icon: Brain,
    title: "AI Duplicate Detection",
    desc: "Automatically identify similar reports and reduce duplicate complaints.",
  },
  {
    icon: Activity,
    title: "Real-Time Tracking",
    desc: "Follow every issue from submission to resolution.",
  },
  {
    icon: BarChart,
    title: "Ward Transparency",
    desc: "See issue statistics and resolution performance ward by ward.",
  },
  {
    icon: Map,
    title: "Interactive Civic Map",
    desc: "Explore issues around you and understand what is happening nearby.",
  },
  {
    icon: Users,
    title: "Community Support",
    desc: "Support existing reports instead of submitting duplicate complaints.",
  }
];

export function FeatureGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#03111F]">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything you need to make your community better.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-3xl glass-card border border-white/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-colors duration-500" />
              <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-white/70 group-hover:text-emerald-400 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
