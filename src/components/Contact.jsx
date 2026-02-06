import React, { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const WHATSAPP_NUMBER = "94775407767";

  const handleWhatsAppSend = (e) => {
    e.preventDefault();

    const messageBody = `*New Inquiry from Website*
    *Name:* ${formData.name}
    *Email:* ${formData.email}
    *Message:* ${formData.message}`;

    const encodedText = encodeURIComponent(messageBody);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="bg-[#fcfcfc] min-h-screen">
      {/* Page Banner */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns opacity-70"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#fcfcfc]"></div>
        </div>
        <div className="relative z-10 text-center space-y-6 px-6">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <span className="h-[1px] w-12 bg-[#FF5C00]"></span>
            <span className="text-[#FF5C00] font-oswald text-sm tracking-[0.6em] uppercase font-black block animate-[fadeIn_1s_ease-out]">
              Get In Touch
            </span>
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
                  Contact <br />{" "}
                  <span className="text-[#FF5C00]">Essentials</span>
                </h2>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">
                  The fire is always burning. Reach out through any of these
                  channels and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-10 flex-grow">
                {/* Location */}
                <div className="group flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/30 flex items-center justify-center text-[#FF5C00] shrink-0 group-hover:bg-[#FF5C00] group-hover:text-white transition-all duration-500 shadow-lg">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-oswald text-xs font-black uppercase tracking-[0.2em] text-[#FF5C00]">
                      The Address
                    </h3>
                    <p className="text-gray-200 font-bold text-lg leading-tight uppercase">
                      <a 
                    href="https://maps.google.com/?q=No.615+C/1/1,+Kottawa+Rd,+Thalawathugoda" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    No.615 C/1/1, Kottawa Rd, Thalawathugoda
                  </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-500">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-oswald text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                      The Hotline
                    </h3>
                    <p className="text-gray-200 font-bold text-lg uppercase">
                       <a href="tel:+94775407767" className="hover:text-white transition-colors">+94 77 54 077 67</a>
                     
                    </p>
                    <p className="text-gray-200 font-bold text-lg uppercase">
                      <a href="tel:+94705407317" className="hover:text-white transition-colors">+94 70 540 73 17</a>
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-6">
                  <h3 className="font-oswald text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/readytocookeasymarinatedfoods/"
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300 group/social"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="mailto:readytocooksl@gmail.com"
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300 group/social"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/94775407767"
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF5C00] hover:border-[#FF5C00] transition-all duration-300 group/social"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Brand Text */}
              <div className="pt-10 mt-auto border-t border-white/10 flex items-center justify-between">
                <span className="font-oswald text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
                  Established 1984
                </span>
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
              <h3 className="font-oswald text-3xl font-black uppercase tracking-tighter text-gray-900 mb-2">
                Message <span className="text-[#FF5C00]">Us</span>
              </h3>
              <p className="text-gray-500 font-medium">
                Have a specific request or catering inquiry? Drop us a line
                below.
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleWhatsAppSend}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] focus:bg-white transition-all text-gray-900 font-bold placeholder:text-gray-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] focus:bg-white transition-all text-gray-900 font-bold placeholder:text-gray-300"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Your Inquiry
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] focus:bg-white transition-all text-gray-900 font-bold placeholder:text-gray-300 resize-none"
                  placeholder="How can we help ignite your appetite?"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="group relative w-full lg:w-auto px-12 py-5 bg-[#1a1818] text-white rounded-2xl font-black uppercase text-xs tracking-[0.4em] overflow-hidden transition-all shadow-2xl flex items-center justify-center space-x-4"
                >
                  <span className="relative z-10 flex items-center">
                    Send to WhatsApp
                  </span>
                  <svg
                    className="h-5 w-5 relative z-10 transform group-hover:translate-x-2 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
              <h3 className="font-oswald text-2xl font-black uppercase tracking-tight text-gray-900">
                Find the <span className="text-[#FF5C00]">Pit</span>
              </h3>
              <p className="text-gray-500 font-medium text-sm mt-1">
                Visit us for an authentic menu experience.
              </p>
            </div>
            <button className="bg-white border-2 border-gray-100 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-900 hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] transition-all shadow-sm">
              Open in Google Maps
            </button>
          </div>
          <div className="relative h-[450px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.26241055763!2d79.98949460000001!3d6.859120600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae251758102a801%3A0x68ae5da953188bc2!2s615%20Kottawa%20Rd%2C%20Pannipitiya!5e0!3m2!1sen!2slk!4v1769873595181!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(0.8) contrast(1.2) invert(0.05)",
              }}
              allowFullScreen=""
              loading="lazy"
              title="Bar-Be-Cue Grill House Location"
            ></iframe>
            {/* Overlay Decorative Element */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hidden md:block">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
                <span className="text-white font-oswald text-[9px] font-black uppercase tracking-widest">
                  Live From NYC Pit
                </span>
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
