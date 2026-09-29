"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Circle, MapPin, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const timeline = [
  { stage: "Reported", date: "Oct 12, 09:30 AM", active: true, done: true },
  { stage: "Verified", date: "Oct 12, 11:15 AM", active: true, done: true },
  { stage: "Assigned", date: "Oct 12, 02:00 PM", active: true, done: true },
  { stage: "In Progress", date: "Oct 13, 10:00 AM", active: true, done: true },
  { stage: "Resolved", date: "Oct 14, 04:30 PM", active: true, done: true },
];

export function IssueTrackingSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#03111F]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">From Reported to Resolved.</h2>
          <p className="text-lg text-white/60">Every step of the process is visible to you and the community.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Streetlight Not Working</h3>
                <p className="text-white/60">Main Road, Ward 8</p>
              </div>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:to-white/10 z-10">
              {timeline.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex items-center gap-6"
                >
                  <div className={`mt-1 relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 
                    ${item.done ? 'bg-emerald-500 border-emerald-500 text-[#03111F]' : 'bg-[#03111F] border-white/20 text-white/20'}`}>
                    {item.done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold ${item.done ? 'text-white' : 'text-white/40'}`}>
                      {item.stage}
                    </h4>
                    <p className={`text-sm ${item.done ? 'text-emerald-400' : 'text-white/20'}`}>
                      {item.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white">Track progress in real-time on your dashboard.</h3>
            <p className="text-lg text-white/60 leading-relaxed">
              Gone are the days of submitting a complaint into a black box. CivicConnect gives you a clear timeline of actions taken by municipal authorities, including which department is handling it and when it is completed.
            </p>
            <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 hover:bg-white/5 text-white font-semibold text-lg rounded-full">
              View Sample Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
