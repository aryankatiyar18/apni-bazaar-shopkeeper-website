import React, { useState } from 'react';
import { Sparkles, RefreshCw, Check, MessageSquare } from 'lucide-react';
import { ESTIMATOR_MODELS, SHOP_DETAILS } from '../data/products';
import { useCart } from '../context/CartContext';

export const ResaleEstimator: React.FC = () => {
  const { addToast } = useCart();
  const [selectedModel, setSelectedModel] = useState(ESTIMATOR_MODELS[0].name);
  const [condition, setCondition] = useState<'flawless' | 'good' | 'fair'>('flawless');
  const [storage, setStorage] = useState<'128GB' | '256GB' | '512GB+'>('256GB');

  const modelObj = ESTIMATOR_MODELS.find((m) => m.name === selectedModel) || ESTIMATOR_MODELS[0];
  
  let conditionMultiplier = 1.0;
  if (condition === 'good') conditionMultiplier = 0.85;
  if (condition === 'fair') conditionMultiplier = 0.65;

  let storageBonus = 0;
  if (storage === '256GB') storageBonus = 4000;
  if (storage === '512GB+') storageBonus = 8500;

  const estimatedValue = Math.round((modelObj.baseValue + storageBonus) * conditionMultiplier);

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hi Apni Bazaar! I want to sell/exchange my old phone:\n📱 Model: ${selectedModel}\n💾 Storage: ${storage}\n✨ Condition: ${condition.toUpperCase()}\n💵 Estimated Value: ₹${estimatedValue.toLocaleString()}\n\nPlease tell me how to get instant cash/exchange!`
    );
    window.open(`https://wa.me/${SHOP_DETAILS.whatsappNumber}?text=${text}`, '_blank');
    addToast('Opening WhatsApp with your instant trade-in summary!');
  };

  return (
    <section id="estimator" className="py-16 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative glowing badge */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Header & Instructions */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                Instant Resale Estimator
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                Out with the old, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                  in with the gold!
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Want to upgrade? Calculate the instant exchange or resale cash value of your existing smartphone right now. We pay the highest market rates in India!
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free doorstep pickup & data sanitization</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant UPI or Cash transfer on verification</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Extra ₹2,000 Exchange Bonus when buying any Apni Bazaar phone</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Calculator Box */}
            <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Select Model */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    1. Select Your Device
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    {ESTIMATOR_MODELS.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.brand} {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Storage */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    2. Storage Capacity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['128GB', '256GB', '512GB+'] as const).map((cap) => (
                      <button
                        key={cap}
                        type="button"
                        onClick={() => setStorage(cap)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          storage === cap
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Condition selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  3. Select Device Condition
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'flawless', label: 'Flawless A+', desc: 'Scratchless screen & body' },
                    { id: 'good', label: 'Good Grade', desc: 'Minor signs of wear' },
                    { id: 'fair', label: 'Fair / Working', desc: 'Heavy scratches or minor crack' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCondition(c.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        condition === c.id
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-white flex items-center justify-between">
                        <span>{c.label}</span>
                        {condition === c.id && <Sparkles className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Quote Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Estimated Resale Value
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 font-heading">
                    ₹{estimatedValue.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    + Free Exchange Bonus Eligible
                  </span>
                </div>

                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Claim Cash / Exchange Quote</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
