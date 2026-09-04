import React, { useState, useEffect } from 'react';
import { Truck, MapPin, CheckCircle2, Navigation, Thermometer, BatteryCharging, ShieldAlert, Sparkles, Play, Pause, RotateCcw } from 'lucide-react';
import { ROUTE_NODES } from '../../data/logisticsData';

export default function RouteOptimizationMap() {
  const [selectedNode, setSelectedNode] = useState(ROUTE_NODES.farmers[0]);
  const [truckProgress, setTruckProgress] = useState(45); // % along the route
  const [isPlaying, setIsPlaying] = useState(true);

  // Animated truck movement simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTruckProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            AI Multi-Farmer Clustering
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Aggregated Cold-Chain Route</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Single EV refrigerated truck aggregates produce from 3 local farms in one optimal sweep
          </p>
        </div>

        {/* Playback Controls & Live Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:text-emerald-400 transition-colors"
              title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setTruckProgress(0)}
              className="p-1 hover:text-blue-400 transition-colors"
              title="Reset Route"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Telemetry Live</span>
          </div>
        </div>
      </div>

      {/* USER PROMPT EXACT ASCII MAP REPRESENTED AS HIGH-END INTERACTIVE CANVAS */}
      <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 overflow-x-auto min-h-[360px] flex flex-col justify-center">
        
        {/* Schematic Text Header matching user prompt */}
        <div className="font-mono text-xs text-slate-400 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-emerald-400 font-bold">
            Farmer A ─┐<br />
            Farmer B ─┼── 🚚 Optimized Route ──→ Hub ──→ Buyer<br />
            Farmer C ─┘
          </div>
          <div className="text-right text-[11px] text-slate-300">
            <div>3 Pickups • 1,350 kg Consolidated Cargo</div>
            <div className="text-emerald-400 font-semibold">Zero Multiple-Trips Wastage</div>
          </div>
        </div>

        {/* SVG Dynamic Interactive Route Graphic */}
        <div className="relative w-full h-64 select-none">
          <svg className="w-full h-full" viewBox="0 0 800 240" fill="none">
            
            {/* Background Grid Lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Connecting lines from Farmer A, B, C to Junction */}
            {/* Farmer A (120, 40) -> Junction (300, 120) */}
            <path
              d="M 160 40 L 280 40 Q 300 40 300 70 L 300 120"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="6 4"
              className="animated-route-line opacity-75"
            />
            {/* Farmer B (120, 120) -> Junction (300, 120) */}
            <path
              d="M 160 120 L 300 120"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="6 4"
              className="animated-route-line opacity-75"
            />
            {/* Farmer C (120, 200) -> Junction (300, 120) */}
            <path
              d="M 160 200 L 280 200 Q 300 200 300 170 L 300 120"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="6 4"
              className="animated-route-line opacity-75"
            />

            {/* Trunk Line: Junction (300, 120) -> FPO Cold Hub (480, 120) -> Buyer Destinations (680, 70 & 680, 170) */}
            <path
              d="M 300 120 L 480 120"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              className="animated-route-line"
            />
            <path
              d="M 480 120 L 580 120 Q 600 120 600 95 L 600 70 L 680 70"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="6 4"
              className="animated-route-line"
            />
            <path
              d="M 480 120 L 580 120 Q 600 120 600 145 L 600 170 L 680 170"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="6 4"
              className="animated-route-line"
            />

            {/* Junction Node */}
            <circle cx="300" cy="120" r="6" fill="#3b82f6" className="animate-pulse" />
          </svg>

          {/* HTML Overlay Interactive Nodes for High Usability */}
          
          {/* FARMER A NODE */}
          <div
            onClick={() => setSelectedNode(ROUTE_NODES.farmers[0])}
            className="absolute left-[3%] top-[6%] cursor-pointer p-2.5 rounded-xl bg-slate-900 border-2 border-emerald-500 hover:scale-105 transition-all shadow-lg text-xs"
          >
            <div className="font-extrabold text-emerald-400 flex items-center gap-1">
              <span>🌾 Farmer A</span>
              <span className="text-[10px] bg-emerald-950 px-1.5 rounded">09:45 AM</span>
            </div>
            <div className="text-[11px] text-slate-300">Ramesh Patil</div>
            <div className="text-[10px] text-emerald-300 font-mono">🍅 450 kg Tomatoes</div>
          </div>

          {/* FARMER B NODE */}
          <div
            onClick={() => setSelectedNode(ROUTE_NODES.farmers[1])}
            className="absolute left-[3%] top-[40%] cursor-pointer p-2.5 rounded-xl bg-slate-900 border-2 border-emerald-500 hover:scale-105 transition-all shadow-lg text-xs"
          >
            <div className="font-extrabold text-emerald-400 flex items-center gap-1">
              <span>🌾 Farmer B</span>
              <span className="text-[10px] bg-emerald-950 px-1.5 rounded">10:30 AM</span>
            </div>
            <div className="text-[11px] text-slate-300">Sunita Devi</div>
            <div className="text-[10px] text-emerald-300 font-mono">🥬 320 kg Spinach</div>
          </div>

          {/* FARMER C NODE */}
          <div
            onClick={() => setSelectedNode(ROUTE_NODES.farmers[2])}
            className="absolute left-[3%] top-[72%] cursor-pointer p-2.5 rounded-xl bg-slate-900 border-2 border-emerald-500 hover:scale-105 transition-all shadow-lg text-xs"
          >
            <div className="font-extrabold text-emerald-400 flex items-center gap-1">
              <span>🌾 Farmer C</span>
              <span className="text-[10px] bg-emerald-950 px-1.5 rounded">11:15 AM</span>
            </div>
            <div className="text-[11px] text-slate-300">Baldev Patel</div>
            <div className="text-[10px] text-emerald-300 font-mono">🥕 580 kg Carrots</div>
          </div>

          {/* FPO CONSOLIDATION HUB */}
          <div
            onClick={() => setSelectedNode(ROUTE_NODES.hub)}
            className="absolute left-[45%] top-[38%] -translate-x-1/2 cursor-pointer p-3 rounded-2xl bg-slate-900 border-2 border-blue-500 hover:scale-105 transition-all shadow-xl text-center text-xs"
          >
            <div className="font-black text-blue-400 flex items-center justify-center gap-1">
              <span>🏢 FPO Cold Hub</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Pre-cooling & Weighing</div>
            <div className="text-[10px] text-blue-300 font-bold">1,350 kg Consolidated</div>
          </div>

          {/* MOVING TRUCK SIMULATOR */}
          <div
            style={{
              left: `${20 + (truckProgress * 0.65)}%`,
              top: `${42 + Math.sin(truckProgress / 5) * 6}%`
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-150"
          >
            <div className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[11px] flex items-center gap-1.5 shadow-lg shadow-blue-500/50 border border-blue-300">
              <Truck className="w-3.5 h-3.5 animate-bounce" />
              <span>EV Van • 4.2°C</span>
            </div>
          </div>

          {/* BUYER 1: CONSUMER CLUSTER */}
          <div
            className="absolute right-[2%] top-[14%] p-2.5 rounded-xl bg-slate-900 border-2 border-amber-500 text-xs shadow-lg"
          >
            <div className="font-extrabold text-amber-400">🛒 Urban Consumers</div>
            <div className="text-[11px] text-slate-300">58 Doorstep Orders</div>
            <div className="text-[10px] text-emerald-400 font-semibold">ETA: 03:30 PM</div>
          </div>

          {/* BUYER 2: BULK RESTAURANT */}
          <div
            className="absolute right-[2%] top-[60%] p-2.5 rounded-xl bg-slate-900 border-2 border-amber-500 text-xs shadow-lg"
          >
            <div className="font-extrabold text-amber-400">🍽️ Restaurant Consortium</div>
            <div className="text-[11px] text-slate-300">Bulk Kitchen Delivery</div>
            <div className="text-[10px] text-emerald-400 font-semibold">ETA: 04:15 PM</div>
          </div>

        </div>

      </div>

      {/* TELEMETRY BAR & EFFICIENCY SAVINGS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-blue-400" /> Cold-Chain Cabin
          </div>
          <div className="text-xl font-black text-blue-400 mt-1">4.2°C</div>
          <div className="text-[10px] text-slate-500">Zero wilt & zero spoilage</div>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" /> Distance Saved
          </div>
          <div className="text-xl font-black text-emerald-400 mt-1">42 km Cut</div>
          <div className="text-[10px] text-slate-500">vs 3 separate farm runs</div>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> EV Truck Battery
          </div>
          <div className="text-xl font-black text-emerald-400 mt-1">88% (180 km range)</div>
          <div className="text-[10px] text-slate-500">34.2 kg CO₂ avoided</div>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Logistics Cost Cut
          </div>
          <div className="text-xl font-black text-amber-400 mt-1">-14%</div>
          <div className="text-[10px] text-slate-500">Aggregated cluster routing</div>
        </div>
      </div>

    </div>
  );
}
