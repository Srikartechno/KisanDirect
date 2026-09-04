import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Truck, Sparkles, Sprout, ShoppingCart } from 'lucide-react';
import { IMPACT_METRICS } from '../../data/mockData';

export default function ImpactSnapshot({ onNavigateToFullImpact }) {
  const cards = [
    {
      id: 'farmer-earnings',
      title: 'Farmer earnings',
      icon: '👨‍🌾',
      lucideIcon: TrendingUp,
      value: IMPACT_METRICS.farmerEarnings,
      badge: 'Positive Growth',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      subtext: IMPACT_METRICS.farmerEarningsSubtext,
      barWidth: '82%',
      barColor: 'bg-emerald-500'
    },
    {
      id: 'intermediary-cost',
      title: 'Intermediary cost',
      icon: '💰',
      lucideIcon: TrendingDown,
      value: IMPACT_METRICS.intermediaryCost,
      badge: 'Big Reduction',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      subtext: IMPACT_METRICS.intermediaryCostSubtext,
      barWidth: '77%',
      barColor: 'bg-emerald-600'
    },
    {
      id: 'logistics-cost',
      title: 'Logistics cost',
      icon: '🚚',
      lucideIcon: TrendingDown,
      value: IMPACT_METRICS.logisticsCost,
      badge: 'AI Route Efficiency',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      subtext: IMPACT_METRICS.logisticsCostSubtext,
      barWidth: '86%',
      barColor: 'bg-blue-500'
    },
    {
      id: 'food-wastage',
      title: 'Food wastage',
      icon: '🥬',
      lucideIcon: TrendingDown,
      value: IMPACT_METRICS.foodWastage,
      badge: 'Farm-Gate Fresh',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      subtext: IMPACT_METRICS.foodWastageSubtext,
      barWidth: '88%',
      barColor: 'bg-teal-500'
    },
    {
      id: 'consumer-savings',
      title: 'Consumer savings',
      icon: '🛒',
      lucideIcon: TrendingUp,
      value: `${IMPACT_METRICS.consumerSavings}`,
      badge: 'Direct Value',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      subtext: IMPACT_METRICS.consumerSavingsSubtext,
      barWidth: '70%',
      barColor: 'bg-amber-500'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm my-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Verified Platform Results
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Impact Dashboard
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Measurable positive change delivered to farmers, consumers, and food systems.
          </p>
        </div>

        {/* Highlighted THIS MONTH Badge */}
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="bg-slate-900 text-emerald-400 px-4 py-2 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase flex items-center gap-2 shadow-sm border border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            THIS MONTH
          </div>
          {onNavigateToFullImpact && (
            <button
              onClick={onNavigateToFullImpact}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
            >
              View Full Analytics →
            </button>
          )}
        </div>
      </div>

      {/* 5 Prominent User Requested Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map((card) => {
          const IconComponent = card.lucideIcon;
          return (
            <div
              key={card.id}
              className={`p-5 rounded-2xl bg-white border ${card.borderColor} shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100">{card.icon}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${card.bgColor} ${card.textColor} flex items-center gap-1`}>
                    <IconComponent className="w-3 h-3" />
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-600">{card.title}</h3>
                <div className={`text-3xl sm:text-4xl font-black mt-2 tracking-tight ${card.textColor}`}>
                  {card.value}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-2">
                  <div className={`h-full rounded-full ${card.barColor}`} style={{ width: card.barWidth }} />
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{card.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
