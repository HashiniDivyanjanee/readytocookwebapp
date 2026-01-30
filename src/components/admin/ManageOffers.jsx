import React from "react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ManageOffers = ({ offers, onEdit }) => {
  const handleDelete = async (id) => {
    if (window.confirm("මෙම Offer එක ඉවත් කිරීමට ඔබට සහතිකද?")) {
      try {
        await deleteDoc(doc(db, "offers", id));
        alert("Offer එක සාර්ථකව ඉවත් කළා!");
      } catch (err) {
        alert("දෝෂයක් සිදු විය: " + err.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer) => (
        <div key={offer.id} className="bg-white p-6 rounded-[2rem] shadow-lg border border-red-50 flex flex-col gap-4">
          <div className="relative h-40 rounded-2xl overflow-hidden">
            <img src={offer.image} alt={offer.name} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              {offer.discount}% OFF
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{offer.name}</h3>
            <p className="text-gray-500 text-sm">{offer.subtitle}</p>
            <p className="text-red-600 font-bold mt-1">Rs. {offer.offerPrice}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onEdit(offer)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(offer.id)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-bold text-sm hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageOffers;