import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-32 pb-12 relative overflow-hidden">
      {/* Massive Background Branding Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap">
        <span className="font-oswald text-[20vw] font-black uppercase tracking-tighter leading-none">
          Ready To Cook
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <div className="text-white font-oswald text-4xl font-black tracking-tighter uppercase leading-none">
                READY TO <span className="text-[#FF5C00]">COOK</span>
              </div>
              <p className="text-gray-500 font-medium max-w-sm leading-relaxed text-sm">
                The flame is our compass, the smoke is our story. Join our inner
                circle for exclusive pitmaster secrets and weekend deals.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-8 pt-4">
              {/* Facebook Icon */}
              <a
                href="https://www.facebook.com/readytocookeasymarinatedfoods/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all duration-500 group shadow-lg"
                aria-label="Facebook"
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/94775407767"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#25D366] hover:text-white transition-all duration-500 group shadow-lg"
                aria-label="WhatsApp"
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

              {/* Email Icon */}
              <a
                href="mailto:readytocooksl@gmail.com"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#FF5C00] hover:text-white transition-all duration-500 group shadow-lg"
                aria-label="Email"
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
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h4 className="font-oswald text-[#FF5C00] font-black uppercase tracking-widest text-xs">
                Navigation
              </h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                <li>
                  <a href="/home" className="hover:text-white transition-colors">Home</a>
                </li>
                <li>
                  <a href="/menu" className="hover:text-white transition-colors">Pit Menu</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white transition-colors">Our Story</a>
                </li>
                <li>
                  <a href="/gallery" className="hover:text-white transition-colors">Gallery</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-oswald text-[#FF5C00] font-black uppercase tracking-widest text-xs">
                Operating Hours
              </h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                <li className="flex flex-col">
                  <span className="text-[9px] text-gray-600">Mon-Sun</span>
                  08:00 - 22:00
                </li>
              </ul>
            </div>

            <div className="space-y-8 col-span-2 sm:col-span-1">
              <h4 className="font-oswald text-[#FF5C00] font-black uppercase tracking-widest text-xs">
                Reach Us
              </h4>
              <ul className="space-y-4 text-sm font-bold tracking-widest text-gray-400">
                <li className="uppercase leading-relaxed">
                   <a 
                    href="https://maps.google.com/?q=No.615+C/1/1,+Kottawa+Rd,+Thalawathugoda" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    No.615 C/1/1, Kottawa Rd, Thalawathugoda
                  </a>
                </li>
                <li>
                  <a href="tel:+94775407767" className="hover:text-white transition-colors">+94 77 54 077 67</a>
                </li>
                <li>
                  <a href="tel:+94705407317" className="hover:text-white transition-colors">+94 70 540 73 17</a>
                </li>
                <li>
                  <a href="mailto:readytocooksl@gmail.com" className="hover:text-white transition-colors lowercase">
                    readytocooksl@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] text-gray-700">
          <p>
            © {new Date().getFullYear()} Ready to Cook. All rights reserved.
          </p>
          <div className="flex space-x-12 mt-4 md:mt-0">
            <a href="https://wa.me/94772109312" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Developed by CodeCraft Innovations
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};