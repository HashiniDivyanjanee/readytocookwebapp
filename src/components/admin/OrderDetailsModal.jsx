import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const openLocation = () => {
    if (order.mapLocation) {
      window.open(order.mapLocation, "_blank");
    } else {
      const url = `https://www.google.com/maps?q=${encodeURIComponent(order.address)}`;
      window.open(url, "_blank");
    }
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return { date: "N/A", time: "N/A" };

    const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    const date = dateObj.toLocaleDateString("en-GB"); 
    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }); 

    return { date, time };
  };

  const { date, time } = formatDateTime(order.createdAt);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-2 md:p-4 font-sans">
      <div className="bg-white w-full max-w-3xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 p-6 md:p-8 text-white flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-xl md:text-3xl font-black italic uppercase leading-none">
              Order <span className="text-[#FF5C00]">Details</span>
            </h2>
            <p className="text-gray-400 mt-2 font-mono text-[10px] md:text-sm">
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
        <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6">
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2">
                  Customer Information
                </h4>
                <p className="font-bold text-gray-800 text-sm md:text-base">
                  {order.customerName}
                </p>
                <p className="text-xs text-gray-600 mt-1">{order.phone}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {order.address}
                </p>

                <button
                  onClick={openLocation}
                  className="mt-4 flex items-center gap-2 bg-[#00E676] text-black px-4 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all shadow-md w-full justify-center"
                >
                  📍 Navigation (Google Maps)
                </button>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 flex flex-col justify-between">
              <div>
                <h4 className="font-black text-[10px] uppercase text-[#FF5C00] mb-3">
                  Order Status
                </h4>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span>
                  <span className="text-lg font-black uppercase italic text-gray-900">
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-col gap-2 border-t border-orange-200/50 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      Date:
                    </span>
                    <span className="text-xs font-black text-gray-800">
                      {date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      Time:
                    </span>
                    <span className="text-xs font-black text-gray-800">
                      {time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      Chef:
                    </span>
                    <span className="text-xs font-black text-gray-800">
                      {order.acceptedByChef || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      Rider:
                    </span>
                    <span className="text-xs font-black text-gray-800">
                      {order.riderName || "N/A"}
                    </span>
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      Payment Method:
                    </span>
                    <span className="text-xs font-black text-gray-800">
                      {order.paymentMethod || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-orange-200/50 text-xs text-gray-500">
                Order Type:{" "}
                <span className="font-bold text-gray-800 uppercase italic">
                  Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Items Table with Weight */}
          <div className="border border-gray-100 rounded-3xl overflow-hidden mb-6">
            <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
              <h4 className="text-[10px] font-black uppercase text-gray-400">
                Items & Specifications
              </h4>
              <span className="text-[10px] font-bold text-gray-500">
                {order.items?.length} items
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-800">
                      {item.name}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded-md font-bold text-gray-500 uppercase">
                        Qty: {item.quantity}
                      </span>
                      {item.selectedWeight && (
                        <span className="text-[9px] bg-blue-100 px-2 py-0.5 rounded-md font-bold text-blue-600 uppercase">
                          Weight: {item.selectedWeight}
                        </span>
                      )}
                      {item.selectedSpicy && (
                        <span className="text-[9px] bg-red-50 px-2 py-0.5 rounded-md font-bold text-red-500 uppercase">
                          Spicy: {item.selectedSpicy}
                        </span>
                      )}
                      {item.selectedSpicy && (
                        <span className="text-[9px] bg-red-50 px-2 py-0.5 rounded-md font-bold text-red-500 uppercase">
                          Salt: {item.selectedSold}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-gray-900">
                      Rs. {(item.priceValue * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Grand Total Bar */}
            <div className="bg-gray-900 text-white p-5 flex justify-between items-center italic">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Amount to Collect
              </span>
              <span className="text-xl font-black text-[#FF5C00]">
                Rs. {(order.totalAmount || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={onClose}
              className="w-full md:flex-1 bg-black text-white py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-[#FF5C00] transition-all active:scale-95 shadow-lg"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="w-full md:w-auto px-8 border-2 border-gray-100 py-4 rounded-2xl font-bold uppercase text-gray-400 hover:bg-gray-50 transition-all"
            >
              Print Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
