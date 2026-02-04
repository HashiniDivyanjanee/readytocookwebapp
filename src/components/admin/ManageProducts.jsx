import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ManageProducts = ({ products, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        alert("Product deleted!");
      } catch (err) {
        alert("Error deleting product: " + err.message);
      }
    }
  };

  // Filter එකට mainCategory සහ category දෙකම එක් කිරීම
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.mainCategory && item.mainCategory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto md:mx-0">
        <input
          type="text"
          placeholder="Search by name, main category or sub..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50 transition-all shadow-sm"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-shadow">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 leading-tight">{item.name}</h3>
                
                {/* --- පවතින Main Category සහ Sub Category පෙන්වීම --- */}
                <div className="flex gap-1 items-center mt-1">
                  <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                    {item.mainCategory || 'N/A'}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">
                    {item.category}
                  </span>
                </div>

                <p className="text-[#FF5C00] font-bold text-sm mt-1">Rs. {item.price}</p>
                
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => onEdit(item)}
                    className="text-[10px] bg-blue-50 text-blue-600 px-4 py-1.5 rounded-lg font-black uppercase tracking-wider hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-[10px] bg-red-50 text-red-600 px-4 py-1.5 rounded-lg font-black uppercase tracking-wider hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No products found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;