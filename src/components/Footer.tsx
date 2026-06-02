import React from 'react';
import { useApp } from './AppContext';
import { Facebook, Shield, MapPin, Phone, Heart, UtensilsCrossed } from 'lucide-react';

export const Footer: React.FC = () => {
  const { sCategory, setIsReservationOpen } = useApp();

  const handleArrowScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-coffee text-cream py-16 px-4 md:px-8 border-t border-cream/5 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-honey/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Brand Block (Cols 1-4) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-none bg-honey flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-5 h-5 text-charcoal" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-black text-cream tracking-tight leading-none">
                Hurley House
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-honey font-bold leading-none block mt-1">Café</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-cream/70 font-light leading-relaxed max-w-sm">
            For generations, we have been Hazen's favourite gathering table, crafting Southern classics with scratch and patience. Stop by or order online today!
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-cream/10 hover:bg-honey hover:text-charcoal rounded-none text-cream transition-all duration-300 transform hover:-translate-y-1"
              aria-label="Follow Hurley House Café on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links (Cols 5-7) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-sans text-xs font-bold text-honey uppercase tracking-widest">
            Explore Links
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-cream/70 font-light">
            {['#home', '#about', '#featured', '#menu', '#specials', '#gallery', '#reviews', '#location'].map((target) => (
              <li key={target}>
                <a
                  href={target}
                  onClick={(e) => {
                    e.preventDefault();
                    handleArrowScroll(target);
                  }}
                  className="hover:text-honey transition-colors capita"
                >
                  • {target.replace('#', ' ').trim().replace(/^\w/, (c) => c.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Operating Hours (Cols 8-10) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-sans text-xs font-bold text-honey uppercase tracking-widest">
            Special Highlights
          </h4>
          <ul className="space-y-2 text-xs text-cream/70 font-light">
            <li className="flex flex-col">
              <span className="font-sans font-bold text-cream">Breakfast Starts</span>
              <span className="mt-0.5">6:00 AM – 10:30 AM Daily</span>
            </li>
            <li className="flex flex-col pt-1">
              <span className="font-sans font-bold text-cream">Lunches & Specials</span>
              <span className="mt-0.5">11:00 AM – Close</span>
            </li>
            <li className="flex flex-col pt-1">
              <span className="font-sans font-bold text-cream">Catfish Friday Feast</span>
              <span className="mt-0.5">All Day Friday Spec</span>
            </li>
          </ul>
        </div>

        {/* Fast Action (Cols 11-12) */}
        <div className="md:col-span-3 space-y-4 border-t border-cream/10 md:border-t-0 pt-6 md:pt-0">
          <h4 className="font-sans text-xs font-bold text-honey uppercase tracking-widest">
            Contact Support
          </h4>
          <div className="space-y-3 text-xs text-cream/80">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-honey shrink-0 mt-0.5" />
              <span>
                HWY 70 & 63 North, <br />
                Hazen, AR 72064
              </span>
            </div>
            
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-honey" />
              <a href="tel:8702554679" className="hover:underline">
                870-255-4679
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Copy Signatures */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between text-xxs sm:text-xs text-cream/40 font-light leading-relaxed">
        <p>© 2026 Hurley House Café • Hazen, Arkansas. All Rights Reserved.</p>
        <p className="flex items-center gap-1 mt-4 sm:mt-0">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" />
          <span>representing Arkansas southern hospitality.</span>
        </p>
      </div>
    </footer>
  );
};
