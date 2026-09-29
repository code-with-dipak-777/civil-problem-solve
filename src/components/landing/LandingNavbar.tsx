"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#03111F]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all">
              <MapPin className="text-[#03111F] h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">CivicConnect</h1>
              <p className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider hidden sm:block">
                Cleaner Cities • Together
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/report-issue" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Report Issue</Link>
            <Link href="/map" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Map</Link>
            <Link href="/district-stats" className="text-sm font-medium text-white/70 hover:text-white transition-colors">District Stats</Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors w-64">
              <Search className="w-4 h-4" />
              <span>Search issues, location...</span>
              <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded text-white/40">Ctrl+K</span>
            </button>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/5 hover:text-emerald-400">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#03111F] font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#03111F]/95 backdrop-blur-2xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                  <MapPin className="text-[#03111F] h-6 w-6" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">CivicConnect</h1>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-semibold text-white/80">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Home</Link>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Dashboard</Link>
              <Link href="/report-issue" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Report Issue</Link>
              <Link href="/map" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Map</Link>
              <Link href="/district-stats" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">District Stats</Link>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-12 text-lg">Login</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#03111F] font-bold h-12 text-lg">Sign Up</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
