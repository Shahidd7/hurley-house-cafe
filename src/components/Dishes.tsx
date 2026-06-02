import React from 'react';
import { motion } from 'motion/react';
import { useApp } from './AppContext';
import { MENU_ITEMS } from '../data';
import { Sparkles, Eye, ShoppingCart, Award, Coffee, Fish, Flame } from 'lucide-react';

export const Dishes: React.FC = () => {
  const { addToCart } = useApp();

  // Resolve generated images
  const pancakesImg = new URL('../assets/images/hurley_pancakes_1780405819565.png', import.meta.url).href;
  const catfishImg = new URL('../assets/images/hurley_catfish_1780405837215.png', import.meta.url).href;
  const burgerImg = new URL('../assets/images/hurley_burger_1780405858047.png', import.meta.url).href;

  // Curated list of featured staples
  const featuredFavorites = [
    {
      menuItem: MENU_ITEMS.find(item => item.id === 'b1') || MENU_ITEMS[0], // Quacks & Stacks
      label: 'Quacks & Stacks Signature Platter',
      tag: 'Morning Glory',
      icon: <Coffee className="w-5 h-5 text-honey" />,
      image: pancakesImg,
      badge: 'Best Seller',
      details: 'Two eggs, choice of bacon, sausage, or ham; half order of warm biscuits & gravy; & two sweet fluffy pancakes.'
    },
    {
      menuItem: MENU_ITEMS.find(item => item.id === 'fs1') || MENU_ITEMS[12], // Catfish Dinner
      label: 'Farm-Raised Catfish Dinner',
      tag: 'Seafood Favorite',
      icon: <Fish className="w-5 h-5 text-honey" />,
      image: catfishImg,
      badge: 'Locals’ Favorite',
      details: 'Two tender premium catfish fillets rolled in seasoned yellow cornmeal, fried golden and served with fries, slaw, and hushpuppies.'
    },
    {
      menuItem: MENU_ITEMS.find(item => item.id === 'bsd1') || MENU_ITEMS[16], // Big Joe Burger
      label: 'The Great Big Joe Burger',
      tag: 'House Burger staple',
      icon: <Flame className="w-5 h-5 text-honey" />,
      image: burgerImg,
      badge: 'Award Winner',
      details: 'Half-pound premium dynamic patty with bacon, melted Colby, Monterey, and Pepper Jack, piled with grilled onions & sautéed mushrooms.'
    },
  ];

  return (
    <section id="featured" className="py-24 bg-cream dark:bg-charcoal/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-honey block">
            Legendary Staple Plates
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-coffee dark:text-cream leading-[1.05] tracking-tight">
            Our Signature Specialties
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 dark:text-cream/70 font-light leading-relaxed">
            Every dish is made to order using premium local ingredients, cooked with age-old recipes handed down for generations.
          </p>
          <div className="w-16 h-px bg-coffee/20 dark:bg-cream/15 mx-auto mt-4" />
        </div>

        {/* Featured Plates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredFavorites.map((fav, idx) => (
            <motion.div
              key={fav.menuItem.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group bg-[#FFFDF9]/40 dark:bg-charcoal/40 rounded-none border border-coffee/15 dark:border-cream/10 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between"
              id={`featured-card-${fav.menuItem.id}`}
            >
              {/* Photo top & tag overlay */}
              <div className="relative overflow-hidden aspect-video cursor-pointer">
                <img
                  src={fav.image}
                  alt={fav.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-65 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Label Category badge */}
                <div className="absolute top-4 left-4 bg-charcoal/80 border border-cream/10 text-cream text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-none backdrop-blur-sm shadow flex items-center space-x-1">
                  {fav.icon}
                  <span>{fav.tag}</span>
                </div>

                {/* Main Special Tag */}
                <div className="absolute bottom-4 right-4 bg-honey text-charcoal font-sans font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-none shadow-md flex items-center space-x-1">
                  <Award className="w-3 h-3" />
                  <span>{fav.badge}</span>
                </div>
              </div>

              {/* Informational content */}
              <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-coffee dark:text-cream leading-tight hover:text-honey dark:hover:text-honey transition-colors">
                      {fav.menuItem.name}
                    </h3>
                    <span className="font-serif text-lg font-black text-honey sm:text-xl shrink-0 ml-2">
                      ${fav.menuItem.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/70 dark:text-cream/70 font-light leading-relaxed">
                    {fav.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-coffee/10 dark:border-cream/10 flex items-center gap-3 w-full">
                  <button
                    onClick={() => {
                      const element = document.querySelector(`#menu-detail-btn-${fav.menuItem.id}`) as HTMLButtonElement | null;
                      if (element) {
                        element.click();
                      } else {
                        // fallback scroll to menu
                        const menuSection = document.querySelector('#menu');
                        if (menuSection) {
                          menuSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 border border-coffee/15 dark:border-cream/15 text-coffee dark:text-cream text-xs uppercase tracking-widest font-bold px-4 py-3 hover:bg-coffee/5 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Customize</span>
                  </button>

                  <button
                    onClick={() => addToCart(fav.menuItem, 1)}
                    className="bg-coffee hover:bg-honey dark:bg-honey dark:hover:bg-coffee text-cream dark:text-charcoal dark:hover:text-cream p-3 rounded-none transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center"
                    aria-label="Quick Add to Order"
                  >
                    <ShoppingCart className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
