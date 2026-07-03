import React, { useState } from 'react';
import { ShoppingBag, Star, Eye, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(product.image);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 800);
  };

  return (
    <div
      onClick={() => onQuickView && onQuickView(product)}
      className="group bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer h-full relative"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.stockBadge ? (
          <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md">
            {product.stockBadge}
          </span>
        ) : (
          <span className="bg-slate-950/80 backdrop-blur-md text-slate-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-slate-700">
            Certified Pre-Owned
          </span>
        )}

        {discountPercent > 0 && (
          <span className="bg-emerald-500 text-slate-950 font-extrabold text-[11px] px-2 py-0.5 rounded-lg shadow-md">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-slate-950/80 overflow-hidden flex items-center justify-center p-4">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-108 transition-transform duration-500"
          onError={() => setImgSrc(product.fallbackImage)}
        />
        
        {/* Quick view hover button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView && onQuickView(product);
          }}
          className="absolute bottom-3 right-3 bg-slate-950/85 hover:bg-amber-500 text-slate-300 hover:text-slate-950 p-2.5 rounded-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Condition Grade */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-amber-400 truncate flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              {product.condition}
            </span>
            <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-amber-400 transition-colors font-heading">
            {product.name}
          </h3>

          {/* Quick Specs */}
          <div className="flex flex-wrap gap-1 mt-2">
            {product.specs.slice(0, 2).map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[130px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Add To Cart */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </div>
            <div className="text-lg sm:text-xl font-black text-white font-heading">
              ₹{product.price.toLocaleString()}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addedAnimation}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all transform active:scale-95 shadow-md ${
              addedAnimation
                ? 'bg-emerald-500 text-slate-950 scale-105'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
