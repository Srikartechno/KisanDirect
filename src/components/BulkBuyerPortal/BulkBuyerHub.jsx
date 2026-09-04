import React, { useState } from 'react';
import { Building2, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Search, Users, Truck, DollarSign } from 'lucide-react';
import { CROP_OPTIONS } from '../../data/mockData';

export default function BulkBuyerHub({ onOrderMatched }) {
  const [selectedCrop, setSelectedCrop] = useState(CROP_OPTIONS[0]);
  const [requiredQtyTons, setRequiredQtyTons] = useState(5);
  const [deliveryCadence, setDeliveryCadence] = useState('weekly');
  const [targetMaxPrice, setTargetMaxPrice] = useState(38);
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const handleRunAIMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setMatchResult({
        matchedFPO: 'Sahyadri & Malwa Farm Cluster',
        totalFarmersAggregated: 4,
        availableCapacityTons: 6.2,
        quotedPricePerKg: 35.5,
        estimatedSavingsVsMandi: '₹34,000 / month',
        deliverySchedule: 'Every Tuesday & Friday, 06:00 AM Cold-Chain Drop',
        farmers: [
          { name: 'Ramesh Patil', shareTons: 2.5, village: 'Dindori, Nashik' },
          { name: 'Baldev Patel', shareTons: 1.8, village: 'Petlad, Anand' },
          { name: 'Sunita Devi', shareTons: 1.0, village: 'Mandya Cluster' },
          { name: 'Suresh Sharma', shareTons: 0.9, village: 'Malwa FPO' },
        ]
      });
    }, 1100);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-amber-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-amber-800/40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
            <Building2 className="w-3.5 h-3.5" />
            Institutional & Enterprise Sourcing
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Bulk Buyer Hub & AI Cluster Match
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-amber-100/80 leading-relaxed">
            Restaurants, cloud kitchens, hotel chains, and supermarket brands can procure multi-ton farm lots directly from FPOs with uniform grading and cold-chain route guarantees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: REQUIREMENTS FORM */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-black text-slate-900">Post Bulk Requirement</h3>
            <p className="text-xs text-slate-500">Our AI matches smallholder farmer clusters to meet your exact volume</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Select Commodity</label>
            <div className="grid grid-cols-4 gap-2">
              {CROP_OPTIONS.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCrop(c)}
                  className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                    selectedCrop.id === c.id
                      ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xl mb-1">{c.icon}</div>
                  <div>{c.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Required Volume (Metric Tons)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="50"
                value={requiredQtyTons}
                onChange={(e) => setRequiredQtyTons(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
              />
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Tons ({requiredQtyTons * 1000} kg)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Frequency</label>
            <select
              value={deliveryCadence}
              onChange={(e) => setDeliveryCadence(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="daily">Daily Morning Restock</option>
              <option value="weekly">Weekly Consolidated Shipment</option>
              <option value="biweekly">Twice a Week Delivery</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Ceiling Price (₹/kg)</label>
            <input
              type="number"
              value={targetMaxPrice}
              onChange={(e) => setTargetMaxPrice(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
            />
          </div>

          <button
            onClick={handleRunAIMatch}
            disabled={isMatching}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isMatching ? 'Searching FPO Clusters...' : 'Run AI Cluster Match'}</span>
          </button>
        </div>

        {/* RIGHT: AI MATCH RESULTS */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-900">AI Match Engine Output</h3>
              <p className="text-xs text-slate-500">Autonomous aggregation of smallholder farmer lots</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verified FPO Backed
            </span>
          </div>

          {matchResult ? (
            <div className="space-y-6">
              
              {/* Match Highlight */}
              <div className="p-5 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 rounded-2xl border-2 border-emerald-500">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-emerald-950 text-base">
                    ✓ Optimal Match Found: {matchResult.matchedFPO}
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-white px-3 py-1 rounded-xl border border-emerald-300 shadow-xs">
                    ₹{matchResult.quotedPricePerKg} / kg
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Aggregated <strong>{matchResult.totalFarmersAggregated} smallholder farmers</strong> to deliver your {requiredQtyTons} Tons with unified A-grade sorting.
                </p>

                <div className="mt-3 pt-3 border-t border-emerald-200 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px]">Aggregated Capacity:</span>
                    <div className="font-bold text-slate-800">{matchResult.availableCapacityTons} Tons</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Monthly Savings:</span>
                    <div className="font-bold text-emerald-700">{matchResult.estimatedSavingsVsMandi}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Dispatch Schedule:</span>
                    <div className="font-bold text-blue-700">Cold Chain Scheduled</div>
                  </div>
                </div>
              </div>

              {/* Farmers in this cluster */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Farmers Aggregated in this Lot:
                </h4>
                <div className="space-y-2">
                  {matchResult.farmers.map((f, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{f.name}</span>
                        <span className="text-slate-500 ml-2">📍 {f.village}</span>
                      </div>
                      <span className="font-extrabold text-emerald-700">{f.shareTons} Tons Quota</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">Includes refrigerated direct delivery to your warehouse.</span>
                <button
                  onClick={() => onOrderMatched && onOrderMatched(matchResult)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-all flex items-center gap-2"
                >
                  <span>Lock Smart Procurement Contract</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <div className="text-3xl">🤖</div>
              <p className="text-xs font-medium">Click "Run AI Cluster Match" to aggregate local farm suppliers for your bulk requirement.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
