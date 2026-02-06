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

const RiderDashboard = ({ userUid, userName }) => {
  const [myOrders, setMyOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateOrderData = async (order, newStatus, paymentMethod) => {
    try {
      const orderRef = doc(db, "orders", order.id);

      const updateData = {
        status: newStatus,
        paymentMethod: paymentMethod || order.paymentMethod || "Not Selected",
      };

      await updateDoc(orderRef, updateData);

      const orderIdShort = order.id.slice(-5);

      if (newStatus !== order.status) {
        let msg = "";

        if (newStatus === "Delivered") {
          msg =
            `*Ready To Cook*\n\n` +
            `✅ *Your order #${orderIdShort} has been delivered successfully!* Enjoy your meal! 🍽️✨\n\n` +
            `✅ *ඔබේ #${orderIdShort} ඇණවුම සාර්ථකව භාර දෙන ලදී!* ආහාර රසවිඳින්න! 🍽️✨\n\n` +
            `✅ *உங்கள் ஆர்டர் #${orderIdShort} வெற்றிகரமாக விநியோகிக்கப்பட்டது!* உணவை மகிழ்ந்து உண்ணுங்கள்! 🍽️✨`;
        } else if (newStatus === "Returned") {
          msg =
            `*Ready To Cook*\n\n` +
            `🔄 *Your order #${orderIdShort} has been marked as Returned.* Please contact us for more info.\n\n` +
            `🔄 *ඔබේ #${orderIdShort} ඇණවුම නැවත හරවා එවන ලදී (Returned).* වැඩි විස්තර සඳහා අපව අමතන්න.\n\n` +
            `🔄 *உங்கள் ஆர்டர் #${orderIdShort} திரும்பப் பெறப்பட்டது (Returned).* மேலும் தகவலுக்கு எங்களைத் தொடர்பு கொள்ளவும்.`;
        }

        if (msg) sendWhatsApp(order.phone, msg);
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const handleGetOrder = async (order) => {
    try {
      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, {
        riderId: userUid,
        riderName: userName || "Rider",
        status: "Picked Up",
      });

      const orderIdShort = order.id.slice(-5);
      const msg =
        `*Ready To Cook*\n\n` +
        `🛵 *Your order #${orderIdShort} has been picked up!* Our rider is on the way.\n\n` +
        `🛵 *ඔබේ #${orderIdShort} ඇණවුම ලබාගන්නා ලදී!* අපගේ බෙදාහැරීමේ නියෝජිතයා දැන් පැමිණෙමින් සිටී.\n\n` +
        `🛵 *உங்கள் ஆர்டர் #${orderIdShort} எடுக்கப்பட்டது!* எங்கள் விநியோகஸ்தர் இப்போது வந்து கொண்டிருக்கிறார்.`;

      sendWhatsApp(order.phone, msg);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to release this order?")) {
      try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
          riderId: null,
          status: "Completed",
        });
      } catch (err) {
        console.error("Error cancelling order:", err);
      }
    }
  };

  const sendWhatsApp = (phone, message) => {
    const formattedPhone = phone.startsWith("0")
      ? "94" + phone.substring(1)
      : phone;
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (!userUid) return;
    const qAvailable = query(
      collection(db, "orders"),
      where("status", "==", "Completed"),
    );
    const qMyTasks = query(
      collection(db, "orders"),
      where("riderId", "==", userUid),
    );

    const unsubAvailable = onSnapshot(qAvailable, (snapshot) => {
      const available = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((order) => !order.riderId);
      setAvailableOrders(available);
    });

    const unsubMyTasks = onSnapshot(qMyTasks, (snapshot) => {
      setMyOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubAvailable();
      unsubMyTasks();
    };
  }, [userUid]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-10 font-sans">
      {/* --- SECTION: AVAILABLE ORDERS --- */}
      <section>
        <h1 className="text-2xl font-black italic uppercase mb-4">
          Available <span className="text-[#FF5C00]">Orders</span> 🔔
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableOrders.length === 0 ? (
            <p className="text-gray-400 font-bold italic">
              Waiting for new orders...
            </p>
          ) : (
            availableOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 rounded-[2rem] shadow-md border-2 border-orange-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-black text-[#FF5C00]">
                    #{order.id.slice(-5)}
                  </span>
                  <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full font-bold uppercase">
                    Ready
                  </span>
                </div>
                <h3 className="font-black uppercase">{order.customerName}</h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-1">
                  {order.address}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 bg-gray-100 text-black py-3 rounded-xl font-black uppercase text-[10px] hover:bg-gray-200 transition-all"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleGetOrder(order)}
                    className="flex-[2] bg-[#FF5C00] text-white py-3 rounded-xl font-black uppercase text-[10px] hover:bg-black transition-all"
                  >
                    Get Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* --- SECTION: MY TASKS --- */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black italic uppercase">
            My <span className="text-[#FF5C00]">Tasks</span> 🛵
          </h1>
          <div className="bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
            {myOrders.length} In Progress
          </div>
        </div>

        {myOrders.length === 0 ? (
          <div className="bg-gray-50 p-10 rounded-[2rem] border-2 border-dashed border-gray-200 text-center text-gray-400 font-bold">
            No orders picked up yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {myOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div
                  onClick={() => setSelectedOrder(order)}
                  className="flex-1 cursor-pointer group"
                >
                  <p className="font-black italic text-[#FF5C00]">
                    #{order.id.slice(-5)} View Details
                  </p>
                  <h3 className="font-black uppercase text-lg">
                    {order.customerName}
                  </h3>
                  <p className="text-gray-400 text-xs">{order.address}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-orange-50 text-[#FF5C00] text-[9px] px-2 py-1 rounded-md font-bold uppercase">
                      Pay: {order.paymentMethod || "Pending"}
                    </span>
                    <span
                      className={`text-[9px] px-2 py-1 rounded-md font-bold uppercase ${order.status === "Returned" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
                    >
                      Status: {order.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                  {/* Payment Method */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-black uppercase text-gray-400 ml-1">
                      Payment Method
                    </label>
                    <select
                      onChange={(e) =>
                        handleUpdateOrderData(
                          order,
                          order.status,
                          e.target.value,
                        )
                      }
                      value={order.paymentMethod || ""}
                      className="bg-white border-2 border-gray-200 text-black text-[10px] font-black uppercase p-2 rounded-lg outline-none focus:border-[#FF5C00]"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Online">Online / Koko</option>
                    </select>
                  </div>

                  {/* Status Dropdown + Return Option */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] font-black uppercase text-gray-400 ml-1">
                      Order Status
                    </label>
                    <select
                      onChange={(e) =>
                        handleUpdateOrderData(
                          order,
                          e.target.value,
                          order.paymentMethod,
                        )
                      }
                      value={order.status}
                      className={`text-[10px] font-black uppercase p-2 rounded-lg outline-none text-white ${order.status === "Returned" ? "bg-red-600" : "bg-gray-900"}`}
                    >
                      <option value="Picked Up">Picked Up</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Returned">Returned 🔄</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"
                  >
                    Release
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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
