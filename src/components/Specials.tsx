import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TODAY_SPECIALS } from '../data';
import { SpecialItem } from '../types';
import { Clock, Calendar, Bookmark, HelpCircle } from 'lucide-react';

export const Specials: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  // Auto-detect current weekday and highlight it on mount
  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = days[new Date().getDay()];
    // If it's Saturday or Sunday, default to Friday's Specials
    if (currentDayName === 'Saturday' || currentDayName === 'Sunday') {
      setSelectedDay('Friday');
    } else {
      setSelectedDay(currentDayName);
    }
  }, []);

  const activeSpecial = TODAY_SPECIALS.find((s) => s.day === selectedDay) || TODAY_SPECIALS[0];

  const weekdayButtons = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <section id="specials" className="py-24 bg-charcoal text-cream relative overflow-hidden">
      
      {/* Decorative ambient elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-honey via-coffee to-honey" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-honey/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-coffee/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-honey block">
            Chalkboard Specials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-cream leading-[1.05] tracking-tight">
            Fresh Today's Specials
          </h2>
          <div className="w-16 h-px bg-cream/15 mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-cream/70 font-light font-sans max-w-sm mx-auto leading-relaxed">
            Monday through Friday, we serve delicious special dishes starting at 11:00 AM until we run out.
          </p>
        </div>

        {/* Day selection controller */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {weekdayButtons.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-none text-xs uppercase tracking-wider font-bold transition-all duration-300 relative border ${
                selectedDay === day
                  ? 'bg-honey border-honey text-charcoal shadow-sm'
                  : 'bg-charcoal/40 border-cream/10 text-cream/80 hover:border-cream/30 hover:bg-charcoal/60'
              }`}
            >
              {day}
              {selectedDay === day && (
                <motion.span
                  layoutId="activeDayPin"
                  className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-charcoal shadow"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* The Chalkboard frame container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#1E1E1E] border-[16px] border-[#3D251D] rounded-3xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, #292929 0%, #171717 100%)`
          }}
        >
          {/* Wood Frame Overlay Highlights */}
          <div className="absolute inset-[-16px] border-[2px] border-[#5A382E] rounded-3xl pointer-events-none" />
          
          {/* Chalk dust illustration elements */}
          <div className="absolute bottom-4 left-6 text-cream/5 text-xs font-mono select-none">
            EST. 1978 • HURLEY COFFEE
          </div>
          <div className="absolute bottom-4 right-6 text-cream/5 text-xs font-mono select-none">
            CHALK BOARD CO.
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpecial.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-center max-w-2xl mx-auto"
            >
              <div className="inline-flex items-center space-x-1.5 py-1 px-3 bg-cream/5 border border-cream/10 text-honey rounded-full text-xxs sm:text-xs">
                <Bookmark className="w-3.5 h-3.5" />
                <span className="font-sans font-medium tracking-wider uppercase">Served on {activeSpecial.day}</span>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-cream tracking-tight flex items-center justify-center gap-3">
                  <span className="text-honey select-none font-script text-2xl sm:text-3xl font-light">★</span>
                  {activeSpecial.name}
                  <span className="text-honey select-none font-script text-2xl sm:text-3xl font-light">★</span>
                </h3>
                
                {/* Vintage Price graphic */}
                <div className="inline-block py-1 px-4 border-2 border-dashed border-honey/40 rounded-lg text-honey font-serif text-2xl font-black mt-2 bg-honey/5">
                  ${activeSpecial.price.toFixed(2)}
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-cream/90 font-light leading-relaxed max-w-lg mx-auto italic">
                "{activeSpecial.description}"
              </p>

              {/* Service timing details */}
              <div className="pt-6 border-t border-cream/10 flex flex-wrap items-center justify-center gap-6 mt-8 text-cream/60 text-xs sm:text-sm">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-honey" />
                  <span>Available {activeSpecial.time}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-honey" />
                  <span>Dine-In & Take-Out</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dusty Chalk Swirl drawing */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cream/10 rounded-tl-xl select-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cream/10 rounded-tr-xl select-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cream/10 rounded-bl-xl select-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cream/10 rounded-br-xl select-none" />
        </motion.div>

        {/* Small hint note */}
        <div className="text-center mt-6 text-cream/40 text-xxs flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-honey" />
          <span>Plate lunch special comes with one glass of Southern sweet tea and cornbread stack.</span>
        </div>

      </div>
    </section>
  );
};
