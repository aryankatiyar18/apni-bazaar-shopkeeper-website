import React, { useState } from 'react';
import { ArrowRight, Sparkles, Smartphone, CheckCircle2, Award, Zap } from 'lucide-react';
import { SHOP_DETAILS } from '../data/products';

export const HeroSection: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(SHOP_DETAILS.heroImageUrl);

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-4 pb-16 md:py-20 lg:py-24">
      {/* Background Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-lg shadow-amber-500/5 animate-pulse-glow">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Certified Pre-Owned & Resale Superstore</span>
            </div>

            {/* Big Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading leading-[1.15]">
              Out with the old, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                in with the gold.
              </span>
            </h1>

            {/* Tagline & Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Get the <strong className="text-amber-400 font-semibold">best resale value for your smartphone</strong> and upgrade to certified flagship iPhones, Samsung Ultra, and premium gadgets at up to <span className="text-emerald-400 font-bold">50% OFF</span> retail price.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>32-Point Quality Check</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <span>7-Day Replacement</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>Instant Cash / UPI</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all transform group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={scrollToEstimator}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-700/80 flex items-center justify-center gap-2.5 transition-all hover:border-amber-500/50 cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-amber-400" />
                <span>Check Resale Value</span>
              </button>
            </div>

            {/* Owner badge info */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 border-t border-slate-800/80 max-w-lg">
              <div>
                <span className="block text-slate-500 font-medium uppercase text-[10px]">Direct Owner Assistance</span>
                <span className="text-slate-300 font-medium">priyanshu218425@gmail.com</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="block text-slate-500 font-medium uppercase text-[10px]">WhatsApp Hotline</span>
                <span className="text-emerald-400 font-semibold">+91 7275398643</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing backframe */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-emerald-500 opacity-30 blur-xl animate-pulse" />
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/80 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.2]">
                <img
                  src={imgSrc}
                  alt="Apni Bazaar Certified Flagship Smartphones"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  onError={() => setImgSrc(SHOP_DETAILS.heroFallbackUrl)}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Floating Tag over Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg border border-amber-500/30">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Verified Pristine Flagships</p>
                      <p className="text-[11px] text-slate-300">Save up to ₹40,000 vs New Box</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-emerald-500/30 whitespace-nowrap">
                    100% Guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
