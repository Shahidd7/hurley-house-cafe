import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from './AppContext';
import { MENU_ITEMS } from '../data';
import { MenuItem, MenuItemCategory } from '../types';
import { Search, Info, Plus, Minus, ShoppingBag, Eye, Heart, Leaf, HelpCircle, Check } from 'lucide-react';

export const Menu: React.FC = () => {
  const { addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  
  // Customization modal states
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Main Category Groups
  const categoriesMap = useMemo(() => {
    return [
      { label: 'All Dishes', value: 'All' },
      { label: 'Breakfast Platters', value: 'Breakfast' },
      { label: 'Omelets', value: 'Omelets' },
      { label: 'Biscuits', value: 'Southern Style Biscuits' },
      { label: 'Pancakes', value: 'Pancakes' },
      { label: 'Burgers & Sandwiches', value: 'Burgers & Sandwiches' },
      { label: 'Fish & Seafood', value: 'Fish & Shrimp' },
      { label: 'Dinner Mains', value: 'Lunch & Dinner' },
      { label: 'Fried Pies', value: 'Fried Pies' },
      { label: 'Sides', value: 'Sides' },
      { label: 'Beverages', value: 'Beverages' },
    ];
  }, []);

  // Filter items based on activeCategory AND searchQuery
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  // Open item customizing prompt
  const handleOpenCustomizer = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setQuantity(1);
    setSpecialInstructions('');
    
    // Auto-populate context-aware add-ons
    let defaultAddons: { name: string; price: number }[] = [];
    if (item.category === 'Southern Style Biscuits' || item.category === 'Breakfast Sandwiches') {
      defaultAddons = [
        { name: 'Add Egg', price: 1.00 },
        { name: 'Add Melted Cheese', price: 0.50 },
        { name: 'Extra Bacon', price: 2.00 },
      ];
    } else if (item.category === 'Burgers & Sandwiches' || item.category === 'Lunch & Dinner') {
      defaultAddons = [
        { name: 'Make it a Special (Fries + Drink)', price: 3.99 },
        { name: 'Add Crispy Bacon', price: 2.00 },
        { name: 'Add Extra Cheese', price: 1.25 },
        { name: 'Add Chili Sub', price: 1.25 },
      ];
    } else if (item.category === 'Pancakes' || item.category === 'Breakfast') {
      defaultAddons = [
        { name: 'Add Real Whipped Ice Cream', price: 1.79 },
        { name: 'Double Syrup Packets', price: 0.50 },
        { name: 'Fresh Blueberries Topping', price: 1.25 },
      ];
    } else if (item.category === 'Fried Pies') {
      defaultAddons = [
        { name: 'Add Scoop Vanilla Ice cream', price: 1.79 },
      ];
    }
    setSelectedAddons([]);
    // Assign to item dynamic addon properties
    item.addons = defaultAddons;
  };

  const handleToggleAddon = (addon: { name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) {
        return prev.filter((a) => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleConfirmCustomization = () => {
    if (!selectedItemForModal) return;

    const cuts = selectedAddons.map((a) => `${a.name} (+$${a.price.toFixed(2)})`);
    if (specialInstructions.trim()) {
      cuts.push(`Note: "${specialInstructions}"`);
    }

    const calculatedPrice = selectedItemForModal.price + selectedAddons.reduce((acc, a) => acc + a.price, 0);
    const customizedItem: MenuItem = {
      ...selectedItemForModal,
      price: calculatedPrice
    };

    addToCart(customizedItem, quantity, cuts);
    setSelectedItemForModal(null);
  };

  return (
    <section id="menu" className="py-24 bg-cream/70 dark:bg-charcoal/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-honey block">
            Scratch-Made Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-coffee dark:text-cream leading-[1.05] tracking-tight">
            Browse Our Full Table
          </h2>
          <div className="w-16 h-px bg-coffee/20 dark:bg-cream/15 mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-charcoal/70 dark:text-cream/70 font-light leading-relaxed">
            Southern favorites served fresh six days a week. Search key comfort ingredients or filter by meal category instantly.
          </p>
        </div>

        {/* Search and Filters Hub */}
        <div className="space-y-6 mb-12">
          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Catfish, Pancakes, Western Omelet, Chili)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFDF9]/80 dark:bg-charcoal border border-coffee/20 dark:border-cream/10 rounded-none py-3.5 pl-11 pr-16 outline-none focus:ring-1 focus:ring-honey text-xs uppercase tracking-wider font-semibold text-charcoal dark:text-cream dark:placeholder:text-cream/40 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold bg-coffee/10 dark:bg-cream/10 text-charcoal dark:text-cream px-2.5 py-1 hover:bg-honey"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Categories Bar */}
          <div className="overflow-x-auto no-scrollbar py-2">
            <div className="flex space-x-2.5 justify-start lg:justify-center min-w-max px-4">
              {categoriesMap.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2.5 rounded-none font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat.value
                      ? 'bg-coffee text-cream dark:bg-honey dark:text-charcoal'
                      : 'bg-[#FFFDF9]/60 dark:bg-charcoal text-charcoal/80 dark:text-cream/80 hover:bg-coffee/5 border border-coffee/10 dark:border-cream/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Listings Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group bg-[#FFFDF9]/40 dark:bg-charcoal/40 border border-coffee/15 dark:border-cream/10 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Top block */}
                <div className="p-5 sm:p-6 space-y-3.5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Flags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold bg-coffee/5 dark:bg-cream/5 text-honey px-2.5 py-1 rounded-none uppercase tracking-widest border border-coffee/10">
                        {item.subcategory}
                      </span>
                      {item.isPopular && (
                        <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-none font-bold uppercase tracking-wider flex items-center gap-0.5">
                          <Heart className="w-2.5 h-2.5 fill-current" /> Popular
                        </span>
                      )}
                      {item.isGlutenFree && (
                        <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-none font-bold uppercase tracking-wider flex items-center gap-0.5">
                          <Leaf className="w-2.5 h-2.5" /> GF
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-start gap-2 pt-1">
                      <h3 className="font-serif text-lg font-bold text-coffee dark:text-cream group-hover:text-honey dark:group-hover:text-honey transition-colors pr-2 leading-tight">
                        {item.name}
                      </h3>
                      <span className="font-serif font-black text-coffee dark:text-honey text-base sm:text-lg shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-charcoal/70 dark:text-cream/75 font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions row */}
                  <div className="pt-4 border-t border-coffee/10 dark:border-cream/5 flex items-center justify-between mt-4">
                    {/* Details modal launcher */}
                    <button
                      id={`menu-detail-btn-${item.id}`}
                      onClick={() => handleOpenCustomizer(item)}
                      className="text-xs uppercase tracking-wider font-bold text-coffee/70 dark:text-cream/70 hover:text-honey dark:hover:text-honey flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Customize Options</span>
                    </button>

                    {/* Fast add button */}
                    <button
                      onClick={() => addToCart(item, 1)}
                      className="bg-coffee/5 dark:bg-cream/5 hover:bg-honey dark:hover:bg-honey text-coffee dark:text-cream hover:text-charcoal dark:hover:text-charcoal p-1.5 rounded-none transition-all duration-300 flex items-center justify-center border border-coffee/10 dark:border-cream/5"
                      title="Quick Add to Order"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-4">
              <HelpCircle className="w-12 h-12 text-honey mx-auto animate-bounce" />
              <h3 className="font-serif text-xl font-bold text-coffee dark:text-cream">No dishes match your filters</h3>
              <p className="text-sm text-charcoal/60 dark:text-cream/60 max-w-sm mx-auto">
                Try searching for something else, or check your spellings (e.g. Try searching for "Catfish", "Ribeye", "Pecan").
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* --- CUSTOMIZATION MODAL (drawer style) --- */}
      <AnimatePresence>
        {selectedItemForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemForModal(null)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />

            {/* Customizer Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative bg-cream dark:bg-charcoal w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-coffee/20 dark:border-cream/15 z-10 flex flex-col justify-between max-h-[85vh]"
            >
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xxs uppercase tracking-wider text-honey font-bold bg-honey/15 px-2.5 py-1 rounded-full">
                      {selectedItemForModal.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-coffee dark:text-cream mt-2">
                      {selectedItemForModal.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedItemForModal(null)}
                    className="p-1 rounded-full hover:bg-coffee/5 dark:hover:bg-cream/10 text-charcoal dark:text-cream"
                  >
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                {/* Info and price */}
                <p className="text-xs sm:text-sm text-charcoal/80 dark:text-cream/80 font-light leading-relaxed">
                  {selectedItemForModal.description}
                </p>

                {/* Dynamic Addon Options */}
                {selectedItemForModal.addons && selectedItemForModal.addons.length > 0 && (
                  <div className="space-y-3">
                    <span className="font-sans text-xs font-bold text-coffee dark:text-cream tracking-wide uppercase block">
                      Add Custom Toppings / Combos
                    </span>
                    <div className="space-y-2">
                      {selectedItemForModal.addons.map((addon) => {
                        const isChecked = selectedAddons.some((a) => a.name === addon.name);
                        return (
                          <button
                            key={addon.name}
                            onClick={() => handleToggleAddon(addon)}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                              isChecked
                                ? 'bg-honey/10 border-honey text-honey font-medium'
                                : 'bg-cream/50 dark:bg-charcoal/50 border-coffee/10 dark:border-cream/5 text-charcoal dark:text-cream/80 hover:border-coffee/30 dark:hover:border-cream/20'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 text-sm">
                              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                isChecked ? 'bg-honey border-honey text-charcoal' : 'border-coffee/30 dark:border-cream/25'
                              }`}>
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span>{addon.name}</span>
                            </div>
                            <span className="text-xs font-bold text-honey">
                              +${addon.price.toFixed(2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cooking / Preparation Instructions */}
                <div className="space-y-2">
                  <span className="font-sans text-xs font-bold text-coffee dark:text-cream tracking-wide uppercase block">
                    Special Preparation Notes (Optional)
                  </span>
                  <textarea
                    placeholder="E.g. No onions, poached soft eggs, substitute fruit salad, ranch on side..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={2}
                    className="w-full text-xs sm:text-sm bg-cream/30 dark:bg-charcoal/40 border border-coffee/15 dark:border-cream/5 rounded-xl p-3 outline-none focus:ring-1 focus:ring-honey font-sans text-charcoal dark:text-cream"
                  />
                </div>

                {/* Quantity adjuster */}
                <div className="flex items-center justify-between pt-4 border-t border-coffee/10 dark:border-cream/10">
                  <span className="font-sans text-xs font-bold text-coffee dark:text-cream uppercase tracking-wider">
                    Select Quantity
                  </span>
                  <div className="flex items-center space-x-4 bg-coffee/5 dark:bg-cream/5 px-4 py-2.5 rounded-full border border-coffee/5 dark:border-cream/5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-charcoal dark:text-cream hover:text-honey"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-sans font-bold text-sm text-coffee dark:text-cream w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 text-charcoal dark:text-cream hover:text-honey"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Order total footer */}
              <div className="p-6 bg-coffee/5 dark:bg-charcoal/80 border-t border-coffee/10 dark:border-cream/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xxs uppercase tracking-wider text-charcoal/50 dark:text-cream/50 font-bold leading-none">
                    Calculated Price
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-black text-coffee dark:text-honey mt-1">
                    ${((selectedItemForModal.price + selectedAddons.reduce((acc, a) => acc + a.price, 0)) * quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleConfirmCustomization}
                  className="bg-honey hover:bg-honey/90 text-charcoal font-sans font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Order</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
