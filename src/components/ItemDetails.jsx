
import React, { useState, useEffect } from 'react';

export const ItemDetails = ({ item, addToCart, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [soldLevel, setSoldLevel] = useState(item.selectedSold || 'Low');
  const [spicyLevel, setSpicyLevel] = useState(item.selectedSpicy || 'Low');

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  if (!item) return null;

  const handleAddToCart = () => {
    addToCart({ ...item, selectedSold: soldLevel, selectedSpicy: spicyLevel }, quantity);
  };

  const totalPrice = (item.priceValue * quantity).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Overlay */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto group flex items-center space-x-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-gray-100 transition-all hover:bg-black hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-oswald text-[10px] font-black uppercase tracking-[0.3em]">Back to Pit</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side: Fixed Visual */}
        <div className="lg:w-[55%] relative h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-gray-100">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover animate-[kenBurnsDetail_30s_linear_infinite_alternate]" 
          />
          {/* Subtle vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
          
          {/* Bottom Branding (Left) */}
          <div className="absolute bottom-12 left-12 hidden lg:block">
            <div className="text-white/40 font-oswald text-[10vw] font-black leading-none select-none">
              #GRILL
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable Details */}
        <div className={`flex-1 flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <div className="max-w-xl">
            {/* Header Tags */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="bg-[#FF5C00] text-white px-4 py-1.5 rounded-lg font-black uppercase text-[9px] tracking-[0.3em]">
                {item.category}
              </span>
              <span className="text-gray-300 font-oswald text-[10px] uppercase tracking-widest">
                ID: BRN-00{item.id}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-6 mb-12">
              <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl text-gray-900 font-black uppercase tracking-tighter leading-[0.85]">
                {item.name}
              </h1>
              <div className="h-1.5 w-24 bg-[#FF5C00]"></div>
              <p className="font-playfair italic text-2xl text-gray-400 leading-relaxed">
                "{item.description}"
              </p>
              <p className="text-gray-500 text-sm leading-loose">
                Masterfully seasoned with a proprietary blend of smoky spices, our signature {item.name.toLowerCase()} is slow-roasted over natural hardwood to ensure a flavor profile that is deep, complex, and unforgettably tender. A cornerstone of the Grill House tradition.
              </p>
            </div>

            {/* Customization Grid */}
            <div className="grid grid-cols-2 gap-8 mb-12 border-t border-gray-100 pt-12">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF5C00]">Select Sold Level</h4>
                <div className="relative">
                  <select 
                    value={soldLevel}
                    onChange={(e) => setSoldLevel(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest text-gray-900 focus:outline-none focus:border-[#FF5C00] cursor-pointer appearance-none shadow-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF5C00]">Select Spicy Level</h4>
                <div className="relative">
                  <select 
                    value={spicyLevel}
                    onChange={(e) => setSpicyLevel(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest text-gray-900 focus:outline-none focus:border-[#FF5C00] cursor-pointer appearance-none shadow-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Quantity Selection */}
            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Price</span>
                  <p className="font-oswald text-4xl text-gray-900 font-black">Rs. {totalPrice}</p>
                </div>
                
                <div className="flex items-center justify-center space-x-6 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black transition-colors font-bold text-2xl"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-oswald text-2xl font-black text-gray-900">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black transition-colors font-bold text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white px-10 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:bg-[#FF5C00] transition-all shadow-2xl flex items-center justify-center space-x-4 group"
              >
                <span>Add to Pit Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="flex-1 border-2 border-black text-black px-10 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:bg-black hover:text-white transition-all shadow-xl">
                Order Instantly
              </button>
            </div>
            
            {/* Delivery Info */}
            <div className="mt-8 flex items-center justify-center md:justify-start space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">In Stock</span>
              </div>
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kenBurnsDetail {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.25); }
        }
      `}</style>
    </div>
  );
};
