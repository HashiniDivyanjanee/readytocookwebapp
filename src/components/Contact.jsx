
import React from 'react';

export const Contact = () => {
  return (
    <section className="bg-[#fcfcfc] min-h-screen">
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-cover bg-center ken-burns opacity-70" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#fcfcfc]"></div>
        </div>
        <div className="relative z-10 text-center space-y-6 px-6">
          <h1 className="text-white font-oswald text-6xl md:text-[8rem] font-black uppercase tracking-tighter">SAY <span className="text-[#FF5C00]">HELLO</span></h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20 pb-24">
        <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          <div className="lg:w-2/5 bg-[#121212] p-10 md:p-16 text-white relative">
            <h2 className="font-oswald text-4xl font-black uppercase tracking-tight text-[#FF5C00]">Contact Essentials</h2>
          </div>
          <div className="flex-1 p-10 md:p-16 lg:p-24 bg-white">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] font-bold" placeholder="Your Name" />
                <input type="email" className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] font-bold" placeholder="Email Address" />
              </div>
              <textarea rows={4} className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FF5C00] font-bold resize-none" placeholder="Your Message"></textarea>
              <button className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-[0.4em] hover:bg-[#FF5C00] transition-all shadow-2xl">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
