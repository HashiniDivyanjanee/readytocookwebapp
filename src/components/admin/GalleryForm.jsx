import React, { useState } from "react";

const GalleryForm = ({ loading, handleUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      handleUpload(selectedFile);
      setSelectedFile(null); 
    } else {
      alert("Please select an image first!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto border border-blue-50">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Add Gallery Image</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="p-8 border-2 border-dashed border-blue-200 rounded-2xl text-center bg-blue-50/30">
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])} 
            className="text-sm block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {selectedFile && <p className="mt-2 text-xs text-blue-600 font-medium">{selectedFile.name}</p>}
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-wider disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload to Gallery"}
        </button>
      </form>
    </div>
  );
};

export default GalleryForm;