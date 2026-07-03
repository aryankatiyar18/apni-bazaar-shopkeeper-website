import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Smartphone, Laptop, Headphones, Watch, Layers } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onQuickView: (product: Product) => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  onQuickView,
  searchQuery,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'discount'>('featured');

  const categories = [
    { id: 'All', label: 'All Collection', icon: Layers },
    { id: 'Flagship Phones', label: 'Flagship Phones', icon: Smartphone },
    { id: '5G Smartphones', label: '5G Smartphones', icon: Laptop },
    { id: 'Tablets & Audio', label: 'Tablets & Audio', icon: Headphones },
    { id: 'Wearables', label: 'Smart Watches', icon: Watch },
  ];

  // Filter products
  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') {
      const discA = (a.originalPrice - a.price) / a.originalPrice;
      const discB = (b.originalPrice - b.price) / b.originalPrice;
      return discB - discA;
    }
    return 0;
  });

  return (
    <section id="products" className="py-12 scroll-mt-20">
      {/* Grid Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
            Explore All Resale Deals
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Browse our entire collection of 32-point verified pre-owned & open box inventory
          </p>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300">
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white focus:outline-none font-semibold cursor-pointer"
            >
              <option value="featured" className="bg-slate-900">Featured & Hot</option>
              <option value="price-low" className="bg-slate-900">Price: Low to High</option>
              <option value="price-high" className="bg-slate-900">Price: High to Low</option>
              <option value="discount" className="bg-slate-900">Max Discount %</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search status indicator */}
      {searchQuery && (
        <div className="mb-6 p-3 bg-slate-900/80 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs sm:text-sm text-amber-300">
          <span>
            Showing results for query: <strong className="text-white font-bold">"{searchQuery}"</strong> ({sorted.length} items found)
          </span>
        </div>
      )}

      {/* Products Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4 my-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">No match found</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            We couldn't find any products matching your search or category filter. Try viewing all items or searching for "iPhone", "Samsung", or "OnePlus".
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
