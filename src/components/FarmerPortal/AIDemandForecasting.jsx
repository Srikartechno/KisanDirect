import React, { useState } from 'react';
import { Sparkles, TrendingUp, Calendar, AlertCircle, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { DEMAND_FORECASTS } from '../../data/forecastingData';

export default function AIDemandForecasting({ onQuickListCrop }) {
  const [selectedCropId, setSelectedCropId] = useState('tomato');

  const currentCrop = DEMAND_FORECASTS.find((c) => c.id === selectedCropId) || DEMAND_FORECASTS[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Farmer AI Demand Forecasting
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            Next Week Market Demand & Harvest Advisor
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Simple visual gauges so you harvest at peak market price without oversupply loss.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Live Mandi & Buyer Feed
          </span>
        </div>
      </div>

      {/* CROP SELECTOR TABS */}
      <div className="flex flex-wrap gap-2 mb-8">
        {DEMAND_FORECASTS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCropId(c.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
              selectedCropId === c.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span className="text-lg">{c.icon}</span>
            <span>{c.cropName}</span>
          </button>
        ))}
      </div>

      {/* USER REQUESTED VISUAL DEMAND DISPLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT: THE VISUAL BLOCK REQUESTED BY USER */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div>
            {/* Title with Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentCrop.icon}</span>
                <div>
                  <h4 className="text-2xl font-black tracking-wide text-white">{currentCrop.cropName}</h4>
                  <p className="text-xs text-slate-400">{currentCrop.variety}</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                {currentCrop.statusTag}
              </span>
            </div>

            {/* VISUAL BARS (Matches prompt specification: Current demand ████████░░ / Next week ██████████ ↑ 18%) */}
            <div className="space-y-6 font-mono my-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
              
              {/* Row 1: Current demand */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5 font-sans">
                  <span className="font-bold">Current demand</span>
                  <span className="text-slate-400">{currentCrop.currentDemandPct}% capacity</span>
                </div>
                <div className="text-emerald-400 font-mono text-base tracking-widest bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span>{currentCrop.currentDemandBar}</span>
                  <span className="text-xs text-slate-400 font-sans">Normal</span>
                </div>
              </div>

              {/* Row 2: Next week demand with Surge indicator */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5 font-sans">
                  <span className="font-bold">Next week</span>
                  <span className="text-emerald-400 font-black flex items-center gap-1 font-sans">
                    <TrendingUp className="w-4 h-4" /> ↑ {currentCrop.growthPct}% Higher
                  </span>
                </div>
                <div className="text-emerald-300 font-mono text-base tracking-widest bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-500/40 flex justify-between items-center">
                  <span>{currentCrop.nextWeekDemandBar}</span>
                  <span className="text-xs font-bold text-emerald-400 font-sans">↑ {currentCrop.growthPct}%</span>
                </div>
              </div>

            </div>

            {/* EXPECTED DEMAND & RECOMMENDED HARVEST CALLOUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Expected demand:
                </div>
                <div className="text-3xl font-black text-amber-400 mt-1">
                  {currentCrop.expectedDemandKg}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Urban supermarkets & restaurant buyers ready to purchase
                </div>
              </div>

              <div className="p-4 bg-emerald-950/70 rounded-2xl border border-emerald-700/60">
                <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                  Recommended harvest:
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                  {currentCrop.recommendedHarvestRange}
                </div>
                <div className="text-[11px] text-emerald-200/80 mt-1">
                  Optimal quota to prevent glut and get top price
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Price Trend: <strong className="text-emerald-400">{currentCrop.priceProjection}</strong></span>
            <span>Risk: <strong className="text-slate-300">{currentCrop.weatherRisk}</strong></span>
          </div>
        </div>

        {/* RIGHT: HARVEST ADVISORY & ACTIONS */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <h5 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Agronomist Harvest Advice (Simple Words)
            </h5>
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              "{currentCrop.harvestAdvice}"
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Market Intelligence</h5>
            <div className="text-xs text-slate-600">
              <strong>Demand Driver:</strong> {currentCrop.marketTrend}
            </div>
            <div className="text-xs text-slate-600">
              <strong>Weather Window:</strong> {currentCrop.weatherRisk}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <div className="text-xs font-bold text-amber-900 mb-1">
              🌾 Have this crop ready in your field?
            </div>
            <p className="text-xs text-amber-800 mb-3">
              Lock in next week's peak price before the recommended quota fills up.
            </p>
            <button
              onClick={() => onQuickListCrop(currentCrop)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>List {currentCrop.cropName} Harvest Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
