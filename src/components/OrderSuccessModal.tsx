import React from 'react';
import { CheckCircle, Mail, MessageSquare, ShieldCheck, X, MapPin, Phone } from 'lucide-react';
import { SHOP_DETAILS } from '../data/products';

interface OrderSuccessModalProps {
  orderData: any | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ orderData, onClose }) => {
  if (!orderData) return null;

  const handleWhatsAppInstantOrder = () => {
    const itemsList = orderData.items
      .map((i: any) => `• ${i.name} (Qty: ${i.quantity}) - ₹${(i.price * i.quantity).toLocaleString()}`)
      .join('\n');

    const text = encodeURIComponent(
      `🎉 *NEW ORDER FROM APNI BAZAAR WEBSITE*\n\n` +
        `📋 *Order ID:* ${orderData.orderId}\n` +
        `👤 *Customer:* ${orderData.name}\n` +
        `📞 *Phone:* ${orderData.phone}\n` +
        `📍 *Address:* ${orderData.address}, ${orderData.city} (PIN: ${orderData.pincode})\n` +
        `💳 *Payment Preference:* ${orderData.paymentMethod}\n\n` +
        `🛒 *Ordered Items:*\n${itemsList}\n\n` +
        `💵 *Total Amount:* ₹${orderData.totalPrice.toLocaleString()}\n` +
        `Please confirm dispatch!`
    );

    window.open(`https://wa.me/${SHOP_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleDirectEmailClick = () => {
    const subject = encodeURIComponent(`New Order #${orderData.orderId} - Apni Bazaar Store`);
    const body = encodeURIComponent(
      `Order ID: ${orderData.orderId}\n` +
        `Customer Name: ${orderData.name}\n` +
        `Phone Number: ${orderData.phone}\n` +
        `Delivery Address: ${orderData.address}, ${orderData.city}, PIN: ${orderData.pincode}\n` +
        `Payment Method: ${orderData.paymentMethod}\n\n` +
        `Items Ordered:\n` +
        orderData.items
          .map((i: any) => `• ${i.name} (Qty: ${i.quantity}) - ₹${(i.price * i.quantity).toLocaleString()}`)
          .join('\n') +
        `\n\nTotal Amount Payable: ₹${orderData.totalPrice.toLocaleString()}`
    );
    window.location.href = `mailto:${SHOP_DETAILS.ownerEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-8 text-center text-slate-950 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-lg animate-bounce">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-xs sm:text-sm font-bold opacity-90 mt-1">
            Thank you for shopping at Apni Bazaar. Your certified devices are reserved!
          </p>
          <div className="mt-3 inline-block bg-slate-950 text-emerald-400 text-xs font-black px-3.5 py-1 rounded-full shadow-md">
            Order ID: {orderData.orderId}
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Dispatch Notice */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Direct Owner Notification Dispatched</p>
              <p className="text-slate-400 text-xs mt-0.5">
                We have notified owner <strong className="text-amber-300">{SHOP_DETAILS.ownerEmail}</strong>. You can also send a 1-click instant WhatsApp message below to accelerate shipment!
              </p>
            </div>
          </div>

          {/* Delivery Details Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
            <div>
              <span className="text-slate-500 font-bold uppercase block mb-1">Customer Info</span>
              <p className="font-bold text-white text-sm">{orderData.name}</p>
              <p className="text-slate-300 flex items-center gap-1 mt-1">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> {orderData.phone}
              </p>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase block mb-1">Shipping Address</span>
              <p className="text-slate-300 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {orderData.address}, {orderData.city} (PIN: {orderData.pincode})
                </span>
              </p>
            </div>
          </div>

          {/* Items Summary List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ordered Items ({orderData.items?.length || 0})
            </span>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {orderData.items?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={item.image} alt="" className="w-9 h-9 object-contain bg-slate-900 rounded p-1" />
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-400">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-extrabold text-amber-400">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Price Bar */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between font-heading">
            <div>
              <span className="text-xs text-slate-400 block">Total Amount Payable</span>
              <span className="text-xs font-bold text-emerald-400">Payment: {orderData.paymentMethod}</span>
            </div>
            <div className="text-2xl font-black text-amber-400">
              ₹{orderData.totalPrice?.toLocaleString()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleWhatsAppInstantOrder}
              className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer transform hover:scale-102"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Order on WhatsApp</span>
            </button>

            <button
              onClick={handleDirectEmailClick}
              className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Copy Email Receipt</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full text-center text-xs text-slate-400 hover:text-white underline py-1"
          >
            Close & Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
