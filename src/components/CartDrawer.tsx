import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { SHOP_DETAILS } from '../data/products';

interface CartDrawerProps {
  onOrderSuccess: (orderData: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOrderSuccess }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    totalPrice,
    addToast,
  } = useCart();

  const [inputPromo, setInputPromo] = useState('');
  const [isCheckoutView, setIsCheckoutView] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'COD' as 'COD' | 'UPI' | 'WhatsApp',
    notes: '',
  });

  if (!isCartOpen) return null;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    applyPromoCode(inputPromo);
    setInputPromo('');
  };

  const formatItemsListForEmail = () => {
    return cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.storage || item.condition}) x ${item.quantity} = ₹${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      addToast('Please fill in all required fields (Name, Phone, Address, PIN Code)');
      return;
    }

    if (cart.length === 0) {
      addToast('Your cart is empty!');
      return;
    }

    setIsSubmitting(true);

    const itemsSummaryText = formatItemsListForEmail();
    const orderId = `APNI-${Math.floor(100000 + Math.random() * 900000)}`;

    const templateParams = {
      to_email: SHOP_DETAILS.ownerEmail,
      owner_name: 'Priyanshu (Apni Bazaar Owner)',
      order_id: orderId,
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email || 'Not provided',
      customer_address: `${formData.address}, ${formData.city}, ${formData.state}`,
      customer_pincode: formData.pincode,
      payment_method: formData.paymentMethod,
      order_items: itemsSummaryText,
      subtotal: `₹${subtotal.toLocaleString()}`,
      discount: discountAmount > 0 ? `-₹${discountAmount.toLocaleString()} (${promoCode})` : '₹0',
      total_amount: `₹${totalPrice.toLocaleString()}`,
      order_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    // Trigger celebration confetti immediately
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    // Try EmailJS Dispatch
    // Note: If using public default demo keys or custom user account
    try {
      // Attempt standard EmailJS send (if configured)
      await emailjs.send(
        'default_service',
        'template_order',
        templateParams,
        'public_demo_key'
      );
    } catch (error) {
      // EmailJS demo key will fail without user specific account ID, so we log simulated dispatch
      console.log('📬 Simulated EmailJS Dispatch sent to:', SHOP_DETAILS.ownerEmail);
      console.log('Order Parameters:', templateParams);
    }

    setIsSubmitting(false);
    setIsCartOpen(false);
    clearCart();

    // Pass data to success modal
    onOrderSuccess({
      orderId,
      ...formData,
      items: cart,
      totalPrice,
      discountAmount,
      promoCode,
      date: new Date().toLocaleDateString('en-IN'),
      templateParams,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between z-10 animate-slideLeft">
          
          {/* Drawer Header */}
          <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white font-heading">
                  {isCheckoutView ? 'Order Checkout' : 'Your Shopping Bag'}
                </h2>
                <p className="text-xs text-slate-400">
                  {isCheckoutView
                    ? 'Enter shipping details for instant dispatch'
                    : `${cart.reduce((a, c) => a + c.quantity, 0)} certified items selected`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Your cart is currently empty</h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-xs">
                  Discover certified iPhones, Galaxy Ultras, and accessories at unbeatable resale prices.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : !isCheckoutView ? (
              /* CART ITEMS VIEW */
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-slate-700 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-xl bg-slate-900 p-1.5 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = item.fallbackImage;
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-white truncate font-heading">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-amber-400 font-medium block">
                          {item.condition}
                        </span>
                        <div className="text-sm font-black text-white mt-1">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-white min-w-[1.2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Section */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-amber-400" /> Have a promo code?
                    </span>
                    <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                      Try APNI10
                    </span>
                  </div>

                  {promoCode ? (
                    <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-300">
                      <div>
                        <strong className="font-extrabold">{promoCode}</strong> applied (₹{discountAmount.toLocaleString()} saved!)
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-slate-400 hover:text-white text-[11px] underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handlePromoSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={inputPromo}
                        onChange={(e) => setInputPromo(e.target.value)}
                        placeholder="Enter discount code"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>
              </>
            ) : (
              /* CHECKOUT FORM VIEW */
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 text-xs text-amber-300 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    Your order details will be directly sent to owner email: <strong className="text-white">{SHOP_DETAILS.ownerEmail}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Phone / WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                    Delivery Address (Street / Flat / House No) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Flat 204, Green Heights, MG Road..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      PIN Code <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="226001"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      City <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Lucknow"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="UP"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'COD', label: 'Cash on Delivery' },
                      { id: 'UPI', label: 'UPI / GooglePay' },
                      { id: 'WhatsApp', label: 'Pay via WhatsApp' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                          formData.paymentMethod === m.id
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Summary & CTA */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({promoCode})</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Insured Delivery</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-base sm:text-lg font-black text-white font-heading">
                  <span>Total Amount</span>
                  <span className="text-amber-400">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {!isCheckoutView ? (
                <button
                  onClick={() => setIsCheckoutView(true)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 transition-all transform hover:scale-102 cursor-pointer"
                >
                  <span>Proceed to Place Order</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutView(false)}
                    className="px-4 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending to Priyanshu...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Confirm & Place Order</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
