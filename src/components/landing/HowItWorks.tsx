"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Brain, Activity, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    { num: "01", title: "Report Issue", desc: "Add a photo, location and details.", icon: Camera },
    { num: "02", title: "AI Checks", desc: "Duplicate reports are automatically detected.", icon: Brain },
    { num: "03", title: "Track Progress", desc: "See real-time status updates.", icon: Activity },
    { num: "04", title: "Issue Resolved", desc: "Know when the problem is fixed.", icon: CheckCircle },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray('.step-item');
      
      gsap.fromTo(stepElements, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
      
      gsap.fromTo('.step-line', 
        { width: 0 },
        {
          width: '100%',
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium tracking-wide">
            HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple Steps.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Real Impact.</span></h2>
          <p className="text-lg text-white/60">Reporting an issue is easy. Your voice reaches the right people.</p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:block relative pt-12 pb-24">
          <div className="absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-white/10" />
          <div className="step-line absolute top-[4.5rem] left-[10%] h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 w-0" />
          
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="step-item text-center group">
                <div className="w-16 h-16 mx-auto bg-[#03111F] border-2 border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-emerald-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all relative">
                  <step.icon className="w-6 h-6 text-white/50 group-hover:text-emerald-400 transition-colors" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-emerald-500 text-[#03111F] text-xs font-bold flex items-center justify-center">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-12 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {steps.map((step, i) => (
            <div key={i} className="step-item relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-white/10 bg-[#03111F] group-hover:border-emerald-500 shrink-0 relative z-10 text-white/50 group-hover:text-emerald-400 transition-colors">
                <step.icon className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-[#03111F] text-[10px] font-bold flex items-center justify-center">
                  {step.num}
                </div>
              </div>
              <div className="w-[calc(100%-5rem)] p-4 rounded-2xl glass-card border border-white/5 ml-4">
                <h3 className="font-bold text-white text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-white/60">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
