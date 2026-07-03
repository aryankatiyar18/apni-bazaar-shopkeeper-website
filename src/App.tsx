import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS, Product } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResaleEstimator } from './components/ResaleEstimator';
import { ProductCarousel } from './components/ProductCarousel';
import { ProductGrid } from './components/ProductGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const ToastContainer: React.FC = () => {
  const { toasts } = useCart();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-slate-900 border border-amber-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 pointer-events-auto animate-fadeIn text-xs sm:text-sm font-semibold"
        >
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
};

const ShopApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [orderSuccessData, setOrderSuccessData] = useState<any | null>(null);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured || p.rating >= 4.8);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="flex-1">
        <HeroSection />

        <ResaleEstimator />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarousel
            products={featuredProducts}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            searchQuery={searchQuery}
          />
        </div>

        <WhyChooseUs />
      </main>

      <Footer />

      {/* Modals and Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <CartDrawer
        onOrderSuccess={(data) => setOrderSuccessData(data)}
      />

      <OrderSuccessModal
        orderData={orderSuccessData}
        onClose={() => setOrderSuccessData(null)}
      />

      <FloatingWhatsApp />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <ShopApp />
    </CartProvider>
  );
}
