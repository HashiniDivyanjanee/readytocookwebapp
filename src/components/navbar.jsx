import React, { useState } from "react";
import AuthModal from "./AuthModel";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({
  scrolled,
  cartCount,
  onCartClick,
  currentView,
  // onNavigate,
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
    console.log("Received Role from Firestore:", role);
    if (onLoginSuccess) {
      onLoginSuccess(role, user);
    }
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "rider") {
      navigate("/rider-dashboard");
    } else if (role === "marinate chef" || role === "readymade chef") {
      navigate("/chef-dashboard");
    } else {
      navigate("/");
    }

    setShowAuth(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black shadow-2xl py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 group cursor-pointer"
          onClick={() => handleNav("home")}
        >
          <div className="text-white font-oswald text-2xl font-black tracking-tighter uppercase leading-[0.8] transition-transform group-hover:scale-110">
            <Link
              to="/"
              className="text-2xl font-black text-white italic uppercase tracking-tighter"
            >
              READY TO <span className="text-[#FF5C00]">COOK</span>
            </Link>{" "}
          </div>
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

        {/* Auth & Cart */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="relative">
            <button
              onClick={onCartClick}
              className="text-white hover:text-[#FF5C00] transition-all p-2.5 flex items-center outline-none bg-white/5 hover:bg-white/10 rounded-2xl transform hover:scale-110 active:scale-90"
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
                <span className="absolute -top-1 -right-1 bg-[#FF5C00] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-black animate-badge">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button
             onClick={() => setShowAuth(true)}
              className="bg-[#FF5C00] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-white hover:text-black transition-all shadow-xl"
            >
              Sign in
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-1.5 bg-white/5 rounded-xl"
            >
              {isOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[-1] transition-all duration-700 glass-dark flex flex-col items-center justify-center space-y-6 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
      >
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

     <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLoginSuccess={handleInternalLoginSuccess}
      />
    </nav>
  );
};
