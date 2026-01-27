
import React from 'react';
import { CHEFS } from '../constants';

export const Chefs = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
       <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#FF5C00]/10 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
            <span className="text-[#FF5C00] font-oswald text-[10px] tracking-[0.3em] uppercase font-black">Our Specialties</span>
          </div>
          <h2 className="font-oswald text-4xl md:text-6xl text-gray-900 font-black uppercase tracking-tighter leading-none">
            The <span className="text-[#FF5C00]">Pitmaster's</span> Menu
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 font-medium text-sm">
            Hand-selected cuts, seasoned with our secret dry rubs and smoked low and slow for up to 14 hours.
          </p>
        </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {CHEFS.map((chef) => (
          <div key={chef.id} className="group relative">
            <div className="relative h-[400px] overflow-hidden rounded-[30px] bg-gray-100 shadow-xl border-4 border-white">
              <img src={chef.image} alt={chef.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
            <div className="mt-8 text-center px-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-oswald uppercase">{chef.name}</h3>
              <p className="text-gray-400 font-bold tracking-[0.3em] uppercase text-[9px]">{chef.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
