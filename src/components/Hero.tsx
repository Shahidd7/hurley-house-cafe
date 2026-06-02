import React from 'react';
import { motion } from 'motion/react';
import { useApp } from './AppContext';
import { Coffee, ArrowRight, Phone, Clock, Landmark } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setIsCartOpen, setIsReservationOpen } = useApp();

  // Resolve the generated pancake image path
  const heroBg = new URL('../assets/images/hurley_pancakes_1780405819565.png', import.meta.url).href;

  const handleScrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToLocation = () => {
    const element = document.querySelector('#location');
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  // Generate steam particles
  const steamParticles = Array.from({ length: 15 });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Visual Background with Parallax Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Cinematic dark glassmorphic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent dark:from-charcoal/95 dark:via-charcoal/80 dark:to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-transparent to-charcoal/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content (Col 1-7) */}
          <div className="lg:col-span-8 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center space-x-2 border border-honey/40 bg-honey/10 px-4 py-1.5 text-xs font-bold text-honey uppercase tracking-[0.2em] rounded-full"
            >
              <Landmark className="w-4 h-4 text-honey" />
              <span>Hurley House Café • Hazen, Arkansas</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <span className="font-script text-honey text-2xl sm:text-3xl block">Southern Hospitality</span>
              <h1 className="font-serif text-5xl sm:text-7xl font-black leading-[0.95] text-cream tracking-tight drop-shadow-md">
                Welcome to <br />
                Hurley House <span className="font-serif font-light italic text-honey">Café</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-sm sm:text-lg text-cream/90 max-w-2xl leading-relaxed font-light drop-shadow-md"
            >
              Where the coffee is <span className="text-honey font-medium">hot</span>, the pancakes are <span className="text-honey font-medium">stacked</span>, and every single meal feels exactly like home.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={handleScrollToMenu}
                className="px-8 py-3.5 bg-honey text-charcoal font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all"
              >
                View Menu
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="px-8 py-3.5 border border-cream/40 text-cream font-bold uppercase text-xs tracking-widest hover:bg-cream/10 transition-all"
              >
                Order Online
              </button>

              <button
                onClick={handleScrollToLocation}
                className="px-6 py-3.5 text-cream hover:text-honey font-bold uppercase text-xs tracking-widest flex items-center space-x-2 transition-all"
              >
                <span>Find Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Small badging counters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-10 border-t border-cream/15 max-w-lg"
            >
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold text-honey text-glow">6:00 AM</span>
                <span className="text-xxs uppercase tracking-wider text-cream/50 mt-1">Breakfast Starts</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold text-cream">Scratch</span>
                <span className="text-xxs uppercase tracking-wider text-cream/50 mt-1">Fried Country Pies</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold text-cream">Half-Pound</span>
                <span className="text-xxs uppercase tracking-wider text-cream/50 mt-1">Burger Patties</span>
              </div>
            </motion.div>
          </div>

          {/* Steam Coffee Simulation (Col 8-12) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative h-64 lg:h-96">
            <motion.div
              className="relative p-10 bg-charcoal/40 border border-cream/10 rounded-3xl backdrop-blur-md flex flex-col justify-end items-center w-72 h-72 sm:w-80 sm:h-80 shadow-2xl self-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Floating warm lighting glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-honey/10 blur-2xl" />

              {/* Coffee mug with customized animated steam columns */}
              <div className="relative z-10 flex flex-col items-center">
                
                {/* Steam simulation container */}
                <div className="relative h-28 w-24 flex justify-center overflow-visible">
                  {steamParticles.map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bottom-2 w-1 sm:w-1.5 h-10 bg-gradient-to-t from-cream/20 via-cream/40 to-transparent rounded-full filter blur-xs"
                      initial={{
                        x: (i - 7) * 4,
                        y: 40,
                        opacity: 0,
                        scaleY: 0.5,
                      }}
                      animate={{
                        y: [-20, -100],
                        opacity: [0, 0.6, 0.4, 0],
                        scaleY: [0.5, 1.5, 1],
                        x: [
                          (i - 7) * 4,
                          (i - 7) * 4 + Math.sin(i) * 12 + 10,
                          (i - 7) * 4 + Math.cos(i) * 20 - 10
                        ]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Cup drawing */}
                <div className="relative w-28 h-20 bg-gradient-to-b from-coffee to-charcoal border-l border-t border-cream/20 rounded-b-3xl rounded-t-sm shadow-xl flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-honey/80 animate-pulse" />
                  {/* Handle */}
                  <div className="absolute -left-4 top-4 w-6 h-10 border-4 border-coffee rounded-l-full rotate-12" />
                </div>
                
                {/* Saucer */}
                <div className="w-36 h-3 bg-cream/40 border-b border-cream/10 rounded-full mt-1 border-t border-cream/20" />
              </div>

              <div className="text-center mt-6 w-full relative z-10">
                <p className="font-serif text-sm italic text-honey">"The coffee is always hot"</p>
                <div className="flex items-center justify-center space-x-1.5 text-cream/60 text-xxs tracking-wider uppercase mt-1">
                  <Clock className="w-3 h-3 text-honey" />
                  <span>Always Freshly Brewed</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
