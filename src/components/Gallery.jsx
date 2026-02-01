import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // ඔබේ firebase configuration එක මෙතැනට දෙන්න
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const Gallery = ({ fullPage }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(fetchedImages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className={`bg-white overflow-hidden ${fullPage ? "" : "py-24"}`}>
      {/* Page Banner */}
      {fullPage && (
        <div className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-black ">
          <div
            className="absolute inset-0 bg-cover bg-center ken-burns opacity-60"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white"></div>
          </div>
          <div className="relative z-10 text-center space-y-4">
            <span className="text-[#FF5C00] font-oswald text-xs tracking-[0.6em] uppercase font-black block animate-[fadeIn_1s_ease-out]">
              The Pit Visuals
            </span>
            <h1 className="text-white font-oswald text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none animate-[slideUp_1s_ease-out]">
              VISUAL <span className="text-[#FF5C00]">CHRONICLES</span>
            </h1>
            <p className="text-white/80 font-playfair italic text-lg md:text-2xl animate-[fadeIn_1.5s_ease-out]">
               Capturing the soul of fire, smoke, and tradition.
            </p>
          </div>
        </div>
      )}

      {/* Masonry Layout */}
      <div className={`max-w-7xl mx-auto px-6 py-6 ${fullPage ? "pb-24" : ""}`}>
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#FF5C00]/10 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
            <span className="text-[#FF5C00] font-oswald text-[10px] tracking-[0.3em] uppercase font-black">
              Our Gallery
            </span>
          </div>
          <h2 className="font-oswald text-4xl md:text-6xl text-gray-900 font-black uppercase tracking-tighter leading-none">
            Moments <span className="text-[#FF5C00]">Worth</span> Savoring
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5C00]"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-xl break-inside-avoid transform transition-all duration-700 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <img
                  src={image.imageUrl} 
                  alt="Gallery Item"
                  className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#FF5C00] font-oswald text-[9px] font-black uppercase tracking-[0.3em]">
                      The Pit Experience
                    </span>
                    <h3 className="text-white font-oswald text-2xl font-bold uppercase tracking-tight">
                      Smoky Perfection
                    </h3>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};