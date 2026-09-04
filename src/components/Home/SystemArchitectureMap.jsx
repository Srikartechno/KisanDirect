import React from 'react';
import { ArrowDown, CheckCircle2, ChevronRight, Truck, Shield, DollarSign, Activity, Cpu, Store, Users, ShoppingBag } from 'lucide-react';

export default function SystemArchitectureMap({ onSelectTab }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-slate-200 text-slate-700">
          Visual System Blueprint
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
          End-to-End Platform Architecture
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Click any module to jump directly into that live portal
        </p>
      </div>

      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* TOP: HOME NODE */}
        <div className="flex flex-col items-center">
          <div 
            onClick={() => onSelectTab('home')}
            className="cursor-pointer px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-lg tracking-wider uppercase shadow-lg shadow-emerald-900/40 border border-emerald-400/30 flex items-center gap-2 hover:scale-105 transition-all"
          >
            <span>🌾 HOME ECOSYSTEM</span>
          </div>

          {/* Central Trunk connector */}
          <div className="w-0.5 h-8 bg-emerald-500/60 my-1" />
          
          {/* Branching Bar */}
          <div className="w-full max-w-3xl h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />
        </div>

        {/* 3 PILLARS: FARMER | CONSUMER | BULK BUYER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 relative">
          
          {/* PILLAR 1: FARMER */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-emerald-500/60" />
            <div 
              onClick={() => onSelectTab('farmer')}
              className="w-full cursor-pointer p-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 transition-all text-center group"
            >
              <div className="text-2xl mb-1">👨‍🌾</div>
              <div className="font-extrabold text-emerald-400 text-sm tracking-wide group-hover:text-emerald-300">FARMER PORTAL</div>
              <div className="text-[11px] text-slate-400">Dashboard Hub</div>

              <div className="w-full h-px bg-slate-700 my-3" />

              {/* Sub-actions: SELL | AI DEMAND FORECAST | ORDERS */}
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-semibold">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300">
                  SELL & PRICE
                </div>
                <div className="p-1.5 rounded-lg bg-teal-950/60 border border-teal-800 text-teal-300">
                  AI DEMAND FORECAST
                </div>
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300">
                  ORDERS
                </div>
              </div>
            </div>
            <div className="w-0.5 h-8 bg-emerald-500/40" />
          </div>

          {/* PILLAR 2: CONSUMER */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-teal-500/60" />
            <div 
              onClick={() => onSelectTab('consumer')}
              className="w-full cursor-pointer p-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-teal-500/40 hover:border-teal-400 transition-all text-center group"
            >
              <div className="text-2xl mb-1">🛒</div>
              <div className="font-extrabold text-teal-400 text-sm tracking-wide group-hover:text-teal-300">CONSUMER</div>
              <div className="text-[11px] text-slate-400">Farmer-First Marketplace</div>

              <div className="w-full h-px bg-slate-700 my-3" />

              <div className="p-2 rounded-lg bg-teal-950/60 border border-teal-800 text-teal-300 text-xs font-bold">
                DIRECT BUY FROM FARMER
              </div>
            </div>
            <div className="w-0.5 h-8 bg-teal-500/40" />
          </div>

          {/* PILLAR 3: BULK BUYER */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-amber-500/60" />
            <div 
              onClick={() => onSelectTab('bulk')}
              className="w-full cursor-pointer p-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-amber-500/40 hover:border-amber-400 transition-all text-center group"
            >
              <div className="text-2xl mb-1">🏢</div>
              <div className="font-extrabold text-amber-400 text-sm tracking-wide group-hover:text-amber-300">BULK BUYER</div>
              <div className="text-[11px] text-slate-400">Institutional Sourcing</div>

              <div className="w-full h-px bg-slate-700 my-3" />

              <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-bold">
                REQUIREMENTS & AI MATCH
              </div>
            </div>
            <div className="w-0.5 h-8 bg-amber-500/40" />
          </div>
        </div>

        {/* CONVERGENCE BAR */}
        <div className="w-full max-w-3xl mx-auto h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />
        <div className="w-0.5 h-6 bg-slate-700 mx-auto" />

        {/* CONVERGED SEQUENTIAL FLOW PIPELINE */}
        <div className="max-w-2xl mx-auto space-y-2 mt-2">
          
          {/* STEP 1: ORDER MATCHING */}
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-900/60 border border-indigo-700 text-indigo-300 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">ORDER MATCHING</div>
                <div className="text-[11px] text-slate-400">Farmer harvest batch locked to verified buyer request</div>
              </div>
            </div>
            <span className="text-xs text-indigo-400 font-semibold">Smart Contract Escrow</span>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-slate-500" />
          </div>

          {/* STEP 2: LOGISTICS & AI ROUTE OPTIMIZATION */}
          <div 
            onClick={() => onSelectTab('logistics')}
            className="cursor-pointer p-3.5 bg-gradient-to-r from-blue-950/80 to-slate-800 rounded-xl border border-blue-600/50 hover:border-blue-400 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                🚚
              </div>
              <div>
                <div className="text-sm font-bold text-blue-300 flex items-center gap-2 group-hover:text-blue-200">
                  LOGISTICS & AI ROUTE OPTIMIZATION
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">Click to Inspect Map</span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono">Farmer A + B + C ──→ Cold Chain Van ──→ Buyer</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-slate-500" />
          </div>

          {/* STEP 3: PAYMENT & TRANSACTION */}
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700 text-emerald-300 flex items-center justify-center font-bold text-xs">
                ₹
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">PAYMENT & TRANSACTION</div>
                <div className="text-[11px] text-slate-400">Instant UPI/Direct bank transfer released upon delivery OTP</div>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">Zero Commission Fee</span>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-slate-500" />
          </div>

          {/* STEP 4: IMPACT DASHBOARD */}
          <div 
            onClick={() => onSelectTab('impact')}
            className="cursor-pointer p-4 bg-gradient-to-r from-emerald-950 to-slate-900 rounded-xl border-2 border-emerald-500/60 hover:border-emerald-400 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold text-base">
                📊
              </div>
              <div>
                <div className="text-sm font-extrabold text-emerald-300 group-hover:text-emerald-200">
                  IMPACT DASHBOARD
                </div>
                <div className="text-[11px] text-emerald-400/80 font-medium">
                  +18% Farmer Earnings | -23% Intermediary Cost | -12% Food Waste
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>

        </div>

      </div>
    </section>
  );
}
