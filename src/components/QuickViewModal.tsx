import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Check, Truck, RefreshCcw, MessageSquare } from 'lucide-react';
import { Product, SHOP_DETAILS } from '../data/products';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(product?.image || '');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWhatsAppAsk = () => {
    const text = encodeURIComponent(
      `Hi Apni Bazaar! I want to ask about:\n📱 ${product.name}\n💰 Price: ₹${product.price.toLocaleString()}\n✨ Condition: ${product.condition}\nIs this currently available for instant delivery/pickup?`
    );
    window.open(`https://wa.me/${SHOP_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2.5 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
          {/* Product Image Left */}
          <div className="md:col-span-6 bg-slate-950/80 rounded-2xl p-6 relative aspect-square flex items-center justify-center border border-slate-800">
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg">
                SAVE {discountPercent}%
              </span>
            )}
            <img
              src={imgSrc || product.image}
              alt={product.name}
              className="max-h-72 w-full object-contain transform hover:scale-105 transition-transform duration-500"
              onError={() => setImgSrc(product.fallbackImage)}
            />
          </div>

          {/* Product Info Right */}
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{product.condition}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading leading-tight">
              {product.name}
            </h3>

            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-300">
                {product.rating} ({product.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-white font-heading">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="ml-auto text-xs font-bold text-emerald-400">
                Free Insured Shipping
              </span>
            </div>

            {/* Key Specs */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Verified Technical Specifications:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-200 bg-slate-800/60 p-2 rounded-xl border border-slate-700/60">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Express India Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCcw className="w-4 h-4 text-amber-400" />
                <span>7-Day Replacement Policy</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 py-3.5 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg ${
                  added
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-amber-500/25'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppAsk}
                className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
