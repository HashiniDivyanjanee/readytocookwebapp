import React from "react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ManageGallery = ({ galleryItems }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Remove this image from gallery?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
        alert("Image deleted successfully!");
      } catch (error) {
        alert("Error deleting image: " + error.message);
      }
    }
  };

  if (!galleryItems || galleryItems.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">No images found in gallery. Try adding some!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {galleryItems.map((img) => (
        <div key={img.id} className="relative group rounded-[2rem] overflow-hidden shadow-md aspect-square bg-gray-100 border border-gray-100">
          <img 
            src={img.imageUrl || img.image} 
            alt="Gallery item"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => handleDelete(img.id)}
              className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageGallery;