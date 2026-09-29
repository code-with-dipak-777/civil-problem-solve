"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, HeartHandshake } from "lucide-react";

const cards = [
  {
    title: "Cleaner Surroundings",
    desc: "Citizens helping keep neighborhoods cleaner.",
    icon: Leaf,
    img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Safer Communities",
    desc: "Problems become visible before they become bigger.",
    icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Stronger Communities",
    desc: "Citizens and local authorities stay connected.",
    icon: HeartHandshake,
    img: "https://images.unsplash.com/photo-1529156069898-49953eb1b5e4?q=80&w=800&auto=format&fit=crop"
  }
];

export function CommunitySection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#051726] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Real People.<br/>Real Issues.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Real Change.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group rounded-3xl overflow-hidden glass-card border border-white/5 relative h-[400px]"
            >
              <img 
                src={card.img} 
                alt={card.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 mix-blend-luminosity group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03111F] via-[#03111F]/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                  <card.icon className="w-6 h-6 text-white group-hover:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-white/70">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
