import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-2 md:p-4">
      <div className="bg-white w-full max-w-3xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[95vh] flex flex-col">
        
        {/* Header - Made responsive text sizes */}
        <div className="bg-gray-900 p-6 md:p-8 text-white flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-xl md:text-3xl font-black italic uppercase leading-none">
              Order <span className="text-[#FF5C00]">Invoice</span>
            </h2>
            <p className="text-gray-400 mt-2 font-mono text-[10px] md:text-sm truncate max-w-[200px] md:max-w-none">
              ID: {order.id}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="bg-white/10 hover:bg-[#FF5C00] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all text-xl"
          >
            ×
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar print:p-0" id="printable-invoice">
          
          {/* Top Info Section - Stacked on mobile, 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
            <div className="space-y-2 text-xs md:text-sm order-2 md:order-1">
              <div className="flex flex-col md:flex-row md:items-center">
                <strong className="uppercase text-gray-400 md:w-28 text-[10px]">Customer:</strong>
                <span className="font-bold text-gray-800">{order.customerName}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <strong className="uppercase text-gray-400 md:w-28 text-[10px]">Phone:</strong>
                <span className="font-bold text-gray-800">{order.phone}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-start">
                <strong className="uppercase text-gray-400 md:w-28 text-[10px]">Address:</strong>
                <span className="font-medium text-gray-600 md:flex-1">{order.address || "N/A"}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <strong className="uppercase text-gray-400 md:w-28 text-[10px]">Date/Time:</strong>
                <span className="text-gray-600 italic">
                  {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : "Just now"}
                </span>
              </div>
            </div>

            <div className="bg-orange-50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-orange-100 order-1 md:order-2">
              <h4 className="font-black text-[10px] uppercase text-[#FF5C00] mb-2 md:mb-3">Delivery Info</h4>
              <p className="text-xs md:text-sm"><strong>Rider:</strong> {order.riderName || "Not Assigned"}</p>
              <p className="text-xs md:text-sm"><strong>Phone:</strong> {order.riderPhone || "-"}</p>
              <div className="mt-3">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase italic shadow-sm">
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="overflow-hidden border border-gray-100 rounded-[1.5rem] mb-6">
            {/* Desktop Table - Hidden on Mobile */}
            <table className="w-full text-left border-collapse hidden md:table">
              <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500">
                <tr>
                  <th className="p-4 border-b">Item</th>
                  <th className="p-4 border-b text-center">Qty</th>
                  <th className="p-4 border-b text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {order.items?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-50 last:border-0">
                    <td className="p-4">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase">{item.category || "Food"}</p>
                    </td>
                    <td className="p-4 text-center font-bold">{item.quantity}</td>
                    <td className="p-4 text-right font-black">Rs. {(item.priceValue * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile List View - Hidden on Desktop */}
            <div className="md:hidden divide-y divide-gray-50">
              {order.items?.map((item, index) => (
                <div key={index} className="p-4 flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <p className="font-bold text-sm leading-tight">{item.name}</p>
                    <p className="text-[10px] text-gray-400">{item.category || "Food"} x {item.quantity}</p>
                  </div>
                  <p className="font-black text-sm whitespace-nowrap text-gray-800">
                    Rs. {(item.priceValue * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="bg-gray-900 text-white p-4 md:p-5 flex justify-between items-center italic">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Grand Total</span>
              <span className="text-lg md:text-xl font-black text-[#FF5C00]">Rs. {(order.totalAmount || order.total).toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons - Stack on mobile */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 print:hidden">
            <button 
               onClick={onClose} 
              className="w-full md:flex-1 bg-black text-white py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-[#FF5C00] transition-all shadow-lg active:scale-95"
            >
              Close
            </button>
            <button 
            onClick={handlePrint} 
             
              className="w-full md:px-8 border-2 border-gray-200 py-4 rounded-2xl font-bold uppercase text-gray-400 hover:bg-gray-50 transition-all active:scale-95"
            >
               Print Invoice  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;