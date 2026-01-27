
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Menu } from './components/menu';
import { Stats } from './components/stats';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Chefs } from './components/Chefs';
import { SpecialOffer } from './components/SpecialOffer';
import { CartSidebar } from './components/CartSidebar';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
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
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar 
        scrolled={scrolled || currentView !== 'home'} 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        currentView={currentView}
        onNavigate={navigateTo}
      />
      
      <main className="animate-[fadeIn_0.5s_ease-out]">
        {currentView === 'home' && (
          <>
            <Hero />
            <div className="reveal"><About /></div>
            <div className="reveal"><Menu addToCart={addToCart} onViewDetails={viewItemDetails} /></div>
             <SpecialOffer />
            
            <div className="reveal"><Chefs /></div>
           <Stats />
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
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;
