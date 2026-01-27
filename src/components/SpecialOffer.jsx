
import React, { useState, useEffect, useRef } from 'react';
import { OFFER_SLIDES } from '../constants';

export const SpecialOffer = () => {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  useEffect(() => {
    if (!isHovering) {
      startTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, isHovering]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % OFFER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + OFFER_SLIDES.length) % OFFER_SLIDES.length);
  };

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-block px-4 py-1.5 bg-[#FF5C00]/10 rounded-full mb-4">
            <span className="text-[#FF5C00] font-black text-[10px] uppercase tracking-[0.4em]">Exclusive Vouchers</span>
          </div>
          <h2 className="font-oswald text-4xl md:text-6xl text-gray-900 mb-6 tracking-tighter uppercase font-black">
            WEEKEND <span className="text-[#FF5C00]">HOT DEALS</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 font-medium text-sm leading-relaxed italic">
            "The best things in life are smoked low and slow, and served with a side of savings."
          </p>
        </div>

        {/* Slider Container */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Main Slider Window */}
          <div className="relative h-[450px] md:h-[400px] overflow-hidden rounded-[3rem] shadow-2xl bg-[#fafafa] border border-gray-100">
            <div 
              className="flex h-full transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1)"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {OFFER_SLIDES.map((slide) => (
                <div key={slide.id} className="min-w-full h-full flex flex-col md:flex-row relative">
                  {/* Left: Image Panel */}
                  <div className="md:w-1/2 relative h-1/2 md:h-auto overflow-hidden">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${!isHovering ? 'scale-110' : 'scale-100'}`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    <div className="absolute top-8 left-8 bg-[#FF5C00] text-white font-black px-5 py-2 rounded-xl text-[10px] uppercase tracking-widest shadow-2xl">
                      Verified Offer
                    </div>
                  </div>
                  
                  {/* Right: Ticket Info Panel */}
                  <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative bg-white">
                    {/* Perforation Line Decor */}
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 border-l-[3px] border-dashed border-gray-100"></div>
                    
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[#FF5C00] font-oswald font-black text-2xl uppercase tracking-tighter block">{slide.discount}</span>
                        <h3 className="font-oswald text-3xl md:text-5xl text-gray-900 font-black uppercase leading-none">
                          {slide.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 font-playfair italic text-lg">
                        {slide.subtitle}
                      </p>
                      
                      <div className="flex items-center space-x-6 pt-4">
                        <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#FF5C00] transition-all shadow-xl active:scale-95">
                          Claim Now
                        </button>
                        <div className="hidden sm:block text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                          Expires in: <span className="text-red-500">24 Hours</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Tear-off Circles */}
                    <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-100 rounded-full shadow-inner"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <button 
                 onClick={prevSlide}
                 className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center text-gray-900 hover:bg-[#FF5C00] hover:text-white transition-all pointer-events-auto transform -translate-x-10 group-hover:translate-x-0"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>
               <button 
                 onClick={nextSlide}
                 className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center text-gray-900 hover:bg-[#FF5C00] hover:text-white transition-all pointer-events-auto transform translate-x-10 group-hover:translate-x-0"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                 </svg>
               </button>
            </div>
          </div>

          {/* Indicators & Progress */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            {OFFER_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className="relative h-1 transition-all duration-500 overflow-hidden bg-gray-100 group/ind"
                style={{ width: current === idx ? '60px' : '30px' }}
              >
                <div 
                  className={`absolute inset-0 bg-[#FF5C00] transition-all duration-[5000ms] ease-linear ${current === idx && !isHovering ? 'w-full' : 'w-0'}`}
                ></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
