import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";

const RiderDashboard = ({ userUid }) => {
  const [myOrders, setMyOrders] = useState([]);

useEffect(() => {
  console.log("RiderDashboard received UID:", userUid);

  if (!userUid) {
    console.log("Still waiting for UID...");
    return;
  }

  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("riderId", "==", userUid));

  const unsub = onSnapshot(q, (snapshot) => {
    console.log("Snapshot size for", userUid, ":", snapshot.size);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMyOrders(orders);
  }, (err) => {
    console.error("Firestore Error:", err.message);
  });

  return () => unsub();
}, [userUid]); 

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-black italic uppercase mb-8">My <span className="text-[#FF5C00]">Tasks</span></h1>

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
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myOrders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50/50 transition-all">
                  <td className="p-6 font-black italic text-gray-400">#{order.id.slice(-5)}</td>
                  <td className="p-6">
                    <p className="font-black uppercase text-sm">{order.customerName}</p>
                    <p className="text-gray-400 text-xs">{order.address}</p>
                  </td>
                  <td className="p-6">
                    <span className="bg-orange-100 text-[#FF5C00] px-3 py-1 rounded-full text-[10px] font-black uppercase italic">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <select
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      value={order.status}
                      className="bg-gray-50 border-0 text-[10px] font-black uppercase italic p-2 rounded-lg outline-none"
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
    </div>
  );
};

export default RiderDashboard;