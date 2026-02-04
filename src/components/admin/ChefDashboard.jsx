import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

const ChefDashboard = ({ userRole }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const q = query(collection(db, "orders"));
  const unsub = onSnapshot(q, (snapshot) => {
    const allOrders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filtered = allOrders
      .map((order) => {
        const relevantItems = order.items?.filter((item) => {
          if (userRole === "marinate chef") {
            return item.mainCategory === "Marinade";
          }
          if (userRole === "readymade chef") {
            return item.mainCategory === "Readymade";
          }
          return true;
        });

        if (relevantItems && relevantItems.length > 0) {
          return { ...order, items: relevantItems };
        }
        return null;
      })
      .filter((order) => order !== null && order.status !== "Delivered");

    setOrders(filtered);
  });
  return () => unsub();
}, [userRole]);


  const sendWhatsApp = (phone, msg) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleStatusUpdate = async (order, newStatus) => {
    const orderRef = doc(db, "orders", order.id);
    await updateDoc(orderRef, { status: newStatus });

    let msg = "";
    if (newStatus === "Preparing")
      msg = `Your order #${order.id.slice(-5)} is being prepared! 👨‍🍳`;
    if (newStatus === "Ready")
      msg = `Your order #${order.id.slice(-5)} is ready for delivery! 🍕`;

    sendWhatsApp(order.customerPhone || order.phone, msg);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black uppercase mb-6 italic">
        Chef <span className="text-[#FF5C00]">Kitchen</span>
      </h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center"
          >
            <div>
              <p className="font-black text-[#FF5C00]">#{order.id.slice(-5)}</p>
              <p className="text-sm font-bold uppercase">
                {order.customerName}
              </p>
              <div className="text-xs text-gray-500">
                {order.items
                  .map((i) => `${i.name} (x${i.quantity})`)
                  .join(", ")}
              </div>
            </div>
            <div className="flex gap-2">
              {order.status === "Pending" && (
                <button
                  onClick={() => handleStatusUpdate(order, "Preparing")}
                  className="bg-black text-white px-4 py-2 rounded-xl font-bold text-xs uppercase"
                >
                  Accept
                </button>
              )}
              {order.status === "Preparing" && (
                <button
                  onClick={() => handleStatusUpdate(order, "Ready")}
                  className="bg-[#FF5C00] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase"
                >
                  Mark Ready
                </button>
              )}
              <span className="bg-gray-100 px-3 py-2 rounded-xl text-[10px] font-black italic uppercase">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefDashboard;
