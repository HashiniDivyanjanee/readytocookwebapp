import React from "react";

const ProductForm = ({ loading, productData, setProductData, setProductImg, handleSubmit, isEditing }) => {
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
          <select 
            className="w-full p-4 border rounded-2xl bg-gray-50" 
            value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })} required
          >
            <option value="">Select Category</option>
            <option value="Chicken">Chicken</option>
            <option value="Beef">Beef</option>
            <option value="Pork">Pork</option>
              <option value="Crab">Crab</option>
            <option value="Fish">Fish</option>
            <option value="Prawn">Prawn</option>
          </select>
        </div>
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