import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const SpecialOffer = () => {
  const [offers, setOffers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "offers"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id, // ✅ correct
        ...doc.data(),
      }));
      setOffers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Slider Timer Logic
  useEffect(() => {
    if (!isHovering && !loading && offers.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrent((curr) => (curr + 1) % offers.length);
      }, 5000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, isHovering, loading, offers.length]);

  const nextSlide = () => {
    setCurrent((curr) => (curr + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleClaimNow = (offerId) => {
    console.log("Navigating with ID:", offerId);
    navigate(`/offers/${offerId}`);
  };

  if (loading) return null;
  if (offers.length === 0) return null;

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 relative">
          <div className="inline-block px-4 py-1.5 bg-[#FF5C00]/10 rounded-full mb-4">
            <span className="text-[#FF5C00] font-black text-[10px] uppercase tracking-[0.4em]">
              Exclusive Vouchers
            </span>
          </div>
          <h2 className="font-oswald text-4xl md:text-6xl text-gray-900 mb-6 tracking-tighter uppercase font-black">
            WEEKEND <span className="text-[#FF5C00]">HOT DEALS</span>
          </h2>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative h-[500px] md:h-[450px] overflow-hidden rounded-[3rem] shadow-2xl bg-[#fafafa] border border-gray-100">
            <div
              className="flex h-full transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {offers.map((slide) => (
                <div
                  key={slide.id}
                  className="min-w-full h-full flex flex-col md:flex-row relative"
                >
                  <div className="md:w-1/2 relative h-1/2 md:h-auto overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                  </div>

                  <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative bg-white">
                    <div className="space-y-6">
                      <span className="text-[#FF5C00] font-oswald font-black text-2xl uppercase">
                        {slide.discount || "Special Offer"}
                      </span>
                      <h3 className="font-oswald text-3xl md:text-5xl text-gray-900 font-black uppercase">
                        {slide.name}
                      </h3>
                      <p className="text-gray-400 font-playfair italic text-lg">
                        {slide.subtitle}
                      </p>
                      <button
                        onClick={() => handleClaimNow(slide.id)}
                        className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#FF5C00] transition-all"
                      >
                        Claim Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Arrows */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-auto hover:bg-[#FF5C00] hover:text-white transition-all"
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
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-auto hover:bg-[#FF5C00] hover:text-white transition-all"
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
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
