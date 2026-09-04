import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, TrendingUp, ShieldCheck, DollarSign, Calculator, HelpCircle } from 'lucide-react';
import { CROP_OPTIONS } from '../../data/mockData';
import { calculateRecommendedPrice } from '../../data/aiPricingEngine';

export default function SmartCropUploadModal({ onClose, onCropListed }) {
  const [step, setStep] = useState(1); // 1: Crop, 2: Quantity, 3: Expenses/Cost, 4: Harvest Date, 5: AI Recommendation
  
  // Form answers
  const [selectedCrop, setSelectedCrop] = useState(CROP_OPTIONS[0]);
  const [quantityKg, setQuantityKg] = useState(650);
  
  // Step 3: Expenses spent by farmer
  const [seedsCost, setSeedsCost] = useState(3000);
  const [fertilizerCost, setFertilizerCost] = useState(4500);
  const [laborCost, setLaborCost] = useState(4000);
  const [waterCost, setWaterCost] = useState(2500);
  
  const [harvestDate, setHarvestDate] = useState('Today morning, 06:00 AM');
  const [villageLocation, setVillageLocation] = useState('Village Dindori, Nashik');

  // Computed total cost
  const totalExpenses = Number(seedsCost) + Number(fertilizerCost) + Number(laborCost) + Number(waterCost);
  const costPerKg = (totalExpenses / (Number(quantityKg) || 1)).toFixed(1);

  // AI Recommended calculation
  const recommendation = calculateRecommendedPrice({
    cropId: selectedCrop.id,
    quantityKg: Number(quantityKg),
    costOfCultivationPerKg: costPerKg,
    harvestDate,
    location: villageLocation
  });

  const handleNext = () => {
    if (step < 5) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleFinalList = () => {
    onCropListed({
      crop: selectedCrop,
      quantityKg,
      farmerCostPerKg: costPerKg,
      sellPricePerKg: recommendation.minPrice,
      recommendedRange: recommendation.suggestedPriceDisplay,
      harvestDate,
      villageLocation
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Simple Farmer Selling Wizard
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {step === 1 && "Question 1: What crop did you grow?"}
            {step === 2 && "Question 2: How much quantity is ready?"}
            {step === 3 && "Question 3: How much money did you spend?"}
            {step === 4 && "Question 4: When was it harvested?"}
            {step === 5 && "Smart Fair Price Recommendation"}
          </h2>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: CROP SELECTOR */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 font-medium">
              Select the crop you want to list directly for buyers:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CROP_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCrop(c)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    selectedCrop.id === c.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm scale-105'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <span className="text-4xl">{c.icon}</span>
                  <span className="text-xs font-extrabold">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: QUANTITY READY */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
              <span className="text-4xl">{selectedCrop.icon}</span>
              <div>
                <div className="text-sm font-bold text-slate-900">{selectedCrop.name}</div>
                <div className="text-xs text-emerald-700">Enter total available quantity ready for pickup</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Available Harvest Quantity (Kilograms)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="50"
                  max="10000"
                  step="50"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-lg font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-sm font-bold text-slate-600 whitespace-nowrap">kg ({Math.round(quantityKg / 100)} Quintals)</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Quick Pick:</span>
              {[200, 500, 850, 1500, 2500].map((qty) => (
                <button
                  key={qty}
                  onClick={() => setQuantityKg(qty)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  {qty} kg
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: COST / EXPENSES SPENT */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900">
              💡 <strong>Why we ask this:</strong> We use your actual expenses so our AI guarantees a <strong>minimum 35%+ fair profit</strong> above your hard work, protecting you from distress selling.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">🌱 Seeds & Saplings (₹)</label>
                <input
                  type="number"
                  value={seedsCost}
                  onChange={(e) => setSeedsCost(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">🧪 Fertilizer & Compost (₹)</label>
                <input
                  type="number"
                  value={fertilizerCost}
                  onChange={(e) => setFertilizerCost(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">👨‍🌾 Field Labor & Harvesting (₹)</label>
                <input
                  type="number"
                  value={laborCost}
                  onChange={(e) => setLaborCost(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">💧 Irrigation & Power (₹)</label>
                <input
                  type="number"
                  value={waterCost}
                  onChange={(e) => setWaterCost(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Total Cultivation Expense:</span>
              <span className="font-extrabold text-slate-900">₹{totalExpenses} (approx ₹{costPerKg}/kg)</span>
            </div>
          </div>
        )}

        {/* STEP 4: HARVEST DATE & LOCATION */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">When was this crop harvested?</label>
              <div className="space-y-2">
                {[
                  'Today morning, 06:00 AM (Ultra Fresh)',
                  'Yesterday morning (Pre-cooled in shed)',
                  'Harvesting tomorrow at dawn (Advance listing)'
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setHarvestDate(opt)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      harvestDate === opt
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Farm / Village Pickup Point</label>
              <input
                type="text"
                value={villageLocation}
                onChange={(e) => setVillageLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
              />
              <p className="text-[11px] text-slate-400 mt-1">Our cold-chain EV route aggregates directly from your farm gate.</p>
            </div>
          </div>
        )}

        {/* STEP 5: AI FAIR PRICE RECOMMENDATION ENGINE DISPLAY */}
        {step === 5 && (
          <div className="space-y-5">
            
            {/* Main AI Price Recommendation Highlight */}
            <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Zero Distress Selling
              </div>
              
              <div className="text-xs font-bold text-emerald-100 uppercase tracking-widest">
                Our System Calculates For You:
              </div>
              
              <div className="text-4xl sm:text-5xl font-black mt-2 tracking-tight">
                {recommendation.suggestedPriceDisplay}
              </div>
              
              <div className="text-xs font-medium text-emerald-100 mt-2 flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Guaranteed Fair Profit: <strong>+{recommendation.farmerProfitMargin}%</strong> above your cost (₹{costPerKg}/kg)</span>
              </div>
            </div>

            {/* Transparent Factor Breakdown */}
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Price Computed Based On 6 Real-Time Factors:
              </div>
              <div className="space-y-2">
                {recommendation.factors.map((f, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-extrabold text-slate-800">{f.factor}</span>
                      <p className="text-[11px] text-slate-500">{f.detail}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-emerald-700">{f.impact}</span>
                      <div className="text-[10px] text-slate-400">{f.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison with Retail */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <span>Supermarkets will sell this at: <strong>₹{recommendation.estimatedRetailPrice}/kg</strong></span>
              <span className="font-bold text-emerald-700">Consumers still save {recommendation.consumerSavingsPct}%!</span>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BUTTONS */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm flex items-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinalList}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>List Crop at ₹{recommendation.minPrice}/kg</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
