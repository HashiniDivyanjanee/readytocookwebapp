import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";

const OrderTable = ({ orders }) => {
  const [riders, setRiders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Search සහ Filter සඳහා State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const q = query(
      collection(db, "data", "users", "users"),
      where("role", "==", "rider"),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const riderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRiders(riderList);
    });
    return () => unsub();
  }, []);

  const handleAssignRider = async (orderId, rider) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        riderId: rider.uid,
        riderName: rider.name,
        riderPhone: rider.phone,
        status: "Assigned",
      });
      alert(`Order assigned to ${rider.name}`);
    } catch (err) {
      alert("Error assigning rider: " + err.message);
    }
  };

  // Filtering Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm) ||
      order.id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {/* Search and Filter UI */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Name, Phone or ID..."
            className="w-full p-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-[#FF5C00] outline-none font-bold text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-64">
          <select
            className="w-full p-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-[#FF5C00] outline-none font-black uppercase italic text-[10px] tracking-widest bg-white cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Completed">Completed</option>
            <option value="Picked Up">Picked Up</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl overflow-x-auto border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-gray-900 text-white uppercase text-[10px] tracking-widest font-black italic">
            <tr>
              <th className="p-6">Order</th>
              <th className="p-6">Customer</th>
              <th className="p-6">Total</th>
              <th className="p-6">Status</th>
              <th className="p-6">Rider</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-orange-50/50 cursor-pointer transition-all group"
                >
                  <td className="p-4 md:p-6 font-black italic text-gray-400 group-hover:text-[#FF5C00] whitespace-nowrap">
                    #{order.id.slice(-5)}
                  </td>
                  <td className="p-4 md:p-6 text-sm whitespace-nowrap">
                    <p className="font-black uppercase tracking-tight">
                      {order.customerName}
                    </p>
                    <p className="text-gray-400 text-xs font-medium">
                      {order.phone}
                    </p>
                  </td>
                  <td className="p-4 md:p-6 font-black text-lg italic whitespace-nowrap">
                    Rs. {order.totalAmount || order.total}
                  </td>
                  <td className="p-4 md:p-6 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic ${
                        order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6" onClick={(e) => e.stopPropagation()}>
                    {/* <select
                      value={order.riderId || ""}
                      onChange={(e) => {
                        const rider = riders.find(
                          (r) => r.uid === e.target.value,
                        );
                        if (rider) handleAssignRider(order.id, rider);
                      }}
                      className="bg-gray-50 border-0 text-[10px] font-black uppercase italic p-3 rounded-xl focus:ring-2 focus:ring-[#FF5C00] outline-none"
                    >
                      <option value="">Assign Rider</option>
                      {riders.map((r) => (
                        <option key={r.uid} value={r.uid}>
                          {r.name}
                        </option>
                      ))}
                    </select> */}
                     <p className="text-gray-400 text-xs font-medium">
                      {order.riderName}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-10 text-center font-black italic text-gray-300 uppercase tracking-widest"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="md:hidden text-center text-[10px] text-gray-400 mt-2 italic">
        ← Swipe left or right to view more →
      </p>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};

export default OrderTable;
