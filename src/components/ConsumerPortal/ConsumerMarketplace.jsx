import React, { useState } from 'react';
import { Search, Filter, Sparkles, MapPin, SlidersHorizontal, ShieldCheck, Heart, ShoppingBag, ArrowUpDown } from 'lucide-react';
import FarmerProduceCard from './FarmerProduceCard';
import FarmerProfileModal from './FarmerProfileModal';
import CheckoutModal from './CheckoutModal';

export default function ConsumerMarketplace({ farmers, onOrderConfirmed }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxDistanceKm, setMaxDistanceKm] = useState(60);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'freshness' | 'savings' | 'price'

  const [cartItems, setCartItems] = useState([]);
  const [selectedFarmerForModal, setSelectedFarmerForModal] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const categories = ['All', 'Vegetables', 'Leafy Greens', 'Grains & Millets', 'Root Vegetables'];

  const handleAddToCart = ({ farmer, qtyKg }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.farmer.id === farmer.id);
      if (existing) {
        return prev.map((item) =>
          item.farmer.id === farmer.id ? { ...item, qtyKg: item.qtyKg + qtyKg } : item
        );
      }
      return [...prev, { farmer, qtyKg }];
    });
    setIsCartDrawerOpen(true);
  };

  const handleRemoveFromCart = (farmerId) => {
    setCartItems((prev) => prev.filter((item) => item.farmer.id !== farmerId));
  };

  // Filter & search logic
  const filteredFarmers = farmers.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.fpo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.crop.variety.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || f.crop.category === selectedCategory;

    const matchesDistance = f.distanceKm <= maxDistanceKm;
    const matchesOrganic = !onlyOrganic || f.crop.organicCertified;

    return matchesSearch && matchesCategory && matchesDistance && matchesOrganic;
  });

  // Sorting logic
  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'price') return a.crop.sellPricePerKg - b.crop.sellPricePerKg;
    if (sortBy === 'savings') {
      const saveA = a.crop.supermarketPricePerKg - a.crop.sellPricePerKg;
      const saveB = b.crop.supermarketPricePerKg - b.crop.sellPricePerKg;
      return saveB - saveA;
    }
    return 0;
  });

  const cartTotalAmount = cartItems.reduce(
    (acc, item) => acc + item.qtyKg * item.farmer.crop.sellPricePerKg,
    0
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Marketplace Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-10 shadow-lg relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Farm Sourcing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Meet the Farmers Who Feed You
          </h1>
          <p className="mt-3 text-sm sm:text-base text-emerald-100/80 leading-relaxed">
            Every listing below belongs to an actual local farmer and their FPO collective. See when the crop was harvested, where their farm is located, how much you save, and buy direct without retail middlemen.
          </p>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by farmer name, crop, FPO, or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="distance">Nearest Farm Distance (km)</option>
              <option value="savings">Highest Direct Savings (%)</option>
              <option value="price">Lowest Price (₹/kg)</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Distance Slider */}
        <div className="pt-3 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Distance & Organic Controls */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Max Distance:</span>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                className="w-24 accent-emerald-600"
              />
              <span className="text-xs font-extrabold text-emerald-800">{maxDistanceKm} km</span>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyOrganic}
                onChange={(e) => setOnlyOrganic(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Organic Certified Only
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* FARMERS CATALOG GRID */}
      {sortedFarmers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedFarmers.map((farmer) => (
            <FarmerProduceCard
              key={farmer.id}
              farmer={farmer}
              onAddToCart={handleAddToCart}
              onOpenFarmerProfile={(f) => setSelectedFarmerForModal(f)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <div className="text-4xl mb-3">🌾</div>
          <h3 className="text-lg font-bold text-slate-800">No farmers found matching these filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try expanding your max distance slider or selecting 'All' categories.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setMaxDistanceKm(80);
              setOnlyOrganic(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* FLOATING CART SUMMARY BUTTON */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce">
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="px-6 py-3.5 rounded-full bg-slate-950 text-white font-extrabold text-sm shadow-2xl border-2 border-emerald-400 flex items-center gap-3 hover:scale-105 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">
              {cartItems.length}
            </div>
            <span>Farm Cart • ₹{cartTotalAmount}</span>
          </button>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slideLeft">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-black text-slate-900 text-lg">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                  <span>Direct Farm Order ({cartItems.length})</span>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="divide-y divide-slate-100 my-4 space-y-2">
                {cartItems.map((item) => (
                  <div key={item.farmer.id} className="pt-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{item.farmer.name}</div>
                      <div className="text-slate-500">{item.farmer.crop.name} • {item.qtyKg} kg @ ₹{item.farmer.crop.sellPricePerKg}/kg</div>
                      <div className="text-emerald-700 font-medium">📍 {item.farmer.distanceKm} km • {item.farmer.estimatedDelivery}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900 text-sm">
                        ₹{item.qtyKg * item.farmer.crop.sellPricePerKg}
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.farmer.id)}
                        className="text-[11px] text-red-500 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-500 font-medium">Subtotal (Direct to Farmers):</span>
                <span className="text-xl font-black text-slate-900">₹{cartTotalAmount}</span>
              </div>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FARMER PROFILE MODAL */}
      {selectedFarmerForModal && (
        <FarmerProfileModal
          farmer={selectedFarmerForModal}
          onClose={() => setSelectedFarmerForModal(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <CheckoutModal
          items={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderPlaced={(orderData) => {
            setIsCheckoutOpen(false);
            setCartItems([]);
            onOrderConfirmed(orderData);
          }}
        />
      )}

    </div>
  );
}
