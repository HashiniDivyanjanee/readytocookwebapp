
import React from 'react';
import { CHEFS } from '../constants';

export const Chefs = () => {
  const isSingle = CHEFS.length === 1;

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gray-50 -skew-x-12 transform translate-x-1/2 pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Centered Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#FF5C00]/10 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
            <span className="text-[#FF5C00] font-oswald text-[10px] tracking-[0.4em] uppercase font-black">
              {isSingle ? 'Our Chef' : 'Our Chef'}
            </span>
          </div>
          <h2 className="font-oswald text-4xl md:text-7xl text-gray-900 font-black uppercase tracking-tighter leading-[0.85]">
            MASTERS OF <br /> <span className="text-[#FF5C00]">MEAT PREPARER</span>
          </h2>
        </div>

        {isSingle ? (
          /* Single Chef Featured Spotlight */
          <div className="flex flex-col lg:flex-row items-center gap-16 animate-[fadeIn_1s_ease-out]">
            <div className="lg:w-1/2 relative group">
              <div className="relative aspect-[4/5] md:aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white transform hover:-translate-y-2 transition-transform duration-500">
                <img 
                  src={CHEFS[0].image} 
                  alt={CHEFS[0].name} 
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                <div className="absolute bottom-10 left-10">
                   <span className="text-white font-oswald text-4xl font-bold uppercase tracking-tighter">{CHEFS[0].name}</span>
                   <p className="text-[#FF5C00] font-black uppercase text-[10px] tracking-widest mt-1">{CHEFS[0].role}</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FF5C00] rounded-full flex flex-col items-center justify-center text-white font-oswald shadow-2xl border-4 border-white rotate-12">
                 <span className="text-xs font-black uppercase tracking-widest">Est.</span>
                 <span className="text-2xl font-black">1984</span>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h3 className="font-oswald text-3xl font-black text-gray-900 uppercase tracking-tight">Meat Quality Expert</h3>
              <p className="text-gray-500 text-lg leading-relaxed italic font-playfair">
                "{CHEFS[0].bio}"
              </p>
              <div className="h-1 w-20 bg-[#FF5C00]"></div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                   <h4 className="font-black text-[10px] uppercase tracking-widest text-[#FF5C00] mb-2">Expertise</h4>
                   <p className="font-bold text-gray-900">10+</p>
                </div>
                <div>
                   <h4 className="font-black text-[10px] uppercase tracking-widest text-[#FF5C00] mb-2">Awards</h4>
                   <p className="font-bold text-gray-900">3+</p>
                </div>
              </div>
              {/* <div className="flex space-x-6 pt-6">
                {Object.keys(CHEFS[0].socials).map(key => (
                  <a key={key} href={CHEFS[0].socials[key]} className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#FF5C00] hover:text-white transition-all uppercase text-[10px] font-black">
                    {key[0]}
                  </a>
                ))}
              </div> */}
            </div>
          </div>
        ) : (
          /* Multi-Chef Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {CHEFS.map(chef => (
              <div key={chef.id} className="group">
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-xl border-4 border-white transition-all duration-500 group-hover:-translate-y-4">
                  <img src={chef.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <p className="text-white font-bold uppercase text-[10px] tracking-widest">{chef.bio.substring(0, 50)}...</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <h4 className="font-oswald text-2xl font-black uppercase text-gray-900">{chef.name}</h4>
                  <p className="text-[#FF5C00] font-black uppercase text-[10px] tracking-widest mt-1">{chef.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
