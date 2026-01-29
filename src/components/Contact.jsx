
import React from 'react';

export const Contact = () => {
  return (
    <section className="bg-[#fcfcfc] min-h-screen">
      {/* Page Banner */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center ken-burns opacity-70" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#fcfcfc]"></div>
        </div>
        <div className="relative z-10 text-center space-y-6 px-6">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <span className="h-[1px] w-12 bg-[#FF5C00]"></span>
            <span className="text-[#FF5C00] font-oswald text-sm tracking-[0.6em] uppercase font-black block animate-[fadeIn_1s_ease-out]">Get In Touch</span>
            <span className="h-[1px] w-12 bg-[#FF5C00]"></span>
          </div>
          <h1 className="text-white font-oswald text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none animate-[slideUp_1s_ease-out]">
            SAY <span className="text-[#FF5C00]">HELLO</span>
          </h1>
          <p className="text-white/90 font-playfair italic text-xl md:text-3xl max-w-2xl mx-auto animate-[fadeIn_1.5s_ease-out]">
            We're here to ignite your next culinary adventure.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20 pb-12">
        {/* Main Contact Container */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Side: Dark Contact Info Panel */}
          <div className="lg:w-2/5 bg-[#121212] p-10 md:p-16 text-white relative overflow-hidden flex flex-col">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C00] blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 space-y-12 h-full flex flex-col">
              <div className="space-y-4">
                <h2 className="font-oswald text-4xl font-black uppercase tracking-tight leading-none">
                  Contact <br /> <span className="text-[#FF5C00]">Essentials</span>
                </h2>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">
                  The fire is always burning. Reach out through any of these channels and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-10 flex-grow">
                {/* Location */}
                <div className="group flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/30 flex items-center justify-center text-[#FF5C00] shrink-0 group-hover:bg-[#FF5C00] group-hover:text-white transition-all duration-500 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-oswald text-xs font-black uppercase tracking-[0.2em] text-[#FF5C00]">The Address</h3>
                    <p className="text-gray-200 font-bold text-lg leading-tight uppercase">987 Smokehouse Blvd, <br /> New York, NY 10001</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-oswald text-xs font-black uppercase tracking-[0.2em] text-gray-500">The Hotline</h3>
                    <p className="text-gray-200 font-bold text-lg uppercase">+1 (123) 332-2445</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-6">
                  <h3 className="font-oswald text-xs font-black uppercase tracking-[0.2em] text-gray-500">Follow the Smoke</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300 group/social">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300 group/social">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300 group/social">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.46-2.548l-.047-.02z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Brand Text */}
              <div className="pt-10 mt-auto border-t border-white/10 flex items-center justify-between">
                <span className="font-oswald text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Established 1984</span>
                <div className="flex space-x-4">
                  <span className="w-2 h-2 rounded-full bg-[#FF5C00]"></span>
                  <span className="w-2 h-2 rounded-full bg-white/20"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Clean Form Panel */}
          <div className="flex-1 p-10 md:p-16 lg:p-24 bg-white">
            <div className="mb-12">
              <h3 className="font-oswald text-3xl font-black uppercase tracking-tighter text-gray-900 mb-2">Message <span className="text-[#FF5C00]">Us</span></h3>
              <p className="text-gray-500 font-medium">Have a specific request or catering inquiry? Drop us a line below.</p>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] focus:bg-white transition-all text-gray-900 font-bold placeholder:text-gray-300"
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] focus:bg-white transition-all text-gray-900 font-bold placeholder:text-gray-300"
                    placeholder="example@mail.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Your Inquiry</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] focus:bg-white transition-all text-gray-900 font-bold placeholder:text-gray-300 resize-none"
                  placeholder="How can we help ignite your appetite?"
                ></textarea>
              </div>

              <div className="pt-4">
                <button className="group relative w-full lg:w-auto px-12 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.4em] overflow-hidden transition-all shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] flex items-center justify-center space-x-4">
                  <span className="relative z-10">Send Message</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="absolute inset-0 bg-[#FF5C00] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
          <div className="p-10 md:p-12 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-oswald text-2xl font-black uppercase tracking-tight text-gray-900">Find the <span className="text-[#FF5C00]">Pit</span></h3>
              <p className="text-gray-500 font-medium text-sm mt-1">Visit us for an authentic smoky experience.</p>
            </div>
            <button className="bg-white border-2 border-gray-100 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-900 hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] transition-all shadow-sm">
              Open in Google Maps
            </button>
          </div>
          <div className="relative h-[450px] w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976373946229!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) invert(0.05)' }} 
              allowFullScreen="" 
              loading="lazy"
              title="Bar-Be-Cue Grill House Location"
            ></iframe>
            {/* Overlay Decorative Element */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hidden md:block">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
                <span className="text-white font-oswald text-[9px] font-black uppercase tracking-widest">Live From NYC Pit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(50%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ken-burns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};
