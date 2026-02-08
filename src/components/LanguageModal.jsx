import React from "react";

const LanguageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const selectLanguage = (lang) => {
    if (window.changeLanguage) {
      window.changeLanguage(lang);
    }
    onClose();
  };

  const languages = [
    { code: "en", label: "English", sub: "Welcome" },
    { code: "si", label: "සිංහල", sub: "සාදරයෙන් පිළිගනිමු" },
    { code: "ta", label: "தமிழ்", sub: "வரவேற்கிறோம்" },
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-hidden">
      {/* Background Overlay with heavy blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-500" />

      {/* Modal Card */}
      <div className="relative bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 max-w-md w-full text-center shadow-[0_0_50px_rgba(255,92,0,0.15)] animate-in zoom-in-95 duration-300">
        
        {/* Decorative Top Light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF5C00] opacity-20 blur-[80px]" />

        {/* Logo or Brand Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#FF5C00] to-[#ff8c4a] rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.198 15.53 5.581 19.5" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
          Choose <span className="text-[#FF5C00]">Language</span>
        </h2>
        <p className="text-gray-400 text-sm mb-10 font-medium tracking-wide uppercase">Select your preferred language to continue</p>

        <div className="space-y-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className="group relative w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#FF5C00]/50 rounded-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 text-left">
                <span className="text-2xl">{lang.icon}</span>
                <div>
                  <div className="text-white font-bold text-lg group-hover:text-[#FF5C00] transition-colors">
                    {lang.label}
                  </div>
                  <div className="text-gray-500 text-xs font-medium tracking-tight">
                    {lang.sub}
                  </div>
                </div>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF5C00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-[10px] text-gray-600 uppercase font-bold tracking-[0.2em]">
          Ready to Cook
        </p>
      </div>
    </div>
  );
};

export default LanguageModal;