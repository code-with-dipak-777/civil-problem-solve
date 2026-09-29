"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, CheckCircle2, Building, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10, suffix: "K+", label: "Active Citizens", icon: Users },
  { value: 5, suffix: "K+", label: "Issues Resolved", icon: CheckCircle2 },
  { value: 50, suffix: "+", label: "Wards Covered", icon: Building },
  { value: 92, suffix: "%", label: "Resolution Transparency", icon: Eye },
];

export function ImpactStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      countersRef.current.forEach((counter, i) => {
        if (!counter) return;
        const targetValue = stats[i].value;
        
        gsap.to(counter, {
          innerHTML: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counter.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString() + stats[i].suffix;
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 p-4 lg:p-6 rounded-2xl glass-card border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white flex items-baseline">
                  <span ref={el => { countersRef.current[i] = el; }}>0</span>
                </div>
                <div className="text-sm font-medium text-white/50">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
