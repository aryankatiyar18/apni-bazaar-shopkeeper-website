import React from 'react';
import { Mail, Phone, MapPin, RefreshCw, Heart, ShieldCheck } from 'lucide-react';
import { SHOP_DETAILS } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Shop Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <RefreshCw className="w-5 h-5 text-slate-950 font-black" />
              </div>
              <span className="text-2xl font-black text-white font-heading">
                Apni <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Bazaar</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 italic max-w-sm leading-relaxed">
              "{SHOP_DETAILS.tagline}"
            </p>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              India's premier certified pre-owned smartphone and electronics superstore. Every device passes a rigorous 32-point inspection backed by a 7-day replacement guarantee.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                ⚡ Instant Cash Payouts
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-heading">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  📱 Browse All Smartphones
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-400 transition-colors">
                  💰 Sell Your Old Phone (Estimator)
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-400 transition-colors">
                  ⭐ 32-Point Quality Guarantee
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SHOP_DETAILS.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  💬 Chat with Priyanshu on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-heading">
              Store Owner & Support
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Owner Email</span>
                  <a href={`mailto:${SHOP_DETAILS.ownerEmail}`} className="text-white font-bold truncate hover:text-amber-400 transition-colors block">
                    {SHOP_DETAILS.ownerEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Direct WhatsApp Hotline</span>
                  <a href={`https://wa.me/${SHOP_DETAILS.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline block">
                    +91 {SHOP_DETAILS.rawPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-400 px-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Operating across India • Free Express Shipping</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Apni Bazaar. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for tech lovers & smart upgraders.
          </p>
        </div>
      </div>
    </footer>
  );
};
