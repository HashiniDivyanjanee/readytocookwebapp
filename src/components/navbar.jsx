import React, { useState, useEffect } from "react";
import AuthModal from "./AuthModel";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({
  scrolled,
  cartCount,
  onCartClick,
  onLoginSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path ? "text-[#FF5C00]" : "text-white";

  const handleInternalLoginSuccess = (role, user) => {
    if (onLoginSuccess) onLoginSuccess(role, user);
    const dashboardRoutes = {
      admin: "/admin-dashboard",
      rider: "/rider-dashboard",
      "marinate chef": "/chef-dashboard",
      "readymade chef": "/chef-dashboard",
    };
    navigate(dashboardRoutes[role] || "/");
    setShowAuth(false);
  };

  useEffect(() => {
    const initWidget = () => {
      if (window.google && window.google.translate) {
        if (typeof window.googleTranslateElementInit === "function") {
          window.googleTranslateElementInit();
        }
      }
    };
    const timer = setTimeout(initWidget, 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black shadow-2xl py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 group cursor-pointer"
          onClick={() => handleNav("/")}
        >
          <img
            src="/image/logo1.png"
            alt="Logo"
            className="h-9 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-[11px] font-black uppercase tracking-[0.3em]">
          <Link
            to="/"
            className={`${isActive("/")} hover:text-[#FF5C00] transition-colors`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`${isActive("/menu")} hover:text-[#FF5C00] transition-colors`}
          >
            Pit Menu
          </Link>
          <Link
            to="/about"
            className={`${isActive("/about")} hover:text-[#FF5C00] transition-colors`}
          >
            Our Story
          </Link>
          <Link
            to="/gallery"
            className={`${isActive("/gallery")} hover:text-[#FF5C00] transition-colors`}
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            className={`${isActive("/contact")} hover:text-[#FF5C00] transition-colors`}
          >
            Contact
          </Link>
        </div>

        {/* Right Section: Language, Cart, Auth */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* --- Language Button (Now Fixed for Mobile) --- */}
          <div className="relative group">
            <button className="flex items-center space-x-1 border border-[#FF5C00] px-2 py-1.5 md:px-3 md:py-1.5 rounded-lg text-white text-[9px] md:text-[11px] font-bold uppercase tracking-wider hover:bg-[#FF5C00] transition-all">
              <span className="hidden xs:inline">Language</span>
              <span className="xs:hidden italic text-[#FF5C00] group-hover:text-white">
                EN/සිං
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-[#FF5C00] group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-28 bg-black border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <button
                onClick={() => window.changeLanguage("en")}
                className="w-full text-left px-4 py-2 text-white text-[10px] font-bold hover:bg-[#FF5C00] transition-colors"
              >
                ENGLISH
              </button>
              <button
                onClick={() => window.changeLanguage("si")}
                className="w-full text-left px-4 py-2 text-white text-[10px] font-bold hover:bg-[#FF5C00] transition-colors"
              >
                සිංහල
              </button>
              <button
                onClick={() => window.changeLanguage("ta")}
                className="w-full text-left px-4 py-2 text-white text-[10px] font-bold hover:bg-[#FF5C00] transition-colors"
              >
                தமிழ்
              </button>
            </div>
          </div>

          {/* Cart */}
          <div className="relative">
            <button
              onClick={onCartClick}
              className="text-white hover:text-[#FF5C00] transition-all p-2 bg-white/5 hover:bg-white/10 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF5C00] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Sign In */}
          <button
            onClick={() => setShowAuth(true)}
            className="bg-[#FF5C00] text-white px-3 py-2 md:px-4 md:py-2 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-white hover:text-black transition-all shadow-xl"
          >
            Sign in
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 bg-white/5 rounded-xl transition-colors hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`${isActive("/")} text-2xl font-black uppercase tracking-widest`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setIsOpen(false)}
            className={`${isActive("/menu")} text-2xl font-black uppercase tracking-widest`}
          >
            Pit Menu
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`${isActive("/about")} text-2xl font-black uppercase tracking-widest`}
          >
            Our Story
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`${isActive("/contact")} text-2xl font-black uppercase tracking-widest`}
          >
            Contact
          </Link>

          {/* Mobile Language Selector inside Menu */}
          <div className="flex space-x-6 pt-8 border-t border-white/10">
            <button
              onClick={() => {
                window.changeLanguage("en");
                setIsOpen(false);
              }}
              className="text-white font-bold text-sm"
            >
              EN
            </button>
            <button
              onClick={() => {
                window.changeLanguage("si");
                setIsOpen(false);
              }}
              className="text-white font-bold text-sm"
            >
              සිං
            </button>
            <button
              onClick={() => {
                window.changeLanguage("ta");
                setIsOpen(false);
              }}
              className="text-white font-bold text-sm"
            >
              தம
            </button>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLoginSuccess={handleInternalLoginSuccess}
      />
    </nav>
  );
};
