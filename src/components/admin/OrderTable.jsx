import React from "react";

const OrderTable = ({ orders, updateOrderStatus }) => (
  <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
      <h2 className="text-2xl font-bold italic uppercase">Live <span className="text-green-600">Orders</span></h2>
      <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs font-bold uppercase">
        {orders.length} Total Orders
      </span>
    </div>
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-gray-400 text-xs uppercase tracking-widest">
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Items</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-gray-50/50 hover:bg-gray-100 transition-colors rounded-2xl">
              <td className="px-6 py-4">
                <div className="font-bold text-gray-800">{order.customerName}</div>
                <div className="text-xs text-gray-500">{order.phone}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {order.items?.map((item) => `${item.name} x${item.quantity}`).join(", ")}
              </td>
              <td className="px-6 py-4 font-black text-[#FF5C00]">LKR {order.totalAmount}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === "delivered" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                  {order.status || "pending"}
                </span>
              </td>
              <td className="px-6 py-4">
                <select onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="bg-white border text-xs p-2 rounded-lg">
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderTable;