import React from 'react';
import { X, ShieldCheck, MapPin, Award, CheckCircle2, Phone, Mail, Sparkles, Heart } from 'lucide-react';

export default function FarmerProfileModal({ farmer, onClose, onAddToCart }) {
  if (!farmer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner with Farmer Photo */}
        <div className="relative h-44 bg-gradient-to-r from-emerald-800 to-teal-900 p-6 flex items-end">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="flex items-end gap-4 relative z-10 translate-y-8">
            <img
              src={farmer.photo}
              alt={farmer.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
            />
            <div className="mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                {farmer.badge}
              </span>
              <h2 className="text-2xl font-black text-white drop-shadow mt-1">{farmer.name}</h2>
              <p className="text-xs text-emerald-100 font-medium">{farmer.fpo}</p>
            </div>
          </div>
        </div>

        <div className="pt-12 p-6 sm:p-8 space-y-6">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="text-xs font-medium text-slate-500">Land Holding</div>
              <div className="text-lg font-black text-emerald-800 mt-0.5">{farmer.landAcres} Acres</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="text-xs font-medium text-slate-500">Farming Method</div>
              <div className="text-xs font-bold text-emerald-800 mt-1">{farmer.farmingType}</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="text-xs font-medium text-slate-500">Consumer Rating</div>
              <div className="text-lg font-black text-emerald-800 mt-0.5">⭐ {farmer.rating} / 5</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="text-xs font-medium text-slate-500">Distance</div>
              <div className="text-lg font-black text-emerald-800 mt-0.5">{farmer.distanceKm} km</div>
            </div>
          </div>

          {/* Verification & Farm Location */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified FPO Producer • Smart Escrow Direct Contract</span>
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
              <span><strong>Farm Address:</strong> {farmer.village}, {farmer.state}</span>
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span><strong>Direct Contact:</strong> {farmer.phone} • {farmer.email}</span>
            </div>
          </div>

          {/* Current Batch Crop Harvest Details */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>{farmer.crop.icon}</span>
              <span>Available Fresh Harvest Batch</span>
            </h4>
            
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-extrabold text-slate-900 text-base">{farmer.crop.name}</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Variety: {farmer.crop.variety} • {farmer.crop.brixSweetness}
                </div>
                <div className="text-xs text-emerald-700 font-semibold mt-1">
                  Harvested {farmer.crop.dateHarvested} • Uploaded {farmer.crop.dateUploaded}
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-emerald-700">₹{farmer.crop.sellPricePerKg}/kg</div>
                <div className="text-xs text-slate-400 line-through">Supermarket: ₹{farmer.crop.supermarketPricePerKg}/kg</div>
                <button
                  onClick={() => {
                    onAddToCart({ farmer, qtyKg: farmer.crop.minOrderKg });
                    onClose();
                  }}
                  className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Soil Health & Practices */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Sustainable Agriculture Standards</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero chemical ripening / natural sun-cured</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Drip irrigation water conservation certified</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cold-chain EV dispatched within 4 hours</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% of purchase money goes straight to farmer</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
