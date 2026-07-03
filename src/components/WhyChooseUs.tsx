import React from 'react';
import { ShieldCheck, Truck, RefreshCw, BadgeDollarSign, Star, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: '32-Point Quality Inspection',
      desc: 'Every smartphone goes through rigorous automated & manual diagnostics testing battery health, screen touch, cameras, and connectivity.',
      color: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    },
    {
      icon: BadgeDollarSign,
      title: 'Best Resale Price Guaranteed',
      desc: 'Whether you are buying certified devices or selling your old phone, we cut out middlemen to offer you direct wholesale pricing.',
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    },
    {
      icon: RefreshCw,
      title: '7-Day Replacement Warranty',
      desc: 'No questions asked! If you encounter any technical glitch within 7 days, we replace your smartphone immediately.',
      color: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30',
    },
    {
      icon: Truck,
      title: 'Fast & Insured Delivery across India',
      desc: 'Secure transit packaging with live tracking. Your flagship device arrives safely at your doorstep within 2 to 4 business days.',
      color: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
    },
  ];

  const testimonials = [
    {
      name: 'Rohan Sharma',
      city: 'Lucknow, UP',
      rating: 5,
      comment: 'Got my iPhone 15 Pro Max from Apni Bazaar! Battery health was literally 100% and not a single scratch on the titanium frame. Saved ₹38,000 compared to showroom box price!',
      device: 'iPhone 15 Pro Max (256GB)',
    },
    {
      name: 'Anjali Verma',
      city: 'Varanasi',
      rating: 5,
      comment: 'Sold my old iPhone 13 using their estimator tool. Priyanshu confirmed the order within 10 minutes on WhatsApp and I got UPI payment instantly on verification. Excellent service!',
      device: 'Resale Customer',
    },
    {
      name: 'Vikas Dubey',
      city: 'Delhi NCR',
      rating: 5,
      comment: 'Ordered the Samsung S24 Ultra. Was a bit skeptical about pre-owned phones first, but when I opened the box it looked 100% brand new! Highly recommend Apni Bazaar.',
      device: 'Galaxy S24 Ultra 512GB',
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-slate-900/40 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Feature Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest block mb-2">
              The Apni Bazaar Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Why 10,000+ Customers Trust Us
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              We revolutionised smartphone resale by providing transparency, genuine quality grading, and rock-solid customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between group hover:shadow-lg"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-4 ${b.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-white font-heading mb-2 group-hover:text-amber-400 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs font-bold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Verified Guarantee</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Real Stories from Verified Buyers
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Read what customers across India say about shopping at Apni Bazaar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <span className="text-[11px] text-slate-400">{t.city}</span>
                  </div>
                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {t.device}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
