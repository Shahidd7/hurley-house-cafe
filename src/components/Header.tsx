import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from './AppContext';
import { ShoppingBag, Moon, Sun, Menu, X, Calendar, UtensilsCrossed } from 'lucide-react';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, cart, setIsCartOpen, setIsReservationOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Home', target: '#home' },
    { label: 'About', target: '#about' },
    { label: 'Favorites', target: '#featured' },
    { label: 'Menu', target: '#menu' },
    { label: 'Specials', target: '#specials' },
    { label: 'Gallery', target: '#gallery' },
    { label: 'Reviews', target: '#reviews' },
    { label: 'Find Us', target: '#location' },
  ];

  const handleScrollTo = (target: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(target);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/90 dark:bg-charcoal/90 backdrop-blur-md shadow-lg py-3 index-scrolled border-b border-coffee/10 dark:border-cream/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#home');
            }}
            className="flex items-center space-x-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-coffee dark:bg-honey flex items-center justify-center p-2 group-hover:rotate-12 transition-transform duration-300">
              <UtensilsCrossed className="w-4 h-4 text-cream dark:text-charcoal" />
            </div>
            <div className="text-xl sm:text-2xl font-serif font-black tracking-tight text-coffee dark:text-cream">
              HURLEY HOUSE <span className="font-serif font-normal italic text-honey">Café</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(link.target);
                }}
                className="text-xs uppercase tracking-[0.2em] font-bold text-coffee/80 dark:text-cream/85 hover:text-honey dark:hover:text-honey transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-honey transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-coffee/5 dark:hover:bg-cream/5 text-coffee dark:text-cream transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-honey" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full hover:bg-coffee/5 dark:hover:bg-cream/5 text-coffee dark:text-cream transition-colors duration-200 relative"
              aria-label="Open ordering card"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-honey text-charcoal font-sans font-bold text-xxs w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream dark:border-charcoal shadow-sm"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Reservation CTA */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:flex items-center space-x-2 bg-coffee text-cream text-xs font-bold tracking-widest uppercase rounded-full hover:bg-honey dark:bg-honey dark:text-charcoal dark:hover:bg-coffee dark:hover:text-cream px-6 py-2.5 transition-colors duration-300 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-coffee/5 dark:hover:bg-cream/5 text-coffee dark:text-cream transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-cream dark:bg-charcoal border-b border-coffee/10 dark:border-cream/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.target}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.target);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-charcoal/80 dark:text-cream/80 hover:bg-coffee/5 dark:hover:bg-cream/5 hover:text-honey"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-coffee/10 dark:border-cream/10 flex flex-col space-y-3 px-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsReservationOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-coffee dark:bg-honey text-cream dark:text-charcoal py-3 rounded-full font-medium shadow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
