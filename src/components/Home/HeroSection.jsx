import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Users, Truck, HeartHandshake } from 'lucide-react';

export default function HeroSection({ onExploreMarketplace, onExploreFarmer, onExploreLogistics }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background organic light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Direct Farm-to-Fork 2.0 • Zero Middlemen Commission</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            Empowering <span className="text-emerald-400 underline decoration-emerald-500/60">Farmers</span>.<br />
            Delighting <span className="text-amber-400">Consumers</span>.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Eliminating 5 layers of predatory middlemen. Get crops harvested today directly from verified local farmers with transparent pricing, cold-chain delivery, and AI demand intelligence.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreMarketplace}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all flex items-center gap-3"
          >
            <span>🛒 Buy Direct from Farmers</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          <button
            onClick={onExploreFarmer}
            className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base backdrop-blur-md transition-all flex items-center gap-3 hover:scale-105"
          >
            <span>👨‍🌾 Farmer Smart Selling Portal</span>
          </button>

          <button
            onClick={onExploreLogistics}
            className="px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-blue-500/40 text-blue-300 font-semibold text-sm backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Truck className="w-4 h-4 text-blue-400" />
            <span>AI Multi-Farmer Route</span>
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-emerald-800/40 text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">+18%</div>
            <div className="text-xs text-slate-400 mt-0.5">Farmer Income Boost</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-teal-400">-23%</div>
            <div className="text-xs text-slate-400 mt-0.5">Intermediary Costs Cut</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">&lt; 12 Hours</div>
            <div className="text-xs text-slate-400 mt-0.5">Farm Harvest to Doorstep</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">100% Direct</div>
            <div className="text-xs text-slate-400 mt-0.5">Contact Actual Farmer</div>
          </div>
        </div>

      </div>
    </div>
  );
}
