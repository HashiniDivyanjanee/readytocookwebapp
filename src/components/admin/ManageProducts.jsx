import React from "react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ManageProducts = ({ products, onEdit }) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((item) => (
        <div key={item.id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 flex items-center gap-4">
          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{item.name}</h3>
            <p className="text-[#FF5C00] font-bold text-sm">Rs. {item.price}</p>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => onEdit(item)}
                className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-md font-bold"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-md font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;