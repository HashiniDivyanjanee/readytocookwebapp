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

  return (
    <>
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
            {orders.map((order) => (
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
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase italic">
                    {order.status}
                  </span>
                </td>
                <td className="p-6" onClick={(e) => e.stopPropagation()}>
                  <select
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
                  </select>
                </td>
              </tr>
            ))}
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
