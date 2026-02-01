import React, { useState, useEffect } from "react";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/about";
import { Menu } from "./components/menu";
import { Stats } from "./components/stats";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { Chefs } from "./components/Chefs";
import { Footer } from "./components/Footer";
import { SpecialOffer } from "./components/SpecialOffer";
import { CartSidebar } from "./components/CartSidebar";
import { Contact } from "./components/Contact";
import { ItemDetails } from "./components/ItemDetails";
import AdminDashboard from "./components/AdminDashboard";
import RiderDashboard from "./components/admin/RiderDashboard";
import { auth, db } from "./firebase";
import { Routes, Route, Navigate } from "react-router-dom";
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 150) {
          reveal.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Login Success Handler ---
  const handleLoginSuccess = (role, user) => {
    setUserRole(role);
    setCurrentUser(user);

    if (role === "rider") {
      setCurrentView("rider-dashboard");
    } else if (role === "admin") {
      setCurrentView("admin-dashboard");
    } else {
      setCurrentView("home");
    }
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewItemDetails = (item) => {
    setSelectedItem(item);
    setCurrentView("item-details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      const priceValue = parseFloat(item.price) || 0;
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prevCart, { ...item, quantity, priceValue }];
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
      }),
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // --- Rendering ---
  return (
    <div className="min-h-screen bg-white">
      {userRole !== "rider" && (
        <Navbar
          scrolled={scrolled || currentView !== "home"}
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          currentView={currentView}
          onNavigate={navigateTo}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {userRole === "rider" && (
        <div className="fixed top-0 w-full bg-black p-4 flex justify-between items-center z-[110] border-b border-[#FF5C00]/20">
          <h1 className="text-white font-black italic uppercase">
            GRILL <span className="text-[#FF5C00]">RIDER</span>
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FF5C00] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase"
          >
            Logout
          </button>
        </div>
      )}
     <main className={userRole === "rider" ? "pt-24 min-h-screen bg-gray-50" : ""}>
  {userRole === "rider" ? (
    <RiderDashboard userUid={currentUser?.uid || auth.currentUser?.uid} />
  ) : (
    <>
          {/* Home View */}
          {currentView === "home" && (
            <>
              <Hero />
              <div className="reveal">
                <About />
              </div>
              <div className="reveal">
                <Menu
                  addToCart={addToCart}
                  onViewDetails={viewItemDetails}
                  limit={6}
                  onExploreFullMenu={() => navigateTo("menu")}
                />
              </div>
               <SpecialOffer />
              <Stats />
              <div className="reveal">
                <Chefs />
              </div>
             
              <div className="reveal">
                <Gallery />
              </div>
              <div className="reveal">
                <Testimonials />
              </div>
            </>
          )}

          {/* Admin Dashboard */}
          {currentView === "admin-dashboard" && userRole === "admin" && (
            <AdminDashboard />
          )}

          {/* Menu Full Page */}
          {currentView === "menu" && (
            <div >
              <Menu
                addToCart={addToCart}
                onViewDetails={viewItemDetails}
                fullPage
              />
            </div>
          )}

          {/* Item Details */}
          {currentView === "item-details" && selectedItem && (
            <ItemDetails
              item={selectedItem}
              addToCart={addToCart}
              onBack={() => navigateTo("menu")}
            />
          )}

          {/* About Page */}
          {currentView === "about" && (
            <div >
              <About fullPage />
              <Chefs />
            </div>
          )}

          {/* Gallery Page */}
          {currentView === "gallery" && (
            <div>
              <Gallery fullPage />
            </div>
          )}

          {/* Contact Page */}
          {currentView === "contact" && <Contact />}
        </>
        )}
      </main>

      {userRole !== "rider" && <Footer />}

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
