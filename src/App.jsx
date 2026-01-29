import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Menu } from './components/menu';
import { Stats } from './components/Stats';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Chefs } from './components/Chefs';
import { Footer } from './components/Footer';
import { SpecialOffer } from './components/SpecialOffer';
import { CartSidebar } from './components/CartSidebar';
import { Contact } from './components/Contact';
import { ItemDetails } from './components/ItemDetails';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 150) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewItemDetails = (item) => {
    setSelectedItem(item);
    setCurrentView('item-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <Navbar 
        scrolled={scrolled || currentView !== 'home'} 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        currentView={currentView}
        onNavigate={navigateTo}
      />
      
      <main className="flex-grow animate-[fadeIn_0.5s_ease-out]">
        {currentView === 'home' && (
          <>
            <Hero />
            <div className="reveal"><About /></div>
            <div className="reveal">
              <Menu 
                addToCart={addToCart} 
                onViewDetails={viewItemDetails} 
                limit={6}
                onExploreFullMenu={() => navigateTo('menu')}
              />
            </div>
            <Stats />
            <div className="reveal"><Chefs /></div>
            <SpecialOffer />
            <div className="reveal"><Gallery /></div>
            <div className="reveal"><Testimonials /></div>
          </>
        )}

        {currentView === 'menu' && (
          <div className="pt-20">
            <Menu addToCart={addToCart} onViewDetails={viewItemDetails} fullPage />
          </div>
        )}

        {currentView === 'item-details' && selectedItem && (
          <ItemDetails 
            item={selectedItem} 
            addToCart={addToCart} 
            onBack={() => navigateTo('menu')} 
          />
        )}

        {currentView === 'about' && (
          <div className="pt-20">
            <About fullPage />
            <Chefs />
          </div>
        )}

        {currentView === 'gallery' && (
          <div className="pt-20">
            <Gallery fullPage />
          </div>
        )}

        {currentView === 'contact' && (
          <Contact />
        )}
      </main>

      <Footer />

      {/* Mobile Bottom Navigation App Dock */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] bg-black/90 backdrop-blur-2xl rounded-[2.5rem] p-3 flex justify-between items-center z-[55] shadow-2xl border border-white/10 safe-bottom">
        <button 
          onClick={() => navigateTo('home')}
          className={`flex-1 flex flex-col items-center space-y-1 ${currentView === 'home' ? 'text-[#FF5C00]' : 'text-gray-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="text-[8px] font-bold uppercase tracking-widest">Home</span>
        </button>
        <button 
          onClick={() => navigateTo('menu')}
          className={`flex-1 flex flex-col items-center space-y-1 ${currentView === 'menu' ? 'text-[#FF5C00]' : 'text-gray-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" />
          </svg>
          <span className="text-[8px] font-bold uppercase tracking-widest">Menu</span>
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative -top-10 bg-[#FF5C00] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_15px_30px_rgba(255,92,0,0.4)] border-4 border-black active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-[#FF5C00] text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => navigateTo('gallery')}
          className={`flex-1 flex flex-col items-center space-y-1 ${currentView === 'gallery' ? 'text-[#FF5C00]' : 'text-gray-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <span className="text-[8px] font-bold uppercase tracking-widest">Gallery</span>
        </button>
        <button 
          onClick={() => navigateTo('contact')}
          className={`flex-1 flex flex-col items-center space-y-1 ${currentView === 'contact' ? 'text-[#FF5C00]' : 'text-gray-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-[8px] font-bold uppercase tracking-widest">Call</span>
        </button>
      </div>
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

export default App;