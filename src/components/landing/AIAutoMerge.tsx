"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, FileText, ArrowDown, Sparkles, Users } from "lucide-react";

export function AIAutoMerge() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });
      
      tl.from(".report-card", {
        y: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.5)"
      })
      .to(".merge-line", {
        height: "40px",
        opacity: 1,
        stagger: 0.2,
        duration: 0.4
      })
      .from(".ai-node", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)"
      })
      .to(".ai-node", {
        boxShadow: "0 0 40px rgba(16,185,129,0.8)",
        duration: 0.5,
        yoyo: true,
        repeat: 1
      })
      .to(".final-line", {
        height: "40px",
        opacity: 1,
        duration: 0.4
      })
      .from(".master-issue", {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power3.out"
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-[#03111F] to-[#051726]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4" />
              SMART MERGING
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Less Noise.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">More Action.</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed max-w-lg">
              AI automatically identifies duplicate civic reports so communities can focus on solving problems, not repeating them.
            </p>
          </div>
          
          <div className="relative flex flex-col items-center">
            {/* 3 Reports */}
            <div className="flex gap-4 md:gap-8 w-full justify-center">
              {[
                { id: "#1042", issue: "Pothole", dist: "120m away" },
                { id: "#1051", issue: "Road Damage", dist: "95m away" },
                { id: "#1067", issue: "Pothole", dist: "80m away" }
              ].map((report, i) => (
                <div key={i} className="report-card flex flex-col items-center">
                  <div className="glass-card p-4 rounded-xl border border-white/10 w-24 md:w-32 text-center shadow-lg relative bg-[#081F2F]">
                    <FileText className="w-5 h-5 mx-auto text-white/40 mb-2" />
                    <div className="text-[10px] md:text-xs text-primary font-bold mb-1">Report {report.id}</div>
                    <div className="text-xs md:text-sm font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">{report.issue}</div>
                    <div className="text-[9px] md:text-[10px] text-white/40 mt-1">{report.dist}</div>
                  </div>
                  <div className="merge-line w-px h-0 bg-gradient-to-b from-white/20 to-emerald-500/50 opacity-0" />
                </div>
              ))}
            </div>
            
            {/* AI Node */}
            <div className="ai-node w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] z-10 border-4 border-[#051726]">
              <Brain className="w-8 h-8 text-[#03111F]" />
            </div>
            
            <div className="final-line w-px h-0 bg-gradient-to-b from-emerald-500 to-white/20 opacity-0" />
            
            {/* Master Issue */}
            <div className="master-issue glass-card p-6 rounded-2xl border border-emerald-500/30 w-full max-w-sm text-center shadow-[0_10px_40px_rgba(16,185,129,0.15)] bg-[#03111F] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent" />
              <div className="relative z-10">
                <div className="text-xs font-bold text-emerald-400 tracking-wider uppercase mb-2">Master Issue</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Pothole — RCC Road, Sector 3</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Users className="w-3 h-3 text-white/60" />
                  <span className="text-xs font-medium text-white/80">17 citizens affected</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
