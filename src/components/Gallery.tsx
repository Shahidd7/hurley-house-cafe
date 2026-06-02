import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Sparkles, Image as ImageIcon, ZoomIn, Heart } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Resolve generated local images
  const pancakesImg = new URL('../assets/images/hurley_pancakes_1780405819565.png', import.meta.url).href;
  const catfishImg = new URL('../assets/images/hurley_catfish_1780405837215.png', import.meta.url).href;
  const burgerImg = new URL('../assets/images/hurley_burger_1780405858047.png', import.meta.url).href;
  const interiorImg = new URL('../assets/images/hurley_interior_1780405878114.png', import.meta.url).href;

  const categories = ['All', 'Food', 'Ambiance'];

  // Map keywords inside data down to real resolved paths
  const resolvedGalleryItems = useMemo(() => {
    return GALLERY_ITEMS.map((item) => {
      let finalImg = item.image;
      if (item.image === 'pancakes') finalImg = pancakesImg;
      else if (item.image === 'catfish') finalImg = catfishImg;
      else if (item.image === 'burger') finalImg = burgerImg;
      else if (item.image === 'interior') finalImg = interiorImg;
      return {
        ...item,
        image: finalImg
      };
    });
  }, [pancakesImg, catfishImg, burgerImg, interiorImg]);

  // Filter gallery items
  const filteredGallery = useMemo(() => {
    if (activeTab === 'All') return resolvedGalleryItems;
    if (activeTab === 'Food') {
      return resolvedGalleryItems.filter(item => item.category !== 'Ambiance');
    }
    return resolvedGalleryItems.filter(item => item.category === 'Ambiance');
  }, [activeTab, resolvedGalleryItems]);

  return (
    <section id="gallery" className="py-24 bg-cream/30 dark:bg-charcoal/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-honey block">
            Visual Comfort Food
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-coffee dark:text-cream leading-[1.05] tracking-tight">
            Our Kitchen In Frame
          </h2>
          <div className="w-16 h-px bg-coffee/20 dark:bg-cream/15 mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-charcoal/70 dark:text-cream/70 font-light max-w-md mx-auto leading-relaxed">
            Take a visual tour through our kitchen, warm booths, daily specials, and homemade Southern sweet delicacies.
          </p>
        </div>

        {/* Gallery Filters */}
        <div className="flex items-center justify-center space-x-2 mb-12">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-none font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-coffee text-cream dark:bg-honey dark:text-charcoal'
                  : 'bg-cream dark:bg-charcoal text-charcoal/80 dark:text-cream/80 hover:bg-coffee/5 border border-coffee/10 dark:border-cream/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry Columns Container */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => {
              // Custom height classes based on aspect setting to mimic real masonry rhythm
              const aspectClass =
                item.aspect === 'portrait'
                  ? 'aspect-[3/4]'
                  : item.aspect === 'landscape'
                  ? 'aspect-[4/3]'
                  : 'aspect-square';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`relative overflow-hidden rounded-none group shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer border border-coffee/10 dark:border-cream/10 bg-cream dark:bg-charcoal break-inside-avoid mb-6 flex flex-col`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient visual glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                    {/* Zoom details identifier */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="p-3 bg-honey/90 text-charcoal rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-5 h-5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Caption block */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-cream">
                      <span className="text-xxs uppercase tracking-wider text-honey font-bold">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-extrabold mt-1 tracking-tight">
                        {item.title}
                      </h4>
                    </div>

                    {/* Simple Love button inside image overlay */}
                    <div className="absolute top-4 right-4 bg-charcoal/60 hover:bg-honey/90 hover:text-charcoal text-cream/90 p-2 rounded-full backdrop-blur-md border border-cream/10 shadow transition-colors w-9 h-9 flex items-center justify-center">
                      <Heart className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Small gallery message */}
        <div className="text-center mt-12 text-xxs sm:text-xs text-charcoal/50 dark:text-cream/40 flex items-center justify-center gap-1.5 uppercase tracking-wider font-medium">
          <Sparkles className="w-4 h-4 text-honey" />
          <span>Follow along on Facebook & Google Maps for daily kitchen snippets!</span>
        </div>

      </div>
    </section>
  );
};
