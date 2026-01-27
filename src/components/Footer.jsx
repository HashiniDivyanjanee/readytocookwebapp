import React from 'react';

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
                READY TO COOK <br /> <span className="text-[#FF5C00]">GRILL HOUSE</span>
              </div>
              <p className="text-gray-500 font-medium max-w-sm leading-relaxed text-sm">
                The flame is our compass, the smoke is our story. Join our inner circle for exclusive pitmaster secrets and weekend deals.
              </p>
            </div>


            {/* Social Links */}
            <div className="flex items-center space-x-8 pt-4">
              {['Facebook', 'Instagram', 'X-Twitter'].map((social) => (
                <a key={social} href="#" className="group relative overflow-hidden">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 group-hover:text-[#FF5C00] transition-colors duration-500">
                    {social}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF5C00] group-hover:w-full transition-all duration-500"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h4 className="font-oswald text-[#FF5C00] font-black uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">The Menu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reservations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-oswald text-[#FF5C00] font-black uppercase tracking-widest text-xs">Operating</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                <li className="flex flex-col"><span className="text-[9px] text-gray-600">Mon-Thu</span> 10:00 - 22:00</li>
                <li className="flex flex-col"><span className="text-[9px] text-gray-600">Fri-Sat</span> 09:00 - 00:00</li>
                <li className="flex flex-col"><span className="text-[9px] text-gray-600">Sunday</span> 11:00 - 21:00</li>
              </ul>
            </div>

            <div className="space-y-8 col-span-2 sm:col-span-1">
              <h4 className="font-oswald text-[#FF5C00] font-black uppercase tracking-widest text-xs">Reach Us</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                <li>NY Smokehouse</li>
                <li>+1 234 567 890</li>
                <li>grill@pitmaster.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] text-gray-700">
          <p>© {new Date().getFullYear()} BAR-BE-CUE HOUSE — THE ART OF THE PIT</p>
          <div className="flex space-x-12 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
