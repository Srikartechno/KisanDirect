import React, { useState } from 'react';
import { ArrowDown, CheckCircle2, XCircle, TrendingUp, AlertTriangle, ShieldCheck, Clock, Leaf } from 'lucide-react';

export default function SupplyChainComparison({ onExploreMarketplace, onExploreFarmer }) {
  const [activeTab, setActiveTab] = useState('comparison'); // 'comparison' | 'calculator'
  const [kgVolume, setKgVolume] = useState(500);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          The Agritech Revolution
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How We Cut <span className="text-rose-600 line-through">5 Middlemen</span> Down to <span className="text-emerald-600 underline decoration-emerald-400 decoration-4">2 Direct Stages</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          Traditional supply chains trap farmers in debt and overcharge consumers through 5 layers of brokers. KisanDirect connects farm gates directly to consumer doorsteps via smart FPO hubs.
        </p>
      </div>

      {/* Main 2-Stage vs 5-Stage Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* BROKEN 5-STAGE TRADITIONAL CHAIN */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-red-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" /> 5 Broken Stages
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🏚️</span>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Traditional Exploitative Chain</h3>
                <p className="text-xs text-red-600 font-medium">Multiple markups, delayed transit, 35% spoilage</p>
              </div>
            </div>

            {/* Step-by-Step Flow */}
            <div className="space-y-3 relative">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌾</span>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">1. FARM GATE</div>
                    <div className="text-xs text-slate-500">Farmer underpaid, distress selling</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-600">Farmer gets ₹16/kg</div>
                  <div className="text-[11px] text-slate-400">Barely covers seeds & water</div>
                </div>
              </div>

              <div className="flex justify-center text-slate-400">
                <ArrowDown className="w-4 h-4 text-red-400 animate-bounce" />
              </div>

              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🤵</span>
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">2. Village Trader / Aggregator</div>
                    <div className="text-[11px] text-slate-500">Adds commission & interest deductions</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700">+₹6 / kg cut</span>
              </div>

              <div className="flex justify-center text-slate-400">
                <ArrowDown className="w-4 h-4 text-red-400" />
              </div>

              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏢</span>
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">3. APMC Mandi Wholesaler</div>
                    <div className="text-[11px] text-slate-500">Mandi taxes, loading charges, handling fee</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700">+₹8 / kg cut</span>
              </div>

              <div className="flex justify-center text-slate-400">
                <ArrowDown className="w-4 h-4 text-red-400" />
              </div>

              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚚</span>
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">4. Regional Distributor</div>
                    <div className="text-[11px] text-slate-500">Warehouse margins, transit losses</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700">+₹10 / kg cut</span>
              </div>

              <div className="flex justify-center text-slate-400">
                <ArrowDown className="w-4 h-4 text-red-400" />
              </div>

              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏪</span>
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">5. Urban Retailer / Supermarket</div>
                    <div className="text-[11px] text-slate-500">Air-conditioned shelf markup & wastage buffer</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700">+₹18 / kg cut</span>
              </div>

              <div className="flex justify-center text-slate-400">
                <ArrowDown className="w-4 h-4 text-red-400 animate-bounce" />
              </div>

              <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛒</span>
                  <div>
                    <div className="font-bold text-sm">CONSUMER (YOU)</div>
                    <div className="text-xs text-slate-400">Old produce (4–6 days post-harvest)</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-red-400">YOU PAY ₹58/kg</div>
                  <div className="text-[11px] text-red-300">Farmer gets only 27%!</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1 text-red-600 font-semibold">
              <AlertTriangle className="w-4 h-4" /> 35% produce spoiled in transit
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-4 h-4" /> 96-120 hrs transit delay
            </span>
          </div>
        </div>

        {/* 2-STAGE KISANDIRECT DIRECT CHAIN */}
        <div className="bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/50 rounded-2xl p-6 sm:p-8 border-2 border-emerald-500 shadow-lg glow-emerald relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> 2 Direct Stages
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🌱</span>
              <div>
                <h3 className="text-xl font-bold text-emerald-950">KisanDirect 2-Stage Network</h3>
                <p className="text-xs text-emerald-700 font-medium">Bypasses middlemen, AI route cold-chain, farm-fresh in hours</p>
              </div>
            </div>

            {/* Step-by-Step Flow */}
            <div className="space-y-6 relative my-auto py-2">
              
              {/* STAGE 1: FARM */}
              <div className="p-4 bg-white rounded-xl border-2 border-emerald-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl shadow-inner">
                    🌾
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      STAGE 1: FARM
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">FAIR PRICE GUARANTEE</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">Farmer sets AI-recommended price with guaranteed 35%+ profit margin</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-emerald-700">₹36 / kg</div>
                  <div className="text-xs font-semibold text-emerald-600 flex items-center justify-end gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +125% more income
                  </div>
                </div>
              </div>

              {/* Direct Arrow with telemetry */}
              <div className="flex flex-col items-center justify-center py-1">
                <div className="bg-emerald-100/90 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-emerald-300">
                  <span>🏢 FPO Aggregator & Smart Cold Chain (+₹4/kg direct logistics)</span>
                </div>
                <ArrowDown className="w-6 h-6 text-emerald-600 my-1 animate-bounce" />
              </div>

              {/* STAGE 2: YOU */}
              <div className="p-4 bg-emerald-950 text-white rounded-xl shadow-md flex items-center justify-between border border-emerald-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-900 flex items-center justify-center text-2xl border border-emerald-700">
                    🛒
                  </div>
                  <div>
                    <div className="font-extrabold text-base flex items-center gap-2">
                      STAGE 2: YOU (CONSUMER)
                      <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">100% TRACEABLE</span>
                    </div>
                    <div className="text-xs text-emerald-200 mt-0.5">Harvested today morning, direct from Ramesh Patil / Sahyadri FPO</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-emerald-400">YOU PAY ₹40/kg</div>
                  <div className="text-xs text-emerald-300 font-semibold">Save ₹18/kg (31% OFF)!</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> &lt;2% Spoilage (Zero Waste Protocol)
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Clock className="w-4 h-4 text-emerald-600" /> Farm to Door in under 12 hours
            </span>
          </div>
        </div>

      </div>

      {/* Quick Call to Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onExploreMarketplace}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <span>🛒 Shop Fresh Direct From Farmers</span>
        </button>
        <button
          onClick={onExploreFarmer}
          className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border-2 border-emerald-600 text-emerald-700 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
        >
          <span>👨‍🌾 List Your Harvest (For Farmers & FPOs)</span>
        </button>
      </div>
    </section>
  );
}
