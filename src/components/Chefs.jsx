import React, { useState, useEffect } from 'react';
import { CHEFS } from '../constants';

export const Chefs = () => {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsToShow(3);
      else if (window.innerWidth >= 640) setItemsToShow(2);
      else setItemsToShow(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clamped max index ensures we don't slide into empty space
  const maxIndex = Math.max(0, CHEFS.length - itemsToShow);

  useEffect(() => {
    if (isHovering || maxIndex === 0) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovering, maxIndex]);

  const next = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 transform translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#FF5C00]/10 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
              <span className="text-[#FF5C00] font-oswald text-[10px] tracking-[0.4em] uppercase font-black">Pitmasters</span>
            </div>
            <h2 className="font-oswald text-4xl md:text-7xl text-gray-900 font-black uppercase tracking-tighter leading-[0.85]">
              THE MASTERS OF <br /> <span className="text-[#FF5C00]">FLAME & SMOKE</span>
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#FF5C00] hover:text-[#FF5C00] transition-all group shadow-sm bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-active:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#FF5C00] hover:text-[#FF5C00] transition-all group shadow-sm bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-active:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="overflow-hidden rounded-[3.5rem]">
            <div 
              className="flex -mx-4 transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1)"
              style={{ transform: `translateX(-${current * (100 / itemsToShow)}%)` }}
            >
              {CHEFS.map((chef, idx) => (
                <div 
                  key={`${chef.id}-${idx}`} 
                  className="px-4 shrink-0"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="group relative">
                    <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl bg-gray-50 border-4 border-white transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
                      <img 
                        src={chef.image} 
                        alt={chef.name} 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                        loading="eager"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                         <div className="space-y-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex space-x-3">
                              {['FB', 'IG', 'TW'].map(s => (
                                <button key={s} className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white font-black text-[10px] hover:bg-[#FF5C00] transition-colors border border-white/10">
                                  {s}
                                </button>
                              ))}
                            </div>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                              Expertise in award-winning flame grilling.
                            </p>
                         </div>
                      </div>

                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
                         <span className="font-oswald font-black text-[#FF5C00] text-sm uppercase">10+ Years</span>
                      </div>
                    </div>

                    <div className="mt-10 text-center space-y-2">
                      <span className="text-[#FF5C00] font-black uppercase text-[9px] tracking-[0.4em] block mb-1">
                        {chef.role}
                      </span>
                      <h3 className="text-3xl font-black text-gray-900 font-oswald uppercase tracking-tighter leading-none group-hover:text-[#FF5C00] transition-colors">
                        {chef.name}
                      </h3>
                      <div className="flex justify-center pt-2">
                        <div className="h-1 w-12 bg-gray-100 group-hover:w-24 group-hover:bg-[#FF5C00] transition-all duration-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center items-center space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${current === idx ? 'w-12 bg-[#FF5C00]' : 'w-3 bg-gray-200 hover:bg-gray-300'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};