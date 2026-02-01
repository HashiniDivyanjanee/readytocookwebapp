import React, { useState } from "react";

const GalleryForm = ({ loading, handleUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      handleUpload(selectedFiles);
      setSelectedFiles([]); 
    } else {
      alert("Please select at least one image!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto border border-blue-50">
      <h2 className="text-2xl font-bold mb-6 text-[#FF5C00]">Add Gallery Images</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="p-8 border-2 border-dashed border-blue-200 rounded-2xl text-center bg-blue-50/30">
          <input 
            type="file" 
            accept="image/*"
            multiple
            onChange={onFileChange} 
            className="text-sm block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#fcefe7] file:text-[#FF5C00] hover:file:bg-[#facfb6] cursor-pointer"
          />
          
          {selectedFiles.length > 0 && (
            <div className="mt-4 text-left">
              <p className="text-xs text-[#FF5C00] font-bold mb-2">Selected ({selectedFiles.length}):</p>
              <ul className="max-h-32 overflow-y-auto space-y-1">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-[10px] text-gray-500 truncate bg-white p-1 rounded border">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading || selectedFiles.length === 0} 
          className="w-full bg-[#FF5C00] text-white py-4 rounded-2xl font-bold uppercase tracking-wider disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Uploading..." : `Upload ${selectedFiles.length} Images`}
        </button>
      </form>
    </div>
  );
};

export default GalleryForm;