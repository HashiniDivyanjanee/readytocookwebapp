import React from "react";

export const About = ({ fullPage }) => {
  return (
    <section
      id="about"
      className={`bg-white overflow-hidden ${fullPage ? "" : "py-16 md:py-32"}`}
    >
      {/* Page Banner */}
      {fullPage && (
        <div className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-black ">
          <div
            className="absolute inset-0 bg-cover bg-center ken-burns opacity-60"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white"></div>
          </div>
          <div className="relative z-10 text-center space-y-4">
            <span className="text-[#FF5C00] font-oswald text-xs tracking-[0.6em] uppercase font-black block animate-[fadeIn_1s_ease-out]">
              The Grill House
            </span>
            <h1 className="text-white font-oswald text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none animate-[slideUp_1s_ease-out]">
              OUR <span className="text-[#FF5C00]">STORY</span>
            </h1>
            <p className="text-white/80 font-playfair italic text-lg md:text-2xl animate-[fadeIn_1.5s_ease-out]">
              A legacy of wood, smoke, and fire
            </p>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-4 ${fullPage ? "py-24" : ""}`}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-[#FF5C00] font-oswald text-base md:text-lg tracking-widest uppercase font-bold">
                Discover our story
              </span>
              <h2 className="font-oswald text-3xl md:text-6xl text-gray-900 leading-[0.9] uppercase font-bold">
                Traditional <br className="hidden md:block" />{" "}
                <span className="text-[#FF5C00]">& Family Recipes</span>
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
              We provide fresh, high-quality raw meat, carefully cleaned, cut,
              and prepared with selected spices. Our products are not cooked —
              they are made ready for you to cook your way at home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-[#FF5C00] transition-all transform hover:scale-105 shadow-xl uppercase tracking-widest text-[10px]">
                MORE
              </button>
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-all transform hover:scale-105 uppercase tracking-widest text-[10px]">
                Watch Video
              </button>
            </div>
          </div>

          <div className="relative h-[350px] sm:h-[450px] md:h-[550px] mt-8 md:mt-0">
            <div className="absolute top-0 right-0 w-[85%] aspect-square bg-[#1a110a] rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden transform rotate-3 animate-float">
              <img
                src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=800&auto=format&fit=crop"
                alt="Traditional Grill"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div
              className="absolute -bottom-6 left-0 w-[70%] aspect-square bg-[#8B0000] rounded-[30px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform -rotate-6 z-10 border-[8px] md:border-[12px] border-white animate-float"
              style={{ animationDelay: "1s" }}
            >
              <img
                src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop"
                alt="Smoky Chicken"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {fullPage && (
          <div className="grid md:grid-cols-3 gap-10 pt-12 border-t border-gray-100">
            <div className="space-y-4 text-center md:text-left">
              <div className="text-3xl md:text-4xl text-[#FF5C00] font-oswald font-black">
                01.
              </div>
              <h3 className="font-oswald text-xl md:text-2xl font-bold uppercase">
                Our Mission
              </h3>
              <p className="text-gray-500 font-medium text-xs md:text-sm">
                To deliver fresh, high-quality raw meat, carefully prepared with
                trusted spices, giving customers the freedom to cook their way
                at home.
              </p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="text-3xl md:text-4xl text-[#FF5C00] font-oswald font-black">
                02.
              </div>
              <h3 className="font-oswald text-xl md:text-2xl font-bold uppercase">
                Sustainability
              </h3>
              <p className="text-gray-500 font-medium text-xs md:text-sm">
                We focus on responsible sourcing, minimal waste, and hygienic
                preparation practices that respect both quality and the
                environment.
              </p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="text-3xl md:text-4xl text-[#FF5C00] font-oswald font-black">
                03.
              </div>
              <h3 className="font-oswald text-xl md:text-2xl font-bold uppercase">
                The Experience
              </h3>
              <p className="text-gray-500 font-medium text-xs md:text-sm">
                From clean cuts to balanced seasoning, we ensure a smooth,
                reliable experience that brings freshness and confidence to your
                kitchen.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
