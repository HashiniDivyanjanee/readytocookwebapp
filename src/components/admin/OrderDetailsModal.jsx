import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-gray-900 p-8 text-white flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black italic uppercase leading-none">Order <span className="text-[#FF5C00]">Invoice</span></h2>
            <p className="text-gray-400 mt-2 font-mono text-sm">ID: {order.id}</p>
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all text-2xl">×</button>
        </div>

        <div className="p-8 print:p-0" id="printable-invoice">
          {/* Top Info Section */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="space-y-2">
              <p className="text-sm"><strong className="inline-block w-28 uppercase text-gray-500">Customer:</strong> {order.customerName}</p>
              <p className="text-sm"><strong className="inline-block w-28 uppercase text-gray-500">Phone:</strong> {order.phone}</p>
              <p className="text-sm"><strong className="inline-block w-28 uppercase text-gray-500">Address:</strong> {order.address || "N/A"}</p>
              <p className="text-sm"><strong className="inline-block w-28 uppercase text-gray-500">Date/Time:</strong> {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : "Just now"}</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100">
              <h4 className="font-black text-xs uppercase text-[#FF5C00] mb-3">Rider Information</h4>
              <p className="text-sm"><strong>Name:</strong> {order.riderName || "Not Assigned"}</p>
              <p className="text-sm"><strong>Phone:</strong> {order.riderPhone || "-"}</p>
              <div className="mt-3">
                <span className="bg-[#FF5C00] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase italic">Status: {order.status}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-hidden border border-gray-100 rounded-[1.5rem]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500">
                <tr>
                  <th className="p-4 border-b">ID</th>
                  <th className="p-4 border-b">Item</th>
                  <th className="p-4 border-b">Category</th>
                  <th className="p-4 border-b text-center">Qty</th>
                  <th className="p-4 border-b text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {order.items?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-50 last:border-0">
                    <td className="p-4 font-mono text-xs">0{index + 1}</td>
                    <td className="p-4 font-bold">{item.name}</td>
                    <td className="p-4 text-gray-500">{item.category || "Food"}</td>
                    <td className="p-4 text-center font-bold">{item.quantity}</td>
                    <td className="p-4 text-right font-black">Rs. {item.priceValue * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-900 text-white">
                  <td colSpan="4" className="p-4 text-right font-bold uppercase italic">Grand Total</td>
                  <td className="p-4 text-right font-black text-lg text-[#FF5C00]">Rs. {order.totalAmount || order.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 print:hidden">
            <button onClick={handlePrint} className="flex-1 bg-black text-white py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/20">Print Invoice</button>
            <button onClick={onClose} className="px-8 border-2 border-gray-200 py-4 rounded-2xl font-bold uppercase text-gray-400 hover:bg-gray-50 transition-all">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;