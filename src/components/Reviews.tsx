import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data';
import { Quote, ArrowLeft, ArrowRight, Star } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const length = REVIEWS.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const activeReview = REVIEWS[activeIndex];

  return (
    <section id="reviews" className="py-24 bg-cream/70 dark:bg-charcoal/90 relative overflow-hidden">
      
      {/* Decorative details */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-honey/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 bg-coffee/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-honey block">
            Southern Hospitality Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-coffee dark:text-cream leading-[1.05] tracking-tight">
            Loved By Our Locals
          </h2>
          <div className="w-16 h-px bg-coffee/20 dark:bg-cream/15 mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-charcoal/60 dark:text-cream/60 font-sans leading-relaxed">
            Hear from families and travelers who stop by our kitchen for fresh country breakfast and hot coffee.
          </p>
        </div>

        {/* Testimonial slider card */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main slide holder */}
          <div className="bg-[#FFFDF9]/40 dark:bg-charcoal/40 border border-coffee/15 dark:border-cream/10 p-8 sm:p-14 rounded-none shadow-sm relative min-h-[300px] flex flex-col justify-between overflow-hidden">
            
            {/* Background design big quote */}
            <Quote className="absolute top-8 right-8 text-honey/10 w-24 h-24 rotate-180 pointer-events-none select-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 relative z-10"
              >
                {/* Rating stars block */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: activeReview.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-honey text-honey" />
                  ))}
                </div>

                {/* Main feedback text */}
                <p className="font-sans text-sm sm:text-lg text-charcoal/90 dark:text-cream/90 font-light leading-relaxed italic">
                  "{activeReview.text}"
                </p>

                {/* Customer name and origin */}
                <div className="pt-6 border-t border-coffee/10 dark:border-cream/15 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-serif text-base font-extrabold text-coffee dark:text-cream">
                      {activeReview.name}
                    </span>
                    <span className="text-xxs uppercase tracking-wider text-honey font-bold mt-0.5">
                      {activeReview.location} • {activeReview.date}
                    </span>
                  </div>
                  <span className="font-script text-2xl text-honey/40 select-none">Warm Comfort</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controllers */}
          <div className="flex items-center justify-between mt-8">
            {/* Quick indicators */}
            <div className="flex items-center space-x-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 transition-all duration-300 ${
                    activeIndex === idx ? 'w-8 bg-honey' : 'w-2 bg-coffee/20 dark:bg-cream/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Pagination buttons */}
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                className="p-3 bg-cream dark:bg-charcoal hover:bg-honey hover:text-charcoal border border-coffee/10 dark:border-cream/10 text-coffee dark:text-cream rounded-none shadow hover:shadow-lg transition-all duration-300 transform active:scale-95"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 bg-cream dark:bg-charcoal hover:bg-honey hover:text-charcoal border border-coffee/10 dark:border-cream/10 text-coffee dark:text-cream rounded-none shadow hover:shadow-lg transition-all duration-300 transform active:scale-95"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
