import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MENU_STRUCTURE = {
  Marinade: ["All", "Sea Food", "Beef", "Chicken", "Pork", "Special Offers"],
  Readymade: [
    "All",
    "Mixed",
    "Sea Food",
    "Beef",
    "Chicken",
    "Pork",
    "Special Offers",
  ],
};

const MenuItemCard = ({ item, index, addToCart }) => {
  const isReadymade = item.mainCategory === "Readymade";

  // States
  const [soldLevel, setSoldLevel] = useState("Low");
  const [spicyLevel, setSpicyLevel] = useState("Low");
  // Default value based on category
  const [weight, setWeight] = useState(isReadymade ? "Half (500g)" : "500g");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const closeDropdowns = () => setActiveDropdown(null);
    window.addEventListener("click", closeDropdowns);
    return () => window.removeEventListener("click", closeDropdowns);
  }, []);

  // Labels and Options logic
  const weightLabel = isReadymade ? "Portion" : "Weight";
  const weightOptions = isReadymade
    ? ["Full (1Kg)", "Half (500g)"]
    : ["500g", "1kg"];

  const CustomSelect = ({ label, value, options, onChange, type }) => (
    <div
      className="relative space-y-1.5"
      onClick={(e) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === type ? null : type);
      }}
    >
      <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 block">
        {label}
      </label>
      <div
        className={`w-full bg-gray-50 border ${activeDropdown === type ? "border-[#FF5C00]" : "border-gray-100"} rounded-xl px-2 py-2 text-[9px] font-black uppercase text-gray-900 flex justify-between items-center transition-all h-9`}
      >
        <span className="truncate">{value}</span>
        <svg
          className={`w-2 h-2 shrink-0 ml-1 transition-transform ${activeDropdown === type ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {activeDropdown === type && (
        <div className="absolute z-50 bottom-full mb-2 left-0 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setActiveDropdown(null);
              }}
              className={`px-3 py-2 text-[9px] font-black uppercase hover:bg-[#FF5C00] hover:text-white cursor-pointer transition-colors ${value === opt ? "bg-[#FF5C00]/10 text-[#FF5C00]" : "text-gray-600"}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col border border-gray-100/50 cursor-pointer"
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={() => navigate(`/item/${item.id}`)}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
          <span className="font-oswald font-black text-[#FF5C00] text-lg">
            Rs. {item.price}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                ...item,
                selectedSold: soldLevel,
                selectedSpicy: spicyLevel,
                selectedWeight: weight,
              });
            }}
            className="bg-white text-gray-900 w-14 h-14 rounded-full flex items-center justify-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl hover:bg-[#FF5C00] hover:text-white"
          >
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
                strokeWidth={2.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <span className="text-[#FF5C00] font-black uppercase text-[9px] tracking-widest">
            {item.mainCategory} | {item.category}
          </span>
          <h3 className="font-oswald text-2xl font-bold text-gray-900 group-hover:text-[#FF5C00] transition-colors leading-tight uppercase">
            {item.name}
          </h3>
        </div>
        <p className="text-gray-500 text-sm font-medium leading-relaxed flex-1 line-clamp-2">
          {item.desc}
        </p>

        {/* Customization Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-50">
          <CustomSelect
            label={weightLabel}
            value={weight}
            options={weightOptions}
            onChange={setWeight}
            type="weight"
          />
          {!isReadymade && (
            <>
              <CustomSelect
                label="Salt"
                value={soldLevel}
                options={["Low", "Medium", "High"]}
                onChange={setSoldLevel}
                type="salt"
              />
              <CustomSelect
                label="Spicy"
                value={spicyLevel}
                options={["Low", "High"]}
                onChange={setSpicyLevel}
                type="spicy"
              />
            </>
          )}
        </div>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Customizable
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                ...item,
                selectedSold: soldLevel,
                selectedSpicy: spicyLevel,
                selectedWeight: weight,
              });
            }}
            className="font-oswald text-xs font-black uppercase tracking-widest text-[#FF5C00] hover:text-gray-900 transition-colors"
          >
            Add to Cart +
          </button>
        </div>
      </div>
    </div>
  );
};

export const Menu = ({ addToCart, fullPage, limit }) => {
  const navigate = useNavigate();
  const [activeMain, setActiveMain] = useState("Marinade");
  const [activeSub, setActiveSub] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [animate, setAnimate] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMenuData(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [activeMain, activeSub, searchTerm]);

  const filteredItems = menuData
    .filter((item) => {
      const matchesMain = item.mainCategory === activeMain;
      const matchesSub = activeSub === "All" || item.category === activeSub;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesMain && matchesSub && matchesSearch;
    })
    .slice(0, limit || menuData.length);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#FF5C00]"></div>
      </div>
    );

  return (
    <section className={`${fullPage ? "bg-white" : "bg-[#f8f8f8]"} pb-20`}>
      {fullPage && (
        <div className="relative h-[40vh] flex items-center justify-center bg-black mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')",
            }}
          ></div>
          <div className="relative z-10 text-center px-4 w-full max-w-md">
            <h1 className="text-white font-oswald text-6xl font-black uppercase mb-6">
              MENU
            </h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Main Categories */}
        <div className="flex justify-center gap-4 mb-8">
          {Object.keys(MENU_STRUCTURE).map((main) => (
            <button
              key={main}
              onClick={() => {
                setActiveMain(main);
                setActiveSub("All");
              }}
              className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all 
              ${activeMain === main ? "bg-gray-900 border-gray-900 text-white shadow-lg scale-105" : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"}`}
            >
              {main}
            </button>
          ))}
        </div>

        {/* Sub Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {MENU_STRUCTURE[activeMain].map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all 
              ${activeSub === sub ? "bg-[#FF5C00] border-[#FF5C00] text-white shadow-md" : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"}`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Grid Area */}
        {filteredItems.length > 0 ? (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {filteredItems.map((item, index) => (
              <MenuItemCard
                key={item.id}
                item={item}
                index={index}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold italic">
            No items found in {activeMain} - {activeSub}
          </div>
        )}
      </div>
    </section>
  );
};
