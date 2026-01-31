
import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '/src/constants.js';

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Slider Images with Ken Burns */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div 
            className={`absolute inset-0 bg-cover bg-center ${idx === current ? 'ken-burns' : ''}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black"></div>
          </div>
        </div>
      ))}

      {/* Floating Badge - Desktop Only */}
      {/* <div className="absolute top-1/4 left-10 md:left-20 hidden xl:block z-30 animate-float">
        <div className="bg-[#FF5C00] w-24 h-24 rounded-full flex flex-col items-center justify-center text-center p-3 border-[3px] border-dashed border-white shadow-[0_20px_60px_rgba(255,92,0,0.5)]">
          <span className="font-oswald text-lg text-white font-black leading-none uppercase">BBQ</span>
          <span className="font-oswald text-sm text-white font-bold leading-none uppercase tracking-tighter">Pit Master</span>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="relative z-40 text-center px-6 max-w-7xl mx-auto flex flex-col items-center pt-24 md:pt-32">
        <div className="mb-4 overflow-hidden">
           <span className="text-[#FFD700] text-sm md:text-xl font-oswald font-black tracking-[0.4em] uppercase block animate-[slideUp_1s_ease-out]">
             {HERO_SLIDES[current].tagline}
           </span>
        </div>
        
        <h1 className="flex flex-col items-center leading-[0.9] mb-8">
           <span className="text-white font-oswald text-4xl sm:text-6xl md:text-7xl lg:text-[9rem] font-black tracking-tighter block animate-[fadeIn_1.2s_ease-out] uppercase">
            {HERO_SLIDES[current].titleMain}
           </span>
           <span className="text-white font-oswald text-4xl sm:text-6xl md:text-7xl lg:text-[9rem] font-black tracking-tighter -mt-1 sm:-mt-3 md:-mt-6 block animate-[fadeIn_1.4s_ease-out] opacity-90 uppercase">
            {HERO_SLIDES[current].titleSub}
           </span>
        </h1>

        <div className="text-[#FFD700] font-playfair italic text-lg sm:text-2xl md:text-3xl mb-12 animate-pulse flex items-center space-x-3 sm:space-x-4">
          <span className="h-[1px] w-6 sm:w-10 bg-[#FFD700] hidden xs:block"></span>
          <span>Thalawathugoda</span>
          <span className="h-[1px] w-6 sm:w-10 bg-[#FFD700] hidden xs:block"></span>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
       
          <div className="text-center md:text-left">
            <h2 className="text-white font-oswald text-lg md:text-2xl font-bold tracking-widest leading-none">
              CALL US: <span className="text-[#FFD700]">+94 77 54 077 67</span>
            </h2>
            {/* <p className="text-white text-[9px] md:text-xs tracking-[0.4em] font-bold uppercase opacity-60 mt-2">
             Thalawathugoda
            </p> */}
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-50">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-500 rounded-full ${current === idx ? 'bg-[#FF5C00] w-10 h-1' : 'bg-white/30 w-2 h-2 hover:bg-white'}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};