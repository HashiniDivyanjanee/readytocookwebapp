import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'; // ඔබේ firebase path එක නිවැරදිදැයි බලන්න
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export const SpecialOffer = () => {
  const [offers, setOffers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  // 1. Firestore එකෙන් Offers ලබා ගැනීම
  useEffect(() => {
    const q = query(collection(db, "offers"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOffers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Slider Timer එක පාලනය කිරීම
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (offers.length > 0) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  };

  useEffect(() => {
    if (!isHovering && !loading) {
      startTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, isHovering, loading, offers.length]);

  const nextSlide = () => {
    setOffers((prevOffers) => {
      if (prevOffers.length === 0) return prevOffers;
      setCurrent((curr) => (curr + 1) % prevOffers.length);
      return prevOffers;
    });
  };

  const prevSlide = () => {
    if (offers.length === 0) return;
    setCurrent((prev) => (prev - 1 + offers.length) % offers.length);
  };

  if (loading) return null; // හෝ ලස්සන skeleton loader එකක්
  if (offers.length === 0) return null; // Offers නැත්නම් section එකම පෙන්වන්න එපා

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
        </div>

        <div 
          className="relative group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Main Slider Window */}
          <div className="relative h-[500px] md:h-[450px] overflow-hidden rounded-[3rem] shadow-2xl bg-[#fafafa] border border-gray-100">
            <div 
              className="flex h-full transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {offers.map((slide) => (
                <div key={slide.id} className="min-w-full h-full flex flex-col md:flex-row relative">
                  {/* Left: Image Panel */}
                  <div className="md:w-1/2 relative h-1/2 md:h-auto overflow-hidden">
                    <img 
                      src={slide.image} 
                      alt={slide.name} 
                      className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${!isHovering ? 'scale-110' : 'scale-100'}`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                  </div>
                  
                  {/* Right: Info Panel */}
                  <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative bg-white">
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 border-l-[3px] border-dashed border-gray-100"></div>
                    
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[#FF5C00] font-oswald font-black text-2xl uppercase tracking-tighter block">
                          {slide.discount || "Special Offer"}
                        </span>
                        <h3 className="font-oswald text-3xl md:text-5xl text-gray-900 font-black uppercase leading-none">
                          {slide.name}
                        </h3>
                      </div>
                      <p className="text-gray-400 font-playfair italic text-lg">
                        {slide.subtitle}
                      </p>
                      
                      <div className="flex items-center space-x-6 pt-4">
                        <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#FF5C00] transition-all shadow-xl">
                          Claim Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-auto hover:bg-[#FF5C00] hover:text-white transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>
               <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-auto hover:bg-[#FF5C00] hover:text-white transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                 </svg>
               </button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center items-center space-x-4 mt-10">
            {offers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${current === idx ? 'w-12 bg-[#FF5C00]' : 'w-4 bg-gray-200'}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};