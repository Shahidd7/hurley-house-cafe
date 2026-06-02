import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from './AppContext';
import { Phone, ShoppingCart, X, Plus, Minus, Trash2, Calendar, Clock, Sparkles, Check } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    isReservationOpen,
    setIsReservationOpen,
    submitReservation
  } = useApp();

  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [checkoutType, setCheckoutType] = useState<'pickup' | 'table'>('pickup');
  const [tableNumber, setTableNumber] = useState('');
  const [pickupTime, setPickupTime] = useState('15 mins');

  // Table reservation localized form states
  const [resData, setResData] = useState({
    name: '',
    phone: '',
    guests: 2,
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmittingRes, setIsSubmittingRes] = useState(false);
  const [isResSuccess, setIsResSuccess] = useState(false);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const taxRate = 0.095; // 9.5% local Arkansas restaurant tax
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutCompleted(true);
    setTimeout(() => {
      setCheckoutCompleted(false);
      clearCart();
      setIsCartOpen(false);
    }, 6000);
  };

  const handleResSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resData.name || !resData.phone || !resData.date || !resData.time) return;

    setIsSubmittingRes(true);
    const success = await submitReservation({
      name: resData.name,
      phone: resData.phone,
      guests: Number(resData.guests),
      date: resData.date,
      time: resData.time,
      notes: resData.notes
    });
    setIsSubmittingRes(false);

    if (success) {
      setIsResSuccess(true);
      setTimeout(() => {
        setIsResSuccess(false);
        setIsReservationOpen(false);
        setResData({
          name: '',
          phone: '',
          guests: 2,
          date: '',
          time: '',
          notes: ''
        });
      }, 5000);
    }
  };

  return (
    <>
      {/* 1. FLOATING CALL BUTTON (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.a
          href="tel:8702554679"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-coffee border border-cream/20 text-cream px-5 py-3.5 rounded-none shadow-md hover:bg-coffee/95 backdrop-blur-md transition-all font-sans font-bold text-[10px] uppercase tracking-wider"
        >
          <Phone className="w-3.5 h-3.5 text-honey animate-pulse" />
          <span className="hidden xs:inline">Call Café</span>
          <span className="text-honey">870-255-4679</span>
        </motion.a>
      </div>

      {/* 2. FLOATING ORDER BUTTON (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end">
        {totalQuantity > 0 && (
          <motion.button
            onClick={() => setIsCartOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 bg-honey text-charcoal px-6 py-4 rounded-none shadow-md hover:bg-honey/95 font-sans font-extrabold text-[10px] tracking-wider uppercase group"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-charcoal" />
              <span className="absolute -top-2 -right-3 bg-coffee text-cream text-[9px] font-bold px-1.5 py-0.5 rounded-none min-w-[18px] text-center border border-honey">
                {totalQuantity}
              </span>
            </div>
            <span>View Receipt • ${grandTotal.toFixed(2)}</span>
          </motion.button>
        )}
      </div>

      {/* 3. DETAILED SHOPPING CART / ONLINE ORDER DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />

            {/* Receipt Modal Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-cream dark:bg-charcoal w-full max-w-md h-full shadow-2xl border-l border-coffee/15 dark:border-cream/10 z-10 flex flex-col justify-between rounded-none"
            >
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-coffee/15 dark:border-cream/10 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <ShoppingCart className="w-4 h-4 text-honey" />
                  <h3 className="font-serif text-lg font-bold text-coffee dark:text-cream leading-tight uppercase tracking-wide">
                    Your Dinner Order
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-none hover:bg-coffee/5 dark:hover:bg-cream/10 text-charcoal dark:text-cream"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence mode="wait">
                  {checkoutCompleted ? (
                    <motion.div
                      key="cart-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-none flex items-center justify-center mx-auto border border-emerald-500/15">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-xl sm:text-2xl font-black text-coffee dark:text-cream">Order Received!</h4>
                        <p className="text-xs sm:text-sm text-charcoal/80 dark:text-cream/80 leading-relaxed font-light max-w-xs mx-auto">
                          Our kitchen in Hazen is now preparing your delicious Southern favorites with absolute care.
                        </p>
                      </div>

                      {checkoutType === 'pickup' ? (
                        <div className="p-4 bg-honey/15 border border-honey/25 rounded-none text-xxs font-sans text-charcoal/80 dark:text-cream/90 max-w-sm leading-relaxed mx-auto text-left">
                          <strong>⏱️ Pickup Timing:</strong> Ready for curbside or counter pick-up in approx <strong className="text-honey">{pickupTime}</strong>. We'll pack the fried pies in insulated wrappers to keep them hot!
                        </div>
                      ) : (
                        <div className="p-4 bg-honey/15 border border-honey/25 rounded-none text-xxs font-sans text-charcoal/80 dark:text-cream/90 max-w-sm leading-relaxed mx-auto text-left">
                          <strong>🍽️ Table Service Delivery:</strong> Delivering direct to <strong className="text-honey">Table #{tableNumber}</strong> inside the cafe right as it comes off the grill!
                        </div>
                      )}

                      <div className="text-xxs text-charcoal/40 dark:text-cream/40 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-honey" />
                        <span>Thank you for ordering with us!</span>
                      </div>
                    </motion.div>
                  ) : cart.length > 0 ? (
                    <motion.div key="cart-list" className="space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="bg-cream/40 dark:bg-charcoal/40 hover:bg-cream dark:hover:bg-[#282828] border border-coffee/10 dark:border-cream/10 p-4 rounded-none flex items-start justify-between gap-4 transition-colors animate-fade-in"
                        >
                          <div className="space-y-1">
                            <h5 className="font-serif text-sm font-bold text-coffee dark:text-cream leading-tight">
                              {item.menuItem.name}
                            </h5>
                            <span className="text-xs font-semibold text-honey font-sans">
                              ${item.menuItem.price.toFixed(2)}
                            </span>

                            {item.customizations && item.customizations.length > 0 && (
                              <div className="pt-1.5 flex flex-wrap gap-1">
                                {item.customizations.map((cust, i) => (
                                  <span key={i} className="text-xxs uppercase tracking-wider font-bold bg-coffee/5 dark:bg-cream/5 text-charcoal/60 dark:text-cream/60 py-0.5 px-2 rounded-none border border-coffee/5 dark:border-cream/5 block">
                                    {cust}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end space-y-3 shrink-0">
                            {/* Quantity adjuster */}
                            <div className="flex items-center space-x-2.5 bg-coffee/5 dark:bg-cream/5 px-2.5 py-1 rounded-none border border-coffee/10 dark:border-cream/5">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="p-0.5 text-charcoal/70 dark:text-cream/70 hover:text-honey"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-sans font-bold text-xs text-coffee dark:text-cream w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="p-0.5 text-charcoal/70 dark:text-cream/70 hover:text-honey"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Total item row price and delete icon */}
                            <div className="flex items-center space-x-2">
                              <span className="font-sans font-bold text-xs text-charcoal dark:text-cream/80">
                                ${(item.menuItem.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-charcoal/40 dark:text-cream/40 hover:text-red-500 hover:bg-red-500/5 p-1 rounded-none transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cart-empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-16 text-center space-y-4"
                    >
                      <ShoppingCart className="w-12 h-12 text-honey/30 mx-auto animate-pulse" />
                      <h4 className="font-serif text-lg font-bold text-coffee dark:text-cream/80">
                        Scratch Order Empty
                      </h4>
                      <p className="text-xs text-charcoal/55 dark:text-cream/55 max-w-xs mx-auto">
                        Flip through today's chalkboard specials or scroll the categorical menu above. Tap "+" to layer your basket with Southern delicacies!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Drawer checkout summary footer */}
              {!checkoutCompleted && cart.length > 0 && (
                <div className="p-6 bg-coffee/5 dark:bg-charcoal/80 border-t border-coffee/15 dark:border-cream/15 space-y-6">
                  {/* Select Order delivery style */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">
                      Fulfillment Method
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setCheckoutType('pickup')}
                        className={`py-2.5 px-3 text-xs uppercase tracking-wider font-bold rounded-none border transition-all ${
                          checkoutType === 'pickup'
                            ? 'bg-coffee text-cream dark:bg-honey dark:text-charcoal border-transparent'
                            : 'bg-cream/40 dark:bg-charcoal/40 border-coffee/10 dark:border-cream/5 text-charcoal dark:text-cream hover:border-coffee/20 dark:hover:border-cream/10'
                        }`}
                      >
                        ⏱️ Take-Out Pickup
                      </button>
                      <button
                        onClick={() => setCheckoutType('table')}
                        className={`py-2.5 px-3 text-xs uppercase tracking-wider font-bold rounded-none border transition-all ${
                          checkoutType === 'table'
                            ? 'bg-coffee text-cream dark:bg-honey dark:text-charcoal border-transparent'
                            : 'bg-cream/40 dark:bg-charcoal/40 border-coffee/10 dark:border-cream/5 text-charcoal dark:text-cream hover:border-coffee/20 dark:hover:border-cream/10'
                        }`}
                      >
                        🍽️ Dine-In To Table
                      </button>
                    </div>

                    {checkoutType === 'pickup' ? (
                      <div className="flex justify-between items-center bg-[#FFFDF9]/60 dark:bg-charcoal/40 border border-coffee/15 dark:border-cream/10 p-3 rounded-none text-xs">
                        <span className="text-charcoal/65 dark:text-cream/65 uppercase tracking-wider font-bold text-[10px]">Pickup Wait:</span>
                        <select
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="bg-transparent font-bold text-honey outline-none border-0 focus:ring-0 cursor-pointer text-xs"
                        >
                          <option value="15 mins">Ready in 15 mins (Standard)</option>
                          <option value="25 mins">Ready in 25 mins</option>
                          <option value="40 mins">Ready in 40 mins</option>
                          <option value="Specific Time">Set a Specific Pickup Time</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-[#FFFDF9]/60 dark:bg-charcoal/40 border border-coffee/15 dark:border-cream/10 p-3 rounded-none text-xs gap-3">
                        <span className="text-charcoal/65 dark:text-cream/65 uppercase tracking-wider font-bold text-[10px] shrink-0">Your Table Number:</span>
                        <input
                          type="text"
                          required
                          placeholder="E.g. 14, Booth 3"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full text-right outline-none bg-transparent border-0 font-bold text-honey focus:ring-0 text-xs uppercase tracking-wider"
                        />
                      </div>
                    )}
                  </div>

                  {/* Calculations receipts ledger */}
                  <div className="space-y-1.5 text-xs text-charcoal/70 dark:text-cream/70 border-t border-coffee/15 dark:border-cream/10 pt-4 font-sans">
                    <div className="flex justify-between">
                      <span>Subtotal amount</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arkansas Tax (9.5%)</span>
                      <span className="font-bold">${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-coffee dark:text-honey font-black pt-1.5 border-t border-coffee/15 dark:border-cream/10">
                      <span className="font-serif">Grand Total Bill</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <form onSubmit={handleCheckoutSubmit}>
                    <button
                      type="submit"
                      disabled={checkoutType === 'table' && !tableNumber}
                      className="w-full bg-coffee hover:bg-honey dark:bg-honey dark:hover:bg-coffee text-cream dark:text-charcoal dark:hover:text-cream py-4 rounded-none font-bold uppercase text-xs tracking-widest transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Place My Order</span>
                    </button>
                  </form>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. SEPARATE RESERVATION MODAL OVERLAY (From header / footer clicks) */}
      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReservationOpen(false)}
              className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative bg-cream dark:bg-charcoal w-full max-w-lg rounded-none overflow-hidden shadow-2xl border border-coffee/20 dark:border-cream/15 z-10 flex flex-col justify-between max-h-[90vh]"
            >
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-honey font-bold bg-honey/15 px-2.5 py-1 rounded-none">
                      Hurley House Café
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-coffee dark:text-cream mt-2 tracking-tight">
                      Reserve a Table
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsReservationOpen(false)}
                    className="p-1 rounded-none hover:bg-coffee/5 dark:hover:bg-cream/10 text-charcoal dark:text-cream"
                  >
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {!isResSuccess ? (
                    <motion.form
                      key="modal-res-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleResSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Full Name</label>
                          <input
                            type="text"
                            required
                            name="name"
                            placeholder="John Doe"
                            value={resData.name}
                            onChange={(e) => setResData({ ...resData, name: e.target.value })}
                            className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-4 outline-none text-charcoal dark:text-cream"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Phone Number</label>
                          <input
                            type="tel"
                            required
                            name="phone"
                            placeholder="(870) 555-0199"
                            value={resData.phone}
                            onChange={(e) => setResData({ ...resData, phone: e.target.value })}
                            className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-4 outline-none text-charcoal dark:text-cream"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block font-sans">Guests</label>
                          <select
                            name="guests"
                            value={resData.guests}
                            onChange={(e) => setResData({ ...resData, guests: Number(e.target.value) })}
                            className="w-full text-xs sm:text-sm bg-cream/20 dark:bg-charcoal/20 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-4 outline-none text-charcoal dark:text-cream appearance-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                              <option key={num} value={num} className="bg-cream dark:bg-charcoal text-charcoal dark:text-cream">
                                {num} {num === 1 ? 'Person' : 'People'}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Date</label>
                          <input
                            type="date"
                            required
                            value={resData.date}
                            onChange={(e) => setResData({ ...resData, date: e.target.value })}
                            className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-[10px] outline-none text-charcoal dark:text-cream cursor-pointer"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Time</label>
                          <input
                            type="time"
                            required
                            value={resData.time}
                            onChange={(e) => setResData({ ...resData, time: e.target.value })}
                            className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-[10px] outline-none text-charcoal dark:text-cream cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Arrangement Notes</label>
                        <textarea
                          rows={2}
                          placeholder="High-chair required, allergy details, or simple timing instructions..."
                          value={resData.notes}
                          onChange={(e) => setResData({ ...resData, notes: e.target.value })}
                          className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none p-3 outline-none text-charcoal dark:text-cream"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingRes}
                        className="w-full bg-coffee dark:bg-honey hover:bg-honey/95 dark:hover:bg-coffee text-cream dark:text-charcoal dark:hover:text-cream py-4 rounded-none font-bold uppercase text-xs tracking-widest transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                      >
                        {isSubmittingRes ? (
                          <div className="w-5 h-5 border-2 border-cream dark:border-charcoal border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            <span>Set My Reservation</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="modal-success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-none flex items-center justify-center mx-auto border border-emerald-500/10">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-xl sm:text-2xl font-black text-coffee dark:text-cream">Table Saved!</h4>
                        <p className="text-xs sm:text-sm text-charcoal/80 dark:text-cream/80 max-w-xs mx-auto leading-relaxed font-light">
                          Y'all are successfully booked! See you on <strong className="text-honey">{resData.date}</strong> at <strong className="text-honey">{resData.time}</strong>.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
