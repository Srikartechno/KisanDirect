import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, ArrowRight, Sparkles, CreditCard, Wallet, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ items, onClose, onOrderPlaced }) {
  const [address, setAddress] = useState('Flat 402, Green Meadows, Model Colony, Pune');
  const [deliverySlot, setDeliverySlot] = useState('today-evening');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const directSubtotal = items.reduce((acc, item) => acc + (item.qtyKg * item.farmer.crop.sellPricePerKg), 0);
  const retailSubtotal = items.reduce((acc, item) => acc + (item.qtyKg * item.farmer.crop.supermarketPricePerKg), 0);
  const deliveryFee = 25;
  const directTotal = directSubtotal + deliveryFee;
  const netSavings = retailSubtotal - directSubtotal;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }, 1200);
  };

  const handleTrackInLogistics = () => {
    onOrderPlaced({
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items,
      directTotal,
      netSavings,
      deliverySlot,
      address
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

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
                🛒
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Confirm Direct Farmer Order</h3>
                <p className="text-xs text-slate-500">Produce will be harvested and picked up directly from farm gates</p>
              </div>
            </div>

            {/* Produce Order Items */}
            <div className="space-y-2 mb-6 max-h-48 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.farmer.photo}
                      alt={item.farmer.name}
                      className="w-10 h-10 rounded-xl object-cover border border-emerald-400"
                    />
                    <div>
                      <div className="font-extrabold text-slate-800 text-sm">
                        {item.farmer.name} • {item.farmer.crop.icon} {item.farmer.crop.name}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {item.qtyKg} kg @ ₹{item.farmer.crop.sellPricePerKg}/kg • 📍 {item.farmer.distanceKm} km away
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-black text-slate-900 text-sm">
                    ₹{item.qtyKg * item.farmer.crop.sellPricePerKg}
                  </div>
                </div>
              ))}
            </div>

            {/* Savings Callout */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-900">Your Direct-from-Farm Savings:</span>
              </div>
              <span className="text-sm font-black text-emerald-700">₹{netSavings} Saved vs Retail</span>
            </div>

            {/* Delivery Address */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Delivery Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Delivery Slot */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-600" /> Choose Cold-Chain Delivery Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliverySlot('today-evening')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    deliverySlot === 'today-evening'
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <div>Today Evening (05:00 - 08:00 PM)</div>
                  <div className="text-[10px] font-normal text-slate-500">Same-Day Farm Fresh</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliverySlot('tomorrow-morning')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    deliverySlot === 'tomorrow-morning'
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <div>Tomorrow Morning (07:00 - 10:00 AM)</div>
                  <div className="text-[10px] font-normal text-slate-500">Dawn Harvested Batch</div>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Payment Method (Escrow Secured)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Wallet className="w-4 h-4 text-emerald-600" />
                  <span>Instant UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Credit / Debit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <span>💵</span>
                  <span>Pay on Delivery</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Payment is held in digital escrow and transferred to the farmer upon delivery verification.
              </p>
            </div>

            {/* Price Total Summary */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Total Payable Amount:</span>
                <div className="text-2xl font-black text-slate-900">₹{directTotal}</div>
              </div>
              
              <button
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
              >
                {isProcessing ? 'Connecting to FPO Hub...' : 'Place Direct Order'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Order Placed Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-sm">
              ✓
            </div>
            
            <h3 className="text-2xl font-black text-slate-900">
              Order Confirmed & Staged!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your request has been routed to the FPO cold-chain hub. AI route optimization has clustered this pickup with nearby farmers.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Number:</span>
                <span className="font-mono font-bold text-slate-900">KD-89241</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Farmer Dispatched:</span>
                <span className="font-bold text-emerald-700">{items[0]?.farmer?.name || 'Local Farmers'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Net You Saved:</span>
                <span className="font-bold text-emerald-600">₹{netSavings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cold Chain Route:</span>
                <span className="font-bold text-blue-600">AI Route Active</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleTrackInLogistics}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Live on AI Route Map</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
