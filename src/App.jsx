import React, { useState } from 'react';
import Navbar from './components/Shared/Navbar';
import HeroSection from './components/Home/HeroSection';
import SupplyChainComparison from './components/Home/SupplyChainComparison';
import ImpactSnapshot from './components/Home/ImpactSnapshot';
import SystemArchitectureMap from './components/Home/SystemArchitectureMap';
import ConsumerMarketplace from './components/ConsumerPortal/ConsumerMarketplace';
import FarmerDashboard from './components/FarmerPortal/FarmerDashboard';
import AIDemandForecasting from './components/FarmerPortal/AIDemandForecasting';
import BulkBuyerHub from './components/BulkBuyerPortal/BulkBuyerHub';
import LogisticsTracker from './components/LogisticsPortal/LogisticsTracker';
import FullImpactDashboard from './components/ImpactDashboard/FullImpactDashboard';
import SmartCropUploadModal from './components/FarmerPortal/SmartCropUploadModal';
import { INITIAL_FARMERS } from './data/mockData';
import { ShieldCheck, Heart, Leaf, PhoneCall, Sparkles, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'consumer' | 'farmer' | 'forecast' | 'bulk' | 'logistics' | 'impact'
  const [farmers, setFarmers] = useState(INITIAL_FARMERS);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isStandaloneUploadOpen, setIsStandaloneUploadOpen] = useState(false);

  // When a consumer places an order, seamlessly transport to the Logistics route tracker
  const handleOrderConfirmed = (orderData) => {
    setActiveOrder(orderData);
    setActiveTab('logistics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a farmer uploads a new crop, add to the marketplace
  const handleNewCropListed = (listingData) => {
    const newFarmerEntry = {
      id: `farmer-${Date.now()}`,
      name: 'Ramesh Patil',
      photo: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&auto=format&fit=crop&q=80',
      fpo: 'Sahyadri Farmers Producer Co.',
      phone: '+91 98234 11029',
      email: 'ramesh.patil@sahyadrifpo.in',
      village: listingData.villageLocation || 'Village Dindori, Nashik',
      state: 'Maharashtra',
      distanceKm: 24,
      rating: 5.0,
      reviewsCount: 1,
      badge: 'Fresh Batch Added',
      farmingType: 'ZBNF Natural Farming',
      landAcres: 4.5,
      crop: {
        id: `crop-${Date.now()}`,
        name: listingData.crop.name,
        variety: 'A-Grade Fresh Picked',
        category: 'Vegetables',
        icon: listingData.crop.icon,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        availableQtyKg: Number(listingData.quantityKg),
        minOrderKg: 5,
        sellPricePerKg: listingData.sellPricePerKg,
        supermarketPricePerKg: Math.round(listingData.sellPricePerKg * 1.55),
        mandiPricePerKg: Math.round(listingData.sellPricePerKg * 0.7),
        dateHarvested: listingData.harvestDate,
        dateUploaded: 'Just now',
        shelfLifeDays: 7,
        brixSweetness: 'Fresh Harvest',
        organicCertified: true
      },
      estimatedDelivery: 'Today by 5:30 PM',
      deliveryMode: 'Refrigerated EV Van (4°C)'
    };

    setFarmers([newFarmerEntry, ...farmers]);
    setIsStandaloneUploadOpen(false);
    setActiveTab('consumer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fbf9] text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Dynamic Portal Area */}
      <main className="flex-1">
        
        {/* 1. HOME & MISSION */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Hero Section */}
            <HeroSection
              onExploreMarketplace={() => {
                setActiveTab('consumer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreFarmer={() => {
                setActiveTab('farmer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreLogistics={() => {
                setActiveTab('logistics');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2-Stage vs 5-Stage Supply Chain Comparison */}
            <SupplyChainComparison
              onExploreMarketplace={() => {
                setActiveTab('consumer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreFarmer={() => {
                setActiveTab('farmer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Impact Dashboard Live Month Metrics Snapshot */}
            <ImpactSnapshot
              onNavigateToFullImpact={() => {
                setActiveTab('impact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Visual System Architecture Diagram (matching user's uploaded chart) */}
            <SystemArchitectureMap
              onSelectTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* 2. CONSUMER PORTAL (Farmer-First Produce Catalog) */}
        {activeTab === 'consumer' && (
          <div className="animate-fadeIn">
            <ConsumerMarketplace
              farmers={farmers}
              onOrderConfirmed={handleOrderConfirmed}
            />
          </div>
        )}

        {/* 3. FARMER PORTAL (Smart Selling & Jargon-Free Dashboard) */}
        {activeTab === 'farmer' && (
          <div className="animate-fadeIn">
            <FarmerDashboard onNewCropAdded={handleNewCropListed} />
          </div>
        )}

        {/* 4. AI DEMAND FORECASTING (Dedicated View for Farmers) */}
        {activeTab === 'forecast' && (
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <AIDemandForecasting
              onQuickListCrop={() => {
                setIsStandaloneUploadOpen(true);
              }}
            />
          </div>
        )}

        {/* 5. BULK BUYER HUB (Institutional Sourcing & AI Cluster Match) */}
        {activeTab === 'bulk' && (
          <div className="animate-fadeIn">
            <BulkBuyerHub
              onOrderMatched={(matchData) => {
                setActiveOrder({
                  orderId: `BLK-${Math.floor(100000 + Math.random() * 900000)}`,
                  items: [{ farmer: { name: matchData.matchedFPO }, qtyKg: 5000 }],
                  directTotal: 5000 * matchData.quotedPricePerKg
                });
                setActiveTab('logistics');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* 6. LOGISTICS & MULTI-FARMER ROUTE OPTIMIZATION PORTAL */}
        {activeTab === 'logistics' && (
          <div className="animate-fadeIn">
            <LogisticsTracker activeOrder={activeOrder} />
          </div>
        )}

        {/* 7. FULL IMPACT DASHBOARD */}
        {activeTab === 'impact' && (
          <div className="animate-fadeIn">
            <FullImpactDashboard />
          </div>
        )}

      </main>

      {/* Standalone Crop Upload Modal triggered from Forecasting tab */}
      {isStandaloneUploadOpen && (
        <SmartCropUploadModal
          onClose={() => setIsStandaloneUploadOpen(false)}
          onCropListed={handleNewCropListed}
        />
      )}

      {/* Global Agritech Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl">
              🌾
            </div>
            <div>
              <div className="font-extrabold text-white text-sm">KisanDirect Network</div>
              <p className="text-slate-500">2-Stage Transparent Agritech Infrastructure</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400">Home</button>
            <button onClick={() => setActiveTab('consumer')} className="hover:text-emerald-400">Consumer Marketplace</button>
            <button onClick={() => setActiveTab('farmer')} className="hover:text-emerald-400">Farmer Selling Portal</button>
            <button onClick={() => setActiveTab('forecast')} className="hover:text-emerald-400">AI Demand Forecast</button>
            <button onClick={() => setActiveTab('logistics')} className="hover:text-emerald-400">AI Route Logistics</button>
            <button onClick={() => setActiveTab('impact')} className="hover:text-emerald-400">Impact Dashboard</button>
          </div>

          <div className="text-right">
            <span className="text-emerald-400 font-bold flex items-center justify-end gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Direct Farmer Compensation
            </span>
            <div className="text-slate-600 mt-0.5">Empowering Indian Farmers & FPOs</div>
          </div>

        </div>
      </footer>

    </div>
  );
}
