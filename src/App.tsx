import React from 'react';
import { AppProvider, useApp } from './components/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Dishes } from './components/Dishes';
import { Menu } from './components/Menu';
import { Specials } from './components/Specials';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Bookmark, Info } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeNotification } = useApp();

  return (
    <div className="min-h-screen font-sans antialiased text-charcoal dark:text-cream bg-cream/10 dark:bg-charcoal/95 transition-colors duration-300">
      
      {/* 1. Global Toast Notifications Stream */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
          >
            <div className="bg-charcoal/95 dark:bg-cream/95 text-cream dark:text-charcoal border border-honey/55 px-5 py-3.5 rounded-none shadow-xl backdrop-blur-md flex items-center space-x-3">
              {activeNotification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-honey dark:text-[#D4A017] shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-honey dark:text-[#D4A017] shrink-0" />
              )}
              <span className="text-xs font-sans font-bold leading-tight">
                {activeNotification.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Structured Layout sections */}
      <Header />
      <Hero />
      <About />
      <Dishes />
      <Menu />
      <Specials />
      <Gallery />
      <Reviews />
      <Location />
      <Footer />
      
      {/* 3. Global Floating controls */}
      <FloatingActions />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
