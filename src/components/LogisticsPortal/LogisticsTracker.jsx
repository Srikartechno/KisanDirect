import React, { useState } from 'react';
import { CheckCircle2, Circle, ArrowDown, Clock, Truck, ShieldCheck, MapPin, Sparkles, Navigation, CalendarClock, Cpu, PackageCheck, ShoppingBag } from 'lucide-react';
import { LOGISTICS_STAGES } from '../../data/logisticsData';
import RouteOptimizationMap from './RouteOptimizationMap';

export default function LogisticsTracker({ activeOrder }) {
  const [currentStep, setCurrentStep] = useState(3); // Stage 3: AI Route Optimization currently active

  const stages = [
    { step: 1, title: 'ORDER CONFIRMED', desc: 'Direct order verified with farmer inventory lock', icon: 'CheckCircle2', time: '09:15 AM' },
    { step: 2, title: 'Pickup scheduling', desc: 'Farmer gates notified; crate loading scheduled', icon: 'CalendarClock', time: '09:40 AM' },
    { step: 3, title: 'AI route optimization', desc: 'Clustering Farmers A, B, and C into single EV run', icon: 'Cpu', time: '10:05 AM' },
    { step: 4, title: 'Farmer pickup', desc: 'EV cold-chain truck collecting from farm gates', icon: 'PackageCheck', time: '11:30 AM (Est)' },
    { step: 5, title: 'Delivery in transit', desc: 'Highway cold-chain express bypassing Mandi delays', icon: 'Truck', time: '02:45 PM (Est)' },
    { step: 6, title: 'Consumer handover', desc: 'Direct doorstep dropoff with instant digital payout', icon: 'ShoppingBag', time: '04:30 PM (Est)' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            Live Cold-Chain Dispatch Network
          </div>
          <h1 className="text-3xl font-black text-slate-900">
            Logistics & Intelligent Route Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time tracking of post-harvest aggregation, AI vehicle routing, and cold-chain integrity.
          </p>
        </div>

        {/* Active Order Pill if navigated from checkout */}
        {activeOrder && (
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
            <div className="font-extrabold text-emerald-900">Tracking Active Order: {activeOrder.orderId}</div>
            <div className="text-emerald-700">{activeOrder.items?.length || 1} produce batches • ₹{activeOrder.directTotal}</div>
          </div>
        )}
      </div>

      {/* USER SPECIFIED AFTER-ORDER LIFECYCLE PROGRESSION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">After Order Pipeline Progression</h3>
            <p className="text-xs text-slate-500">6-stage direct farm-to-consumer automated orchestration</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Simulate Stage:</span>
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <button
                key={s}
                onClick={() => setCurrentStep(s)}
                className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                  currentStep === s
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical / Horizontal Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative">
          {stages.map((st, idx) => {
            const isCompleted = st.step < currentStep;
            const isActive = st.step === currentStep;

            return (
              <div
                key={st.step}
                onClick={() => setCurrentStep(st.step)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-blue-50/80 border-2 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-slate-50/70 border-slate-200 opacity-65'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                      Step {st.step}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </div>

                  <h4 className={`text-xs font-black leading-tight ${isActive ? 'text-blue-950' : 'text-slate-800'}`}>
                    {st.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] font-mono text-slate-400">
                  {st.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE MAP STYLE SCREEN (Farmer A, B, C -> Optimized Route -> Buyer) */}
      <RouteOptimizationMap />

    </div>
  );
}
