
import React, { useState, useEffect, useRef } from 'react';

const StatCard = ({ icon, value, suffix, label, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div 
      ref={cardRef}
      className={`relative group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-700 hover:bg-white/10 hover:border-[#FF5C00]/30 hover:shadow-[0_20px_50px_rgba(255,92,0,0.15)] flex flex-col items-center text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#FF5C00]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF5C00] transition-all duration-500">
        <div className="text-[#FF5C00] group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline justify-center font-oswald text-4xl md:text-6xl text-white font-black tracking-tighter">
          <span>{count}</span>
          <span className="text-[#FF5C00] ml-1">{suffix}</span>
        </div>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 group-hover:text-white transition-colors">
          {label}
        </p>
      </div>
      
      {/* Decorative corner glow */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-[#FF5C00]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export const Stats = () => {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-[#FF5C00]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-[#FF5C00]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          <StatCard 
            delay={100}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            value={50}
            suffix="K+"
            label="Happy Diners"
          />
          <StatCard 
            delay={200}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            value={5}
            suffix="+"
            label="Smoke Houses"
          />
          <StatCard 
            delay={300}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            value={99}
            suffix="%"
            label="Satisfaction"
          />
          <StatCard 
            delay={400}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
            value={15}
            suffix="+"
            label="Award Chefs"
          />
        </div>
      </div>
    </section>
  );
};
