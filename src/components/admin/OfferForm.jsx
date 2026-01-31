import React from "react";

const OfferForm = ({ loading, offerData, setOfferData, setOfferImg, handleSubmit, isEditing }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto border border-red-50">
      <h2 className="text-2xl font-bold mb-6 text-red-600">{isEditing ? "Edit Offer" : "Create Special Offer"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Offer Name" className="w-full p-4 border rounded-2xl bg-gray-50" 
          value={offerData.name} onChange={(e) => setOfferData({ ...offerData, name: e.target.value })} required 
        />
        <input 
          type="text" placeholder="Subtitle" className="w-full p-4 border rounded-2xl bg-gray-50" 
          value={offerData.subtitle} onChange={(e) => setOfferData({ ...offerData, subtitle: e.target.value })} 
        />
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" placeholder="Offer Price" className="w-full p-4 border rounded-2xl bg-gray-50" 
            value={offerData.offerPrice} onChange={(e) => setOfferData({ ...offerData, offerPrice: e.target.value })} required 
          />
          {/* <input 
            type="number" placeholder="Discount %" className="w-full p-4 border rounded-2xl bg-gray-50" 
            value={offerData.discount} onChange={(e) => setOfferData({ ...offerData, discount: e.target.value })} 
          /> */}
        </div>
        <div className="p-4 border-2 border-dashed border-red-200 rounded-2xl">
          <input type="file" onChange={(e) => setOfferImg(e.target.files[0])} className="text-sm" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold uppercase">
          {loading ? "Uploading..." : isEditing ? "Update Offer" : "Launch Offer"}
        </button>
      </form>
    </div>
  );
};

export default OfferForm;