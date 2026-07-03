import React, { useState } from 'react';
import { ShoppingBag, Search, PhoneCall, ShieldCheck, Sparkles, Menu, X, Smartphone, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SHOP_DETAILS } from '../data/products';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 font-semibold text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-4 h-4 animate-spin text-slate-950 shrink-0" style={{ animationDuration: '4s' }} />
            <span>🔥 <strong className="font-bold">Apni Bazaar Guarantee:</strong> {SHOP_DETAILS.tagline}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 font-bold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 100% Certified Tech
            </span>
            <span>•</span>
            <span>📧 {SHOP_DETAILS.ownerEmail}</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <RefreshCw className="w-6 h-6 text-slate-950 group-hover:rotate-180 transition-transform duration-700 font-extrabold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                  Apni <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Bazaar</span>
                </span>
                <span className="hidden sm:inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Resale Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
                Certified Pre-Owned & Premium Exchange
              </p>
            </div>
          </a>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (selectedCategory !== 'All') setSelectedCategory('All');
                }}
                placeholder="Search iPhones, Galaxy S24, OnePlus, iPads..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-full pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#products" className="hover:text-amber-400 transition-colors">
              Products
            </a>
            <a href="#estimator" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <Smartphone className="w-4 h-4 text-amber-400" />
              Sell Old Phone
            </a>
            <a href="#why-us" className="hover:text-amber-400 transition-colors">
              Why Us
            </a>
            <a
              href={`https://wa.me/${SHOP_DETAILS.whatsappNumber}?text=Hi%20Apni%20Bazaar,%20I%20want%20to%20inquire%20about%20your%20products`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              Support
            </a>
          </nav>

          {/* Actions right */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-yellow-400 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {totalCount > 0 && (
                <span className="bg-slate-950 text-amber-400 border border-amber-400/40 text-xs font-black px-2 py-0.5 rounded-full min-w-[1.5rem] text-center animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phones, wearables, accessories..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-slate-800 px-4 py-4 space-y-3 animate-fadeIn">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium"
          >
            📱 All Products
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-amber-400 font-semibold"
          >
            💰 Sell Your Old Smartphone (Value Estimator)
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-medium"
          >
            ⭐ Why Apni Bazaar?
          </a>
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1 px-3">
            <p><strong>Owner Email:</strong> {SHOP_DETAILS.ownerEmail}</p>
            <p><strong>WhatsApp:</strong> +91 {SHOP_DETAILS.rawPhone}</p>
          </div>
        </div>
      )}
    </header>
  );
};
