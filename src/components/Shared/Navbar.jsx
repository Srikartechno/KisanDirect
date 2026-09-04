import React, { useState } from 'react';
import { Leaf, ShoppingCart, User, Truck, BarChart3, Building2, Globe, Bell, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, onSelectTab, cartCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const navLinks = [
    { id: 'home', label: 'Home & Mission', icon: '🏡' },
    { id: 'consumer', label: 'Consumer Portal', icon: '🛒', highlight: true },
    { id: 'farmer', label: 'Farmer Portal', icon: '👨‍🌾', badge: 'AI Price' },
    { id: 'forecast', label: 'AI Demand Forecast', icon: '📈' },
    { id: 'bulk', label: 'Bulk Buyer Hub', icon: '🏢' },
    { id: 'logistics', label: 'Logistics Route', icon: '🚚' },
    { id: 'impact', label: 'Impact Dashboard', icon: '📊' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div
            onClick={() => onSelectTab('home')}
            className="cursor-pointer flex items-center gap-2.5 group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">Kisan<span className="text-emerald-600">Direct</span></span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  2-STAGE
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 -mt-0.5">Farm Gate to Consumer & Bulk Network</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && activeTab !== tab.id && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Tools: Language, Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="EN">English</option>
                <option value="HI">हिन्दी (Hindi)</option>
                <option value="MR">मराठी (Marathi)</option>
                <option value="TE">తెలుగు (Telugu)</option>
              </select>
            </div>

            {/* Direct Consumer Shopping Cart */}
            <button
              onClick={() => onSelectTab('consumer')}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="View Produce Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onSelectTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              {tab.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
