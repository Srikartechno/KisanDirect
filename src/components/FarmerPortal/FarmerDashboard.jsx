import React, { useState } from 'react';
import { Plus, TrendingUp, DollarSign, PackageCheck, Calendar, ShieldCheck, Truck, CheckCircle2, Sparkles, Store } from 'lucide-react';
import SmartCropUploadModal from './SmartCropUploadModal';
import AIDemandForecasting from './AIDemandForecasting';

export default function FarmerDashboard({ onNewCropAdded }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [listings, setListings] = useState([
    {
      id: 'list-1',
      crop: '🍅 Desi Vine Tomatoes',
      qty: '850 kg',
      cost: '₹20/kg',
      price: '₹36/kg',
      status: 'Active in Marketplace',
      views: 342,
      orders: 14,
      pickupStatus: 'EV Van Scheduled 11:30 AM'
    },
    {
      id: 'list-2',
      crop: '🥕 Sweet Carrots',
      qty: '400 kg',
      cost: '₹16/kg',
      price: '₹28/kg',
      status: 'Active in Marketplace',
      views: 189,
      orders: 8,
      pickupStatus: 'Staged in Cold Room'
    }
  ]);

  const handleCropListed = (newListingData) => {
    const newItem = {
      id: `list-${Date.now()}`,
      crop: `${newListingData.crop.icon} ${newListingData.crop.name}`,
      qty: `${newListingData.quantityKg} kg`,
      cost: `₹${newListingData.farmerCostPerKg}/kg`,
      price: `₹${newListingData.sellPricePerKg}/kg`,
      status: 'Active in Marketplace',
      views: 1,
      orders: 0,
      pickupStatus: 'Ready for AI pickup routing'
    };
    setListings([newItem, ...listings]);
    setIsUploadModalOpen(false);
    if (onNewCropAdded) onNewCropAdded(newListingData);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Farmer Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-800/40">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&auto=format&fit=crop&q=80"
              alt="Farmer Profile"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
              ✓
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-700/50 mb-1">
              <span>🌾 Sahyadri Farmers Collective • Member ID: FPO-NSK-092</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Namaste, Ramesh Patil Ji!
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Village Dindori, Nashik • Zero commission smart seller dashboard
            </p>
          </div>
        </div>

        {/* Big Action: Sell Produce */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Harvest & Get Fair Price</span>
        </button>
      </div>

      {/* 4 Simple Farmer Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">This Month's Direct Income</div>
          <div className="text-3xl font-black text-emerald-700 mt-1">₹1,42,800</div>
          <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18% higher than APMC Mandi
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Produce Listed</div>
          <div className="text-3xl font-black text-slate-900 mt-1">1,250 kg</div>
          <div className="text-xs text-slate-500 mt-1">Live in Consumer & Bulk Hub</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cold-Chain Pickups Today</div>
          <div className="text-3xl font-black text-blue-700 mt-1">2 Dispatches</div>
          <div className="text-xs font-semibold text-blue-600 mt-1 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> Next EV Van @ 11:30 AM
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instant Payout Status</div>
          <div className="text-3xl font-black text-amber-600 mt-1">100% Escrow</div>
          <div className="text-xs text-amber-700 font-medium mt-1">Direct Bank / UPI Released upon OTP</div>
        </div>

      </div>

      {/* AI DEMAND FORECASTING (User Requested Feature) */}
      <AIDemandForecasting onQuickListCrop={() => setIsUploadModalOpen(true)} />

      {/* ACTIVE CROP LISTINGS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900">Your Harvest Listings</h3>
            <p className="text-xs text-slate-500">Live prices guaranteed by KisanDirect AI algorithm</p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            + Add Another Batch
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-3">Harvested Crop</th>
                <th className="pb-3">Available Quantity</th>
                <th className="pb-3">Your Cost (Input)</th>
                <th className="pb-3">Selling Price (AI)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Cold Chain Pickup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 font-black text-slate-900 text-sm">{item.crop}</td>
                  <td className="py-4 font-bold text-slate-700">{item.qty}</td>
                  <td className="py-4 text-slate-500 font-medium">{item.cost}</td>
                  <td className="py-4">
                    <span className="font-extrabold text-emerald-700 text-sm bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      {item.price}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                      <Truck className="w-3.5 h-3.5" />
                      <span>{item.pickupStatus}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {isUploadModalOpen && (
        <SmartCropUploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onCropListed={handleCropListed}
        />
      )}

    </div>
  );
}
