import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { SHOP_DETAILS } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const text = encodeURIComponent('Hi Apni Bazaar! I visited your website and want to ask about pre-owned smartphones and exchange deals.');
    window.open(`https://wa.me/${SHOP_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-3 shadow-2xl max-w-xs flex items-start gap-2.5 animate-fadeIn mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 animate-ping shrink-0" />
          <div className="text-xs text-slate-200">
            <div className="font-bold text-emerald-400 flex items-center justify-between">
              <span>Chat with Apni Bazaar</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              Have questions or want instant resale cash? Priyanshu is online now!
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group relative"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp (+91 7275398643)"
      >
        <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 rounded-full p-1 border-2 border-slate-950 animate-pulse">
          <Sparkles className="w-3 h-3" />
        </span>
        <MessageCircle className="w-8 h-8 fill-slate-950 text-emerald-500 transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
};
