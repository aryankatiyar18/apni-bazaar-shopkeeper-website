import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Pause, Play } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onQuickView }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoPlaying || products.length <= 3) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      {/* Carousel Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30 font-bold">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Spotlight Certified Deals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Handpicked 100% verified smartphones & gadgets with Apni Bazaar 7-Day Warranty
            </p>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="hidden sm:flex p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
            title={isAutoPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => scroll('left')}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-slate-950 transition-all shadow-md"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-slate-950 transition-all shadow-md"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[280px] sm:w-[310px] shrink-0 snap-start"
          >
            <ProductCard product={product} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
    </div>
  );
};
