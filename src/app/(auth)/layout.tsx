import Link from "next/link";
import { MapPin } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#03111F] text-white selection:bg-emerald-500/30 relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6 transition-transform hover:scale-105">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <MapPin className="text-[#03111F] h-7 w-7" />
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">CivicConnect</span>
        </Link>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
        {children}
      </div>
    </div>
  );
}
