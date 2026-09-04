import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Truck, Sparkles, Sprout, ShoppingCart, Leaf, ShieldCheck, ArrowUpRight, BarChart3 } from 'lucide-react';
import { IMPACT_METRICS } from '../../data/mockData';

export default function FullImpactDashboard() {
  const [farmerCount, setFarmerCount] = useState(250);
  const [monthlyVolumeTons, setMonthlyVolumeTons] = useState(120);

  // Dynamic impact calculation based on volume
  const totalFarmerExtraIncomeLakhs = ((monthlyVolumeTons * 1000 * 12 * 0.18) / 100000).toFixed(1);
  const totalFoodWasteSavedKg = Math.round(monthlyVolumeTons * 1000 * 0.12);
  const totalConsumerRupeesSavedLakhs = ((monthlyVolumeTons * 1000 * 18 * 0.09) / 100000).toFixed(1);
  const co2AvoidedKg = Math.round(monthlyVolumeTons * 28.5);

  const keyCards = [
    {
      title: 'Farmer earnings',
      icon: '👨‍🌾',
      badge: 'THIS MONTH',
      value: '+18%',
      trend: 'Upward trend',
      detail: 'Direct cash flow to rural growers, bypassing 5 layers of commission brokers.',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Intermediary cost',
      icon: '💰',
      badge: 'THIS MONTH',
      value: '-23%',
      trend: 'Massive reduction',
      detail: 'Village brokers, APMC market tax fees, and secondary handling margins eliminated.',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Logistics cost',
      icon: '🚚',
      badge: 'THIS MONTH',
      value: '-14%',
      trend: 'Route optimized',
      detail: 'AI multi-farmer clustering route cuts deadhead mileage and fuel burn.',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Food wastage',
      icon: '🥬',
      badge: 'THIS MONTH',
      value: '-12%',
      trend: 'Farm gate fresh',
      detail: 'Farm-to-consumer within 12 hours with refrigerated EV transit stops produce rotting.',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      title: 'Consumer savings',
      icon: '🛒',
      badge: 'THIS MONTH',
      value: '9%',
      trend: 'Direct value',
      detail: 'Consumers pay significantly less than supermarket shelf and dark-store markups.',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            <BarChart3 className="w-3.5 h-3.5" />
            Social & Economic Accountability
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Impact Dashboard
          </h1>
          <p className="mt-2 text-xs sm:text-base text-emerald-100/80 leading-relaxed">
            Measuring the real transformation: putting money back in the hands of hard-working farmers while delivering nutrient-dense food to consumers.
          </p>
        </div>
      </div>

      {/* 5 USER SPECIFIED CARDS WITH THIS MONTH BADGE */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-900">Key Agritech Performance Indicators</h2>
          <span className="px-3 py-1 bg-slate-900 text-emerald-400 rounded-xl text-xs font-black tracking-wider uppercase border border-slate-700">
            THIS MONTH
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {keyCards.map((c, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl bg-white border-2 ${c.borderColor} shadow-sm hover:shadow-lg transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-100">{c.icon}</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {c.badge}
                  </span>
                </div>
                <div className="text-xs font-extrabold text-slate-500">{c.title}</div>
                <div className={`text-4xl font-black mt-1 tracking-tight ${c.textColor}`}>
                  {c.value}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-snug">
                {c.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE IMPACT CALCULATOR */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Regional Calculator
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            Simulate the Scale of 2-Stage Farm Networks
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Adjust monthly volume to see projected economic benefits distributed to rural clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Participating Farmers & FPO Members:</span>
                <span className="text-emerald-700 font-extrabold text-sm">{farmerCount} Farmers</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={farmerCount}
                onChange={(e) => setFarmerCount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Monthly Produce Handled:</span>
                <span className="text-emerald-700 font-extrabold text-sm">{monthlyVolumeTons} Metric Tons</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={monthlyVolumeTons}
                onChange={(e) => setMonthlyVolumeTons(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Computed Results Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-xs text-emerald-800 font-bold">Additional Farmer Income</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
                ₹{totalFarmerExtraIncomeLakhs} Lakhs
              </div>
              <div className="text-[11px] text-emerald-600 mt-1">+18% net over APMC rates</div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
              <div className="text-xs text-teal-800 font-bold">Food Spoilage Prevented</div>
              <div className="text-2xl sm:text-3xl font-black text-teal-700 mt-1">
                {totalFoodWasteSavedKg.toLocaleString()} kg
              </div>
              <div className="text-[11px] text-teal-600 mt-1">Kept fresh in cold-chain</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="text-xs text-amber-800 font-bold">Consumer Money Saved</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
                ₹{totalConsumerRupeesSavedLakhs} Lakhs
              </div>
              <div className="text-[11px] text-amber-600 mt-1">9% direct pocket savings</div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="text-xs text-blue-800 font-bold">CO₂ Emissions Cut</div>
              <div className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">
                {co2AvoidedKg.toLocaleString()} kg
              </div>
              <div className="text-[11px] text-blue-600 mt-1">Optimized EV route clustering</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
