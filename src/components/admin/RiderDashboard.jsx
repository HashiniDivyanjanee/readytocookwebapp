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

const RiderDashboard = ({ userUid }) => {
  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      console.log("Status updated to:", newStatus);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Status update failed!");
    }
  };

  useEffect(() => {
    if (!userUid) return;

    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("riderId", "==", userUid));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyOrders(orders);
      },
      (err) => {
        console.error("Firestore Error:", err.message);
      },
    );

    return () => unsub();
  }, [userUid]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-black italic uppercase mb-8">
        My <span className="text-[#FF5C00]">Tasks</span>
      </h1>

      {myOrders.length === 0 ? (
        <div className="bg-white p-10 rounded-[2.5rem] border border-dashed text-center text-gray-400">
          No orders found for your ID.
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900 text-white uppercase text-[10px] tracking-widest font-black italic">
              <tr>
                <th className="p-6">Order</th>
                <th className="p-6">Customer</th>
                <th className="p-6">Phone Number</th>
                <th className="p-6">Location</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-orange-50/50 transition-all"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="p-6 font-black italic text-gray-400">
                    #{order.id.slice(-5)}
                  </td>
                  <td className="p-6">
                    <p className="font-black uppercase text-sm">
                      {order.customerName}
                    </p>
                    <p className="text-gray-400 text-xs">{order.address}</p>
                  </td>
                  <td className="p-6">
                    <p className="font-black uppercase text-sm">
                      {order.phone}
                    </p>
                  </td>
                  <td className="p-6" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      title="Open in Google Maps"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </a>
                  </td>

                  <td className="p-6">
                    <span className="bg-orange-100 text-[#FF5C00] px-3 py-1 rounded-full text-[10px] font-black uppercase italic">
                      {order.status}
                    </span>
                  </td>
                  <td
                    className="p-6 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      onChange={(e) =>
                        handleUpdateStatus(order.id, e.target.value)
                      }
                      value={order.status}
                      className="bg-gray-50 border border-gray-200 text-[10px] font-black uppercase italic p-2 rounded-lg outline-none cursor-pointer focus:border-[#FF5C00]"
                    >
                      <option value="Assigned">Assigned</option>
                      <option value="Picked Up">Picked Up</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default RiderDashboard;
