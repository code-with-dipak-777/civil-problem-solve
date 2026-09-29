import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="bg-[#051726]/80 backdrop-blur-xl py-10 px-6 sm:px-12 rounded-3xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="text-white/60 mt-2 text-sm">Enter your details to sign in to your account</p>
      </div>

      <form className="space-y-6" action="#">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/40" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/40" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded bg-[#03111F] border border-white/10 text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-0 cursor-pointer appearance-none checked:bg-emerald-500 checked:border-emerald-500 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;utf8,<svg%20fill=%22%2303111F%22%20viewBox=%220%200%2020%2020%20%22%20xmlns=%22http://www.w3.org/2000/svg%22><path%20fill-rule=%22evenodd%22%20d=%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule=%22evenodd%22></path></svg>')] checked:before:block before:hidden"
          />
          <label htmlFor="remember-me" className="ml-3 block text-sm text-white/60 cursor-pointer select-none hover:text-white/80 transition-colors">
            Remember me
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-[#03111F] bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#051726] focus:ring-emerald-500 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            Sign in
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-[#051726] text-white/40">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <a
            href="#"
            className="w-full flex justify-center items-center px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-white/60">
        Don't have an account?{" "}
        <Link href="/signup" className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}
