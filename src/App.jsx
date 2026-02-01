import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import { OfferDetails } from "./components/OfferDetails";
import AdminDashboard from "./components/AdminDashboard";
import RiderDashboard from "./components/admin/RiderDashboard";
import { auth } from "./firebase";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll logic for Navbar and Reveals
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Login Success Handler
  const handleLoginSuccess = (role, user) => {
    setUserRole(role);
    setCurrentUser(user);
    if (role === "rider") navigate("/rider-dashboard");
    else if (role === "admin") navigate("/admin-dashboard");
    else navigate("/");
  };

  // Cart Functions
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
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      {userRole !== "rider" && (
        <Navbar
          scrolled={scrolled || location.pathname !== "/"}
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Rider Header */}
      {userRole === "rider" && (
        <div className="fixed top-0 w-full bg-black p-4 flex justify-between items-center z-[110] border-b border-[#FF5C00]/20">
          <h1 className="text-white font-black italic uppercase">
            GRILL <span className="text-[#FF5C00]">RIDER</span>
          </h1>
          <button
            onClick={() => {
              setUserRole(null);
              navigate("/");
            }}
            className="bg-[#FF5C00] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase"
          >
            Logout
          </button>
        </div>
      )}

      <main
        className={userRole === "rider" ? "pt-24 min-h-screen bg-gray-50" : ""}
      >
        <Routes>
          {/* Main Website Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="reveal">
                  <About />
                </div>
                <div className="reveal">
                  <Menu addToCart={addToCart} limit={6} />
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
            }
          />

          {/* Individual Pages */}
          <Route
            path="/menu"
            element={<Menu addToCart={addToCart} fullPage />}
          />
          <Route
            path="/about"
            element={
              <>
                <About fullPage />
                <Chefs />
              </>
            }
          />
          <Route path="/gallery" element={<Gallery fullPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dynamic Item Details Page */}
          <Route
            path="/item/:id"
            element={<ItemDetails addToCart={addToCart} />}
          />
          <Route
            path="/offers/:id"
            element={<OfferDetails addToCart={addToCart} />}
          />
          {/* Dashboards */}
          <Route
            path="/admin-dashboard"
            element={
              userRole === "admin" ? <AdminDashboard /> : <Navigate to="/" />
            }
          />
          <Route
            path="/rider-dashboard"
            element={
              userRole === "rider" ? (
                <RiderDashboard
                  userUid={currentUser?.uid || auth.currentUser?.uid}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
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
