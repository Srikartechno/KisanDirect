import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Truck, Calendar, Clock, Award, ShieldCheck, ChevronRight, ShoppingCart, Info, TrendingDown } from 'lucide-react';

export default function FarmerProduceCard({ farmer, onAddToCart, onOpenFarmerProfile }) {
  const [orderQty, setOrderQty] = useState(farmer.crop.minOrderKg || 5);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);

  const directPriceTotal = orderQty * farmer.crop.sellPricePerKg;
  const supermarketPriceTotal = orderQty * farmer.crop.supermarketPricePerKg;
  const totalSavings = supermarketPriceTotal - directPriceTotal;
  const savingsPct = Math.round(((farmer.crop.supermarketPricePerKg - farmer.crop.sellPricePerKg) / farmer.crop.supermarketPricePerKg) * 100);

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(farmer.phone);
    setIsCopiedPhone(true);
    setTimeout(() => setIsCopiedPhone(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-500/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      
      {/* 1. TOP HEADER: FARMER & FPO PROFILE */}
      <div className="p-6 pb-4 bg-gradient-to-r from-emerald-50/60 via-slate-50/40 to-amber-50/30 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          
          {/* Farmer Photo & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={farmer.photo}
                alt={farmer.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {farmer.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {farmer.badge}
                </span>
              </div>
              
              <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1 mt-0.5">
                <span>🌾 {farmer.fpo}</span>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                <span>⭐ <strong className="text-slate-800">{farmer.rating}</strong> ({farmer.reviewsCount} reviews)</span>
                <span>•</span>
                <span>{farmer.landAcres} Acres Farm</span>
              </div>
            </div>
          </div>

          {/* Direct Contact Button Pills */}
          <div className="flex flex-col gap-1.5 items-end">
            <a
              href={`tel:${farmer.phone}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Farmer</span>
            </a>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyPhone();
              }}
              className="text-[11px] text-slate-500 hover:text-emerald-700 font-medium"
            >
              {isCopiedPhone ? '✓ Number Copied!' : farmer.phone}
            </button>
          </div>
        </div>
      </div>

      {/* 2. BESIDE THE FARMER: HARVESTED CROP & HARVEST DETAILS */}
      <div className="p-6 py-4 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          {/* Crop Image & Title */}
          <div className="sm:col-span-4 relative rounded-2xl overflow-hidden group/img aspect-square max-h-36">
            <img
              src={farmer.crop.image}
              alt={farmer.crop.name}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
              <span>{farmer.crop.icon}</span>
              <span>{farmer.crop.variety}</span>
            </div>
            {farmer.crop.organicCertified && (
              <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Organic Certified
              </div>
            )}
          </div>

          {/* Crop specifics, Dates & Distance */}
          <div className="sm:col-span-8 flex flex-col justify-between space-y-2">
            <div>
              <div className="text-xs uppercase font-bold text-emerald-700 tracking-wider">
                Harvested Crop
              </div>
              <h4 className="text-xl font-black text-slate-900 leading-tight">
                {farmer.crop.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Batch Quality: <span className="font-semibold text-slate-700">{farmer.crop.variety}</span> • {farmer.crop.availableQtyKg} kg in stock
              </p>
            </div>

            {/* Crucial Metadata: Date Produced, Date Uploaded, Location, Distance */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Harvested: <strong className="text-slate-900">{farmer.crop.dateHarvested}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Uploaded: <strong className="text-slate-900">{farmer.crop.dateUploaded}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                <span className="truncate" title={farmer.village}>📍 {farmer.village}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                <span className="text-emerald-700 font-extrabold">{farmer.distanceKm} km away</span>
              </div>
            </div>

            {/* Delivery Timeline Pill */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                <span>Delivery: <strong>{farmer.estimatedDelivery}</strong></span>
              </div>
              <span className="text-[11px] text-slate-400">({farmer.deliveryMode})</span>
            </div>
          </div>
        </div>

        {/* 3. PROMINENT PRICE COMPARISON WIDGET */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 border border-emerald-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              📊 Transparent Price Comparison
            </span>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Save {savingsPct}%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Direct Farmer Price */}
            <div className="bg-white p-2.5 rounded-xl border-2 border-emerald-500 shadow-sm">
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">Direct Farm Price</div>
              <div className="text-xl font-black text-emerald-700 mt-0.5">₹{farmer.crop.sellPricePerKg} <span className="text-xs font-medium text-slate-500">/kg</span></div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% to Farmer</div>
            </div>

            {/* Supermarket Retail Price */}
            <div className="bg-slate-100/80 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Supermarket / Retail</div>
              <div className="text-base font-bold text-slate-400 line-through mt-1">₹{farmer.crop.supermarketPricePerKg} /kg</div>
              <div className="text-[10px] text-red-500 font-medium mt-0.5">+5 Middlemen cuts</div>
            </div>

            {/* Your Direct Savings */}
            <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">You Save Per Kg</div>
              <div className="text-lg font-black text-amber-600 mt-0.5">₹{farmer.crop.supermarketPricePerKg - farmer.crop.sellPricePerKg}</div>
              <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Instant discount</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ACTION & ORDER BAR */}
      <div className="p-6 pt-3 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        
        {/* Quantity Stepper */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Qty (kg):</span>
          <div className="inline-flex items-center rounded-xl bg-white border border-slate-200 p-1 shadow-sm">
            <button
              onClick={() => setOrderQty((q) => Math.max(farmer.crop.minOrderKg || 1, q - 2))}
              className="w-7 h-7 rounded-lg hover:bg-slate-100 font-bold text-slate-700 text-sm flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="w-10 text-center font-extrabold text-sm text-slate-900">{orderQty}</span>
            <button
              onClick={() => setOrderQty((q) => Math.min(farmer.crop.availableQtyKg, q + 2))}
              className="w-7 h-7 rounded-lg hover:bg-slate-100 font-bold text-slate-700 text-sm flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-xs font-black text-emerald-800 ml-1">Total: ₹{directPriceTotal}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenFarmerProfile(farmer)}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-700 hover:bg-white transition-all flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => onAddToCart({ farmer, qtyKg: orderQty })}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Order from Farmer</span>
          </button>
        </div>

      </div>
    </div>
  );
}
