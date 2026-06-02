import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from './AppContext';
import { MapPin, Phone, Clock, Calendar, Users, FileText, CheckCircle, HelpCircle } from 'lucide-react';

export const Location: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, submitReservation } = useApp();
  
  // Hours structure
  const hours = [
    { days: 'Monday – Thursday', time: '6:00 AM – 8:00 PM' },
    { days: 'Friday', time: '6:00 AM – 9:00 PM' },
    { days: 'Saturday', time: '6:00 AM – 8:00 PM' },
    { days: 'Sunday', time: 'Closed' }
  ];

  // Table reservation form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 2,
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);

  // Calculate real-time open status
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const hoursNum = now.getHours();
      const minutesNum = now.getMinutes();
      const currentTimeString = hoursNum * 100 + minutesNum; // e.g. 1430 for 2:30 PM

      if (day === 0) { // Sunday
        setIsOpenNow(false);
      } else if (day >= 1 && day <= 4) { // Mon - Thu (6 AM to 8 PM -> 0600 to 2000)
        setIsOpenNow(currentTimeString >= 600 && currentTimeString < 2000);
      } else if (day === 5) { // Fri (6 AM to 9 PM -> 0600 to 2100)
        setIsOpenNow(currentTimeString >= 600 && currentTimeString < 2100);
      } else if (day === 6) { // Sat (6 AM to 8 PM -> 0600 to 2000)
        setIsOpenNow(currentTimeString >= 600 && currentTimeString < 2000);
      }
    };
    
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) return;

    setIsSubmitting(true);
    const success = await submitReservation({
      name: formData.name,
      phone: formData.phone,
      guests: Number(formData.guests),
      date: formData.date,
      time: formData.time,
      notes: formData.notes
    });
    setIsSubmitting(false);

    if (success) {
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        setFormData({
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
    <section id="location" className="py-24 bg-cream dark:bg-charcoal/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-honey block">
            Visit & Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-coffee dark:text-cream leading-[1.05] tracking-tight">
            Find Us & Book a Table
          </h2>
          <div className="w-16 h-px bg-coffee/20 dark:bg-cream/15 mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-charcoal/70 dark:text-cream/70 font-light max-w-md mx-auto leading-relaxed">
            Located conveniently on Highway 70 & 63 North in Hazen, Arkansas. Stop in today or book a robust table reservation in advance.
          </p>
        </div>

        {/* Content Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Left panel: Info, Hours, Live status (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFDF9]/40 dark:bg-charcoal/40 border border-coffee/15 dark:border-cream/10 p-8 rounded-none space-y-6 shadow-sm backdrop-blur-md">
              <h3 className="font-serif text-xl font-bold text-coffee dark:text-cream flex items-center justify-between">
                <span>Information Desk</span>
                {isOpenNow ? (
                  <span className="text-[9px] px-2.5 py-1 font-sans font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-none border border-emerald-500/10">
                    ● OPEN NOW
                  </span>
                ) : (
                  <span className="text-[9px] px-2.5 py-1 font-sans font-bold bg-red-500/15 text-red-500 rounded-none border border-red-500/10">
                    ● CLOSED
                  </span>
                )}
              </h3>

              {/* Informational entries */}
              <div className="space-y-4">
                {/* Mappin */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-coffee dark:bg-honey text-cream dark:text-charcoal rounded-none shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xxs uppercase tracking-wider text-charcoal/50 dark:text-cream/50 font-bold block">Address location</span>
                    <p className="font-sans text-sm text-charcoal/80 dark:text-cream/95 mt-1 font-semibold">
                      Highway 70 & 63 North <br />
                      Hazen, Arkansas 72064
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-coffee dark:bg-honey text-cream dark:text-charcoal rounded-none shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xxs uppercase tracking-wider text-charcoal/50 dark:text-cream/50 font-bold block">Direct Call Number</span>
                    <a 
                      href="tel:8702554679"
                      className="font-sans text-lg text-honey dark:text-honey font-bold hover:underline select-all mt-1 block"
                    >
                      870-255-4679
                    </a>
                  </div>
                </div>

                {/* Hours Block */}
                <div className="flex items-start space-x-4 pt-4 border-t border-coffee/10 dark:border-cream/10">
                  <div className="p-3 bg-coffee dark:bg-honey text-cream dark:text-charcoal rounded-none shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <span className="text-xxs uppercase tracking-wider text-charcoal/50 dark:text-cream/50 font-bold block mb-2">Kitchen Operating Hours</span>
                    <div className="space-y-1.5">
                      {hours.map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span className="text-charcoal/70 dark:text-cream/70 font-medium">{h.days}</span>
                          <span className="text-charcoal/90 dark:text-cream/90 font-bold">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note about parking/hunting */}
            <div className="p-5 bg-honey/15 border border-honey/25 rounded-none flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-honey shrink-0 mt-0.5" />
              <p className="text-xxs sm:text-xs text-charcoal/80 dark:text-cream/90 leading-normal">
                <strong>Travelling Through Hazen?</strong> We have ample, easy-access gravel parking for long-haul trucks, hunting rigs, boats, and RV trailers. Come right in for a warm meal and free refills!
              </p>
            </div>
          </div>

          {/* Right panel: Table Reservation form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF9]/40 dark:bg-charcoal/40 border border-coffee/15 dark:border-cream/10 p-8 rounded-none shadow-sm relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!isDone ? (
                  <motion.form
                    key="reservation-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] text-honey font-bold uppercase tracking-[0.2em] block mb-1">Book a Table</span>
                      <h4 className="font-serif text-xl sm:text-2xl font-black text-coffee dark:text-cream">
                        Host Your Dinner Gathering
                      </h4>
                      <p className="text-xs text-charcoal/60 dark:text-cream/60 leading-relaxed font-light">
                        Plan a family reunion, holiday dinner, or post-hunt breakfast. We prepare tables and make sure everything is cozy and hot for your group.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-xxs font-bold text-coffee dark:text-cream uppercase tracking-wider block">Your Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-4 outline-none focus:ring-1 focus:ring-honey text-charcoal dark:text-cream"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Direct Phone Number</label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          placeholder="(870) 555-0199"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-4 outline-none focus:ring-1 focus:ring-honey text-charcoal dark:text-cream"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Guest Count */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block font-sans">Number of Guests</label>
                        <div className="relative">
                          <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleInputChange}
                            className="w-full text-xs sm:text-sm bg-cream/20 dark:bg-charcoal/20 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-4 outline-none focus:ring-1 focus:ring-honey text-charcoal dark:text-cream appearance-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                              <option key={num} value={num} className="bg-cream dark:bg-charcoal text-charcoal dark:text-cream">
                                {num} {num === 1 ? 'Person' : 'People'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Reserve Date</label>
                        <input
                          type="date"
                          required
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-4 outline-none focus:ring-1 focus:ring-honey text-charcoal dark:text-cream cursor-pointer"
                        />
                      </div>

                      {/* Time */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Select Time</label>
                        <input
                          type="time"
                          required
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none py-3 px-4 outline-none focus:ring-1 focus:ring-honey text-charcoal dark:text-cream cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Special Instructions / Notes */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-coffee dark:text-cream uppercase tracking-widest block">Special Arrangement Notes (Optional)</label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="E.g. High-chair required for baby, wheelchair accessibility, celebrating 50th birthday, private quiet booth preferred..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full text-xs sm:text-sm bg-cream/10 dark:bg-charcoal/10 border border-coffee/20 dark:border-cream/10 rounded-none p-3 outline-none focus:ring-1 focus:ring-honey text-charcoal dark:text-cream"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-coffee hover:bg-honey dark:bg-honey dark:hover:bg-coffee text-cream dark:text-charcoal dark:hover:text-cream py-4 rounded-none font-bold uppercase text-xs tracking-widest transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-cream dark:border-charcoal border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Confirm Table Reservation</span>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="reservation-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl font-black text-coffee dark:text-cream">Reservation Confirmed!</h4>
                      <p className="text-sm text-charcoal/80 dark:text-cream/80 max-w-sm mx-auto font-light leading-relaxed">
                        Thank you, <strong className="text-honey">{formData.name}</strong>. We have saved a table for <strong className="text-honey">{formData.guests} guests</strong> on <strong className="text-honey">{formData.date}</strong> at <strong className="text-honey">{formData.time}</strong>.
                      </p>
                    </div>
                    <div className="p-4 bg-honey/15 border border-honey/25 rounded-2xl max-w-sm mx-auto text-xxs text-charcoal/70 dark:text-cream/90 leading-relaxed">
                      A copy of this confirmation has been prepared. We'll keep the coffee brewing and can’t wait to welcome y’all in!
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Embedded Map Section */}
        <div className="rounded-none overflow-hidden border border-coffee/15 dark:border-cream/10 shadow-sm relative h-[360px] sm:h-[450px]">
          <iframe
            src="https://maps.google.com/maps?q=Hurley%20House%20Cafe,%20Hazen,%20AR&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 grayscale dark:invert-[0.9] dark:opacity-85 dark:hue-rotate-180"
            allowFullScreen={false}
            loading="lazy"
            title="Google Maps Location for Hurley House Café"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>
    </section>
  );
};
