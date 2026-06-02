import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, Heart, Award, Utensils, Smile } from 'lucide-react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-serif">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  const interiorBg = new URL('../assets/images/hurley_interior_1780405878114.png', import.meta.url).href;

  return (
    <section id="about" className="py-24 bg-cream/30 dark:bg-charcoal/20 relative overflow-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-honey/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-coffee/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Side 1: Imagery, Awards block */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-cream dark:border-charcoal/50 aspect-video lg:aspect-[4/3]"
            >
              <img
                src={interiorBg}
                alt="Cozy interior of Hurley House Café"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Glass overlay with Southern Greeting */}
              <div className="absolute bottom-6 left-6 right-6 bg-charcoal/80 backdrop-blur-md border border-cream/10 p-5 rounded-2xl text-cream">
                <span className="font-script text-lg text-honey">Y'all welcome here!</span>
                <p className="text-xs font-light mt-1 text-cream/90">
                  Step in, take a seat, let us brew you a fresh mug of coffee, and enjoy food made with genuine Southern care.
                </p>
              </div>
            </motion.div>

            {/* Float badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 -right-6 bg-honey text-charcoal p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-cream dark:border-charcoal max-w-[140px] text-center"
            >
              <Award className="w-8 h-8 text-charcoal mb-1" />
              <span className="font-serif font-bold text-sm leading-tight text-coffee">Locals' Choice</span>
              <span className="text-xxs uppercase tracking-wider text-charcoal/75 mt-0.5">Award Winner</span>
            </motion.div>
          </div>

          {/* Side 2: Narrative & Stats */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-honey block">
                Southern Hospitality Story
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-coffee dark:text-cream leading-[1.05] tracking-tight">
                Where Family, Tradition <br />
                & Comfort Meet
              </h2>
              <div className="w-16 h-px bg-coffee/20 dark:bg-cream/15" />
            </div>

            <div className="space-y-4 text-charcoal/80 dark:text-cream/80 text-sm sm:text-base font-light leading-relaxed">
              <p>
                Our story is rooted deep in the heart of Hazen, Arkansas. Hurley House Café became more than a highway stop; it evolved into a community sanctuary, a place where people of all kinds share life across checkerboard tablecloths and steaming coffee mugs.
              </p>
              <p>
                We do things the old-fashioned way. Our buttermilk biscuits are rolled and cut by hand before the sunrise. Our ribeyes are sliced directly in our kitchen daily. Our Arkansas farm-raised catfish is handbreaded in traditional cornmeal flour and fried crispy right when you order. No shortcuts, just authentic comfort crafted with absolute care.
              </p>
              <p className="italic font-normal text-coffee dark:text-honey font-script text-xl pt-2">
                "We keep the grease hot and the smiles authentic."
              </p>
            </div>

            {/* Animated statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-coffee/15 dark:border-cream/15">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-serif font-black text-coffee dark:text-cream">
                  <StatCounter value={40} suffix="+" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.1em] text-charcoal/60 dark:text-cream/60 mt-1 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-honey" /> Years’ Legacy
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-serif font-black text-coffee dark:text-cream">
                  <StatCounter value={100} suffix="k+" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.1em] text-charcoal/60 dark:text-cream/60 mt-1 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-honey" /> Pies Fried
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-serif font-black text-coffee dark:text-cream">
                  <StatCounter value={100} suffix="%" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.1em] text-charcoal/60 dark:text-cream/60 mt-1 flex items-center gap-1">
                  <Smile className="w-3.5 h-3.5 text-honey" /> Welcome Vibe
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
