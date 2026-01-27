
import React from 'react';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800', title: 'The Midnight Sear', category: 'Live Fire' },
  { id: 2, src: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800', title: 'Hickory Smoke', category: 'Technique' },
  { id: 3, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', title: 'Prime Cuts', category: 'Ingredients' },
  { id: 4, src: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800', title: 'The Pitmaster', category: 'People' },
  { id: 5, src: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800', title: 'Slow & Low', category: 'Atmosphere' },
  { id: 6, src: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?auto=format&fit=crop&q=80&w=800', title: 'Family Table', category: 'Moments' },
  { id: 7, src: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=800&auto=format&fit=crop', title: 'The Glow', category: 'Detail' },
  { id: 8, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop', title: 'Crispy Finish', category: 'Food' },
];

export const Gallery = ({ fullPage }) => {
  return (
    <section className={`bg-white overflow-hidden ${fullPage ? '' : 'py-24'}`}>
      {/* Page Banner */}
      {fullPage && (
        <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black mb-12">
          <div 
            className="absolute inset-0 bg-cover bg-center ken-burns opacity-60"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white"></div>
          </div>
          <div className="relative z-10 text-center space-y-6 px-6">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <span className="h-[1px] w-12 bg-[#FF5C00]"></span>
              <span className="text-[#FF5C00] font-oswald text-sm tracking-[0.6em] uppercase font-black block animate-[fadeIn_1s_ease-out]">The Pit Visuals</span>
              <span className="h-[1px] w-12 bg-[#FF5C00]"></span>
            </div>
            <h1 className="text-white font-oswald text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-none animate-[slideUp_1s_ease-out]">
              VISUAL <span className="text-[#FF5C00]">CHRONICLES</span>
            </h1>
            <p className="text-white/80 font-playfair italic text-xl md:text-3xl max-w-2xl mx-auto animate-[fadeIn_1.5s_ease-out]">
              Capturing the soul of fire, smoke, and tradition.
            </p>
          </div>
        </div>
      )}

      {/* Masonry Layout */}
      <div className={`max-w-7xl mx-auto px-6  py-6 ${fullPage ? 'pb-24' : ''}`}>
         <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#FF5C00]/10 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
            <span className="text-[#FF5C00] font-oswald text-[10px] tracking-[0.3em] uppercase font-black">Our Specialties</span>
          </div>
          <h2 className="font-oswald text-4xl md:text-6xl text-gray-900 font-black uppercase tracking-tighter leading-none">
            The <span className="text-[#FF5C00]">Pitmaster's</span> Menu
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 font-medium text-sm">
            Hand-selected cuts, seasoned with our secret dry rubs and smoked low and slow for up to 14 hours.
          </p>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              className={`relative group overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-xl break-inside-avoid transform transition-all duration-700 hover:-translate-y-2 reveal active`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#FF5C00] font-oswald text-[9px] font-black uppercase tracking-[0.3em]">
                    {image.category}
                  </span>
                  <h3 className="text-white font-oswald text-2xl font-bold uppercase tracking-tight">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
