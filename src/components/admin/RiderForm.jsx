import React, { useState } from "react";

const RiderForm = ({ loading, onAddRider }) => {
  const [rider, setRider] = useState({ 
    name: "", 
    phone: "", 
    vehicleNo: "", 
    email: "", 
    role: "rider" 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRider(rider);
    setRider({ name: "", phone: "", vehicleNo: "", email: "", role: "rider" }); 
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto border border-green-50">
      <h2 className="text-2xl font-bold mb-6 text-[#FF5C00] italic uppercase">
        Add New <span className="text-black">User / Rider</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Full Name" className="w-full p-4 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none" 
          value={rider.name} onChange={(e) => setRider({ ...rider, name: e.target.value })} required 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="email" placeholder="Email Address (Optional)" className="w-full p-4 border rounded-2xl bg-gray-50" 
            value={rider.email} onChange={(e) => setRider({ ...rider, email: e.target.value })}
          />
          
          {/* --- User Role Select Box --- */}
          <select 
            className="w-full p-4 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-[#FF5C00] outline-none font-medium text-gray-700"
            value={rider.role}
            onChange={(e) => setRider({ ...rider, role: e.target.value })}
            required
          >
            <option value="admin">Admin</option>
            <option value="rider">Rider</option>
            <option value="marinate chef">Marinate Chef</option>
            <option value="readymade chef">Readymade Chef</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" placeholder="Phone Number" className="w-full p-4 border rounded-2xl bg-gray-50" 
            value={rider.phone} onChange={(e) => setRider({ ...rider, phone: e.target.value })} required 
          />
          <input 
            type="text" 
            placeholder="Vehicle Number (e.g. BZ-1234)" 
            className={`w-full p-4 border rounded-2xl bg-gray-50 ${rider.role !== 'rider' ? 'opacity-50' : ''}`}
            value={rider.vehicleNo} 
            onChange={(e) => setRider({ ...rider, vehicleNo: e.target.value })} 
            required={rider.role === 'rider'} 
            disabled={rider.role !== 'rider'}
          />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#FF5C00] text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#161616] transition-all">
          {loading ? "Registering..." : "Register User"}
        </button>
      </form>
    </div>
  );
};

export default RiderForm;