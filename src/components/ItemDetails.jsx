import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const ItemDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  
  // මුලින් default අගයන් ලබා දෙන්න
  const [soldLevel, setSoldLevel] = useState("Low");
  const [spicyLevel, setSpicyLevel] = useState("Low");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setItem(data);
          
          // දත්ත ලැබුණු පසු level සකස් කරන්න
          if (data.selectedSold) setSoldLevel(data.selectedSold);
          if (data.selectedSpicy) setSpicyLevel(data.selectedSpicy);
          
          // Animation එක සඳහා
          setTimeout(() => setIsVisible(true), 100);
        } else {
          console.log("No such item!");
          navigate("/menu");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF5C00]"></div>
          <p className="font-oswald font-black uppercase tracking-widest text-gray-400">Loading Flavors...</p>
        </div>
      </div>
    );
  }

  // දත්ත නොමැති නම් error වීම වැළැක්වීමට
  if (!item) return null;

  const handleAddToCart = () => {
    addToCart(
      { ...item, selectedSold: soldLevel, selectedSpicy: spicyLevel },
      quantity
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Overlay */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="pointer-events-auto group flex items-center space-x-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-gray-100 transition-all hover:bg-black hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-oswald text-[10px] font-black uppercase tracking-[0.3em]">
            Back to Menu
          </span>
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 hidden lg:block">
            <div className="text-white/40 font-oswald text-[10vw] font-black leading-none select-none">
              #GRILL
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className={`flex-1 flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          <div className="max-w-xl">
            <div className="flex items-center space-x-4 mb-8">
              <span className="bg-[#FF5C00] text-white px-4 py-1.5 rounded-lg font-black uppercase text-[9px] tracking-[0.3em]">
                {item.category}
              </span>
            </div>

            <div className="space-y-6 mb-12">
              <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl text-gray-900 font-black uppercase tracking-tighter leading-[0.85]">
                {item.name}
              </h1>
              <div className="h-1.5 w-24 bg-[#FF5C00]"></div>
              <p className="font-playfair italic text-2xl text-gray-400 leading-relaxed">
                "{item.desc}"
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
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest text-gray-900 focus:outline-none focus:border-[#FF5C00] appearance-none cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF5C00]">Select Spicy Level</h4>
                <div className="relative">
                  <select
                    value={spicyLevel}
                    onChange={(e) => setSpicyLevel(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest text-gray-900 focus:outline-none focus:border-[#FF5C00] appearance-none cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Unit Price</span>
                  <p className="font-oswald text-4xl text-gray-900 font-black">Rs. {item.price}</p>
                </div>

                <div className="flex items-center bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 font-bold text-2xl text-gray-400 hover:text-black transition-colors">−</button>
                  <span className="w-10 text-center font-oswald text-2xl font-black">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 font-bold text-2xl text-gray-400 hover:text-black transition-colors">+</button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-[2] bg-gray-900 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#FF5C00] transition-all shadow-xl flex items-center justify-center space-x-3"
              >
                <span>Add to Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="flex-1 border-2 border-black py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kenBurnsDetail {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};