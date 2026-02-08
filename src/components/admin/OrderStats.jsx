import React, { useState } from "react";

const OrderStats = ({ orders }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const filteredOrders = selectedDate
    ? orders.filter((order) => {
        const orderDate = order.createdAt?.toDate?.().toISOString().split("T")[0];
        return orderDate === selectedDate;
      })
    : orders;


    const getCount = (status) => filteredOrders.filter((o) => o.status === status).length;

  const stats = [
   

    { title: "Total Order", count: filteredOrders.length, color: "from-blue-500 to-blue-700", icon: "📋" },
    { title: "Prepare Complete", count: getCount("Completed"), color: "from-emerald-400 to-emerald-600", icon: "✅" },
    { title: "Preparing", count: getCount("Preparing"), color: "from-orange-400 to-orange-600", icon: "👨‍🍳" },
    { title: "Delivered", count: getCount("Delivered"), color: "from-purple-500 to-purple-700", icon: "🛵" },
    { title: "Pending", count: getCount("pending"), color: "from-amber-300 to-amber-500", icon: "⏳" },
    { title: "Cancelled", count: getCount("Cancelled"), color: "from-red-500 to-red-700", icon: "🚫" },

  ];

  return (
    <div className="p-4">
      {/* Date Picker */}
      <div className="mb-8 flex items-center gap-4">
        <label className="font-bold text-gray-700">Date</label>
        <input
          type="date"
          className="border-2 border-black p-1 px-4 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {selectedDate && (
           <button onClick={() => setSelectedDate("")} className="text-xs text-red-500 underline">Clear</button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} border-4 border-black rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 ${
              index === 6 ? "md:col-start-2" : "" 
            }`}
          >
            <h3 className="text-lg font-bold text-center mb-2">{stat.title}</h3>
            <span className="text-5xl font-black">{stat.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStats;