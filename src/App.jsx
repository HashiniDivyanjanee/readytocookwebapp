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
import ChefDashboard from "./components/admin/ChefDashboard";
import LanguageModal from "./components/LanguageModal";
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }

    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

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

  useEffect(() => {
    const isLangSelected = localStorage.getItem("langSelected");
    setShowLanguageModal(true);
    // if (!isLangSelected) {
    //   const timer = setTimeout(() => {
    //     setShowLanguageModal(true);
    //   }, 1500);

    //   return () => clearTimeout(timer);
    // }
  }, []);

  const handleCloseLangModal = () => {
    localStorage.setItem("langSelected", "true");
    setShowLanguageModal(false);
  };

  // Login Success Handler
  const handleLoginSuccess = async (role, user) => {
    setUserRole(role);

    const userDoc = await getDoc(doc(db, "data", "users", "users", user.uid));
    if (userDoc.exists()) {
      setCurrentUser({ ...user, name: userDoc.data().name });
    } else {
      setCurrentUser(user);
    }

    if (role === "rider") navigate("/rider-dashboard");
    else if (role.includes("chef")) navigate("/chef-dashboard");
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
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={handleCloseLangModal}
      />

      {showInstallBtn && (
        <button
          onClick={handleInstallClick}
          className="fixed bottom-24 right-6 z-[100] bg-[#FF5C00] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 animate-bounce border-2 border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span className="font-bold text-xs uppercase">Install App</span>
        </button>
      )}

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
          <Route
            path="/chef-dashboard"
            element={
              <ChefDashboard
                userRole={userRole}
                userName={currentUser?.name || "Chef"}
              />
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
        clearCart={() => setCart([])}
      />
    </div>
  );
};

export default App;
