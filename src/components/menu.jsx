import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// 'All' යන්න මුලට එක් කරන ලදී
const CATEGORIES = ['All', 'Chicken', 'Beef', 'Pork', 'Sea Food'];

// MenuItemCard කොම්පෝනන්ට් එක වෙනස් නොවේ...
const MenuItemCard = ({ item, index, addToCart, onViewDetails }) => {
  const [soldLevel, setSoldLevel] = useState('Low');
  const [spicyLevel, setSpicyLevel] = useState('Low');

  return (
    <div 
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col border border-gray-100/50 cursor-pointer"
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={() => onViewDetails(item)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
          <span className="font-oswald font-black text-[#FF5C00] text-lg">
            Rs. {item.price}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               addToCart({ ...item, selectedSold: soldLevel, selectedSpicy: spicyLevel });
             }}
             className="bg-white text-gray-900 w-14 h-14 rounded-full flex items-center justify-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl hover:bg-[#FF5C00] hover:text-white"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
             </svg>
           </button>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#FF5C00] font-black uppercase text-[9px] tracking-widest">{item.category}</span>
          </div>
          <h3 className="font-oswald text-2xl font-bold text-gray-900 group-hover:text-[#FF5C00] transition-colors leading-tight uppercase">
            {item.name}
          </h3>
        </div>
        
        <p className="text-gray-500 text-sm font-medium leading-relaxed flex-1">
          {item.desc}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-50">
          <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Sold Level</label>
            <select 
              value={soldLevel}
              onChange={(e) => setSoldLevel(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-900 focus:outline-none focus:border-[#FF5C00] cursor-pointer"
            >
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Spicy Level</label>
            <select 
              value={spicyLevel}
              onChange={(e) => setSpicyLevel(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-900 focus:outline-none focus:border-[#FF5C00] cursor-pointer"
            >
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customizable</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ ...item, selectedSold: soldLevel, selectedSpicy: spicyLevel });
            }}
            className="font-oswald text-xs font-black uppercase tracking-widest text-[#FF5C00] hover:text-gray-900 transition-colors"
          >
            Add to Cart +
          </button>
        </div>
      </div>
    </div>
  );
};

export const Menu = ({ addToCart, onViewDetails, fullPage, limit, onExploreFullMenu }) => {
  const [activeCategory, setActiveCategory] = useState('All'); // Default 'All'
  const [searchTerm, setSearchTerm] = useState(''); // Search state
  const [animate, setAnimate] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMenuData(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [activeCategory, searchTerm]);

  // Filtering Logic (Category + Search)
  const filteredItems = menuData
    .filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .slice(0, limit || menuData.length);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5C00]"></div>
      </div>
    );
  }

  return (
    <section id="menu" className={`${fullPage ? 'bg-white' : 'bg-[#f8f8f8]'} overflow-hidden`}>
      {fullPage && (
        <div className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-black mb-12">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-white"></div>
          </div>
          <div className="relative z-10 text-center space-y-4 px-4">
            <span className="text-[#FF5C00] font-oswald text-xs tracking-[0.6em] uppercase font-black block">The Pit Menu</span>
            <h1 className="text-white font-oswald text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
              SMOKY <span className="text-[#FF5C00]">FLAVORS</span>
            </h1>
            
            {/* SEARCH BAR - Only shows on Full Page */}
            <div className="mt-8 max-w-xl mx-auto relative group">
              <input 
                type="text"
                placeholder="Search your favorite meal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF5C00] transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {!fullPage && (
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#FF5C00]/10 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
              <span className="text-[#FF5C00] font-oswald text-[10px] tracking-[0.3em] uppercase font-black">Our Specialties</span>
            </div>
            <h2 className="font-oswald text-4xl md:text-6xl text-gray-900 font-black uppercase tracking-tighter">
              The <span className="text-[#FF5C00]">Pitmaster's</span> Menu
            </h2>
          </div>
        )}

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black transition-all duration-300 uppercase tracking-[0.2em] border-2
                ${activeCategory === cat 
                  ? 'bg-[#FF5C00] border-[#FF5C00] text-white shadow-xl scale-105' 
                  : 'bg-white border-gray-100 text-gray-400 hover:text-gray-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {filteredItems.map((item, index) => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                index={index} 
                addToCart={addToCart} 
                onViewDetails={onViewDetails} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400 italic">No items found matching your search.</h3>
          </div>
        )}

        {!fullPage && (
          <div className="mt-20 text-center">
             <button 
               onClick={onExploreFullMenu}
               className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#FF5C00] transition-all shadow-2xl"
             >
               Explore Full Menu
             </button>
          </div>
        )}
      </div>
    </section>
  );
};