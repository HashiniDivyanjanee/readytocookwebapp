import React from "react";

const CATEGORY_MAP = {
  Marinade: ["Sea Food", "Beef", "Chicken", "Pork", "Special Offers"],
  Readymade: ["Mixed", "Sea Food", "Beef", "Chicken",  "Pork", "Special Offers"]
};

const ProductForm = ({ loading, productData, setProductData, setProductImg, handleSubmit, isEditing }) => {
  
  const handleMainCategoryChange = (val) => {
    setProductData({ 
      ...productData, 
      mainCategory: val, 
      category: ""
    });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input 
          type="text" placeholder="Product Name" className="w-full p-4 border rounded-2xl bg-gray-50" 
          value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} required 
        />

        <div className="grid grid-cols-2 gap-4">
          <input 
            type="number" placeholder="Price (LKR)" className="w-full p-4 border rounded-2xl bg-gray-50" 
            value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} required 
          />
          
          {/* --- Main Category Dropdown --- */}
          <select 
            className="w-full p-4 border rounded-2xl bg-gray-50" 
            value={productData.mainCategory || ""} 
            onChange={(e) => handleMainCategoryChange(e.target.value)} 
            required
          >
            <option value="">Select Main Category</option>
            <option value="Marinade">Marinade</option>
            <option value="Readymade">Readymade</option>
          </select>
        </div>

        <select 
          className="w-full p-4 border rounded-2xl bg-gray-50 disabled:opacity-50" 
          value={productData.category} 
          onChange={(e) => setProductData({ ...productData, category: e.target.value })} 
          disabled={!productData.mainCategory}
          required
        >
          <option value="">Select Sub Category</option>
          {productData.mainCategory && CATEGORY_MAP[productData.mainCategory].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <textarea 
          placeholder="Description" className="w-full p-4 border rounded-2xl bg-gray-50 h-32" 
          value={productData.desc} onChange={(e) => setProductData({ ...productData, desc: e.target.value })}
        ></textarea>

        <div className="p-4 border-2 border-dashed rounded-2xl">
          <p className="text-sm text-gray-500 mb-2 font-bold">Product Image:</p>
          <input type="file" onChange={(e) => setProductImg(e.target.files[0])} className="text-sm" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#FF5C00] text-white py-4 rounded-2xl font-bold uppercase">
          {loading ? "Processing..." : isEditing ? "Update Item" : "Save Item"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;