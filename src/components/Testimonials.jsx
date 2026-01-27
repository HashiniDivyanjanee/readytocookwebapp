
import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setItemsPerRow(1);
      else setItemsPerRow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerRow);

  const next = () => setCurrent((prev) => (prev + 1) % totalPages);
  const prev = () => setCurrent((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight uppercase">
          What They <span className="text-[#FF5C00]">Say</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIdx) => (
              <div key={pageIdx} className="w-full flex-shrink-0 flex flex-wrap lg:flex-nowrap">
                {TESTIMONIALS.slice(pageIdx * itemsPerRow, (pageIdx + 1) * itemsPerRow).map((item) => (
                  <div key={item.id} className={`w-full ${itemsPerRow === 3 ? 'lg:w-1/3' : 'w-full'} px-4 mb-8`}>
                    <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center h-full relative group">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-white shadow-xl" />
                      <p className="text-gray-600 italic mb-8 leading-relaxed font-medium">"{item.content}"</p>
                      <h4 className="font-oswald font-bold text-xl text-gray-900 uppercase tracking-tight">{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12 space-x-4">
          <button onClick={prev} className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#FF5C00] hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={next} className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#FF5C00] hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
