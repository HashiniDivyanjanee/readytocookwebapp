import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useParams, useNavigate } from "react-router-dom"; 
import { db } from "../firebase";

export const OfferDetails = ({ addToCart }) => {
  const { id } = useParams(); 
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchOffer = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "offers"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setOffer({ docId: querySnapshot.docs[0].id, ...docData });
        } else {
          navigate("/"); 
        }
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-[#FF5C00] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!offer) return null;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Container (Sticky) */}
          <div className="w-full lg:w-3/5 lg:sticky lg:top-32">
            <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
              <img 
                src={offer.image} 
                alt={offer.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* Right: Info Container */}
          <div className="w-full lg:w-2/5 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-[2px] w-8 bg-[#FF5C00]"></span>
                <span className="text-[#FF5C00] font-bold text-xs uppercase tracking-[0.2em]">Exclusive Deal</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4 tracking-tight uppercase italic">
                {offer.name}
              </h1>
              
              <p className="text-gray-500 text-lg leading-relaxed font-medium italic border-l-4 border-gray-100 pl-6">
                {offer.subtitle || offer.description}
              </p>
            </div>

            <div className="py-8 border-y border-gray-100 flex items-end gap-3">
              <div className="text-sm font-bold text-gray-400 uppercase mb-2">Price:</div>
              <div className="text-5xl font-black text-gray-900">
                <span className="text-xl mr-1">Rs.</span>
                {offer.offerPrice || offer.price}
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => addToCart(offer, 1)}
                className="w-full bg-[#FF5C00] text-white py-6 rounded-2xl font-black uppercase text-sm tracking-widest hover:brightness-110 shadow-lg shadow-[#FF5C00]/20 transition-all active:scale-[0.98]"
              >
                Add to Cart
              </button>
              
              <button 
                onClick={() => navigate(-1)}
                className="w-full bg-white text-gray-400 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:text-gray-900 transition-colors"
              >
                Go back to Menu
              </button>
            </div>

            {/* Tags/Labels */}
            <div className="flex flex-wrap gap-3">
              {['Fresh Ingredients', 'Fast Delivery', 'Signature Dish'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase rounded-lg border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};