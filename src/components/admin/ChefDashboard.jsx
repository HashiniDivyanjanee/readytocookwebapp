import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import OrderDetailsModal from "./OrderDetailsModal";

const ChefDashboard = ({ userRole, userName }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState(null);

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
            if (userRole === "marinate chef")
              return item.mainCategory === "Marinade";
            if (userRole === "readymade chef")
              return item.mainCategory === "Readymade";
            return true;
          });
          if (relevantItems && relevantItems.length > 0)
            return { ...order, items: relevantItems };
          return null;
        })
        .filter((order) => order !== null && order.status !== "Delivered");

      setOrders(filtered);
    });
    return () => unsub();
  }, [userRole]);

  const displayOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sendWhatsApp = (phone, msg) => {
    const formattedPhone = phone.startsWith("0")
      ? `94${phone.slice(1)}`
      : phone;
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleTransferOrder = async (order) => {
    const orderRef = doc(db, "orders", order.id);

    const updatedItems = order.items.map((item) => {
      if (item.mainCategory === "Marinade") {
        return { ...item, mainCategory: "Readymade" };
      }
      return item;
    });

    try {
      await updateDoc(orderRef, {
        items: updatedItems,
        transferredBy: userName,
        transferredAt: new Date().toISOString(),
      });
      alert("Order transferred to Readymade Chef!");
    } catch (error) {
      console.error("Transfer Error: ", error);
    }
  };

  const handleStatusUpdate = async (order, newStatus) => {
    const orderRef = doc(db, "orders", order.id);
    const updateData = {
      status: newStatus,
      acceptedByChef: userName,
    };

    if (userRole === "marinate chef") {
      updateData["sectionStatus.marinade"] = newStatus;
    } else if (userRole === "readymade chef") {
      updateData["sectionStatus.readymade"] = newStatus;
    }

    try {
      await updateDoc(orderRef, updateData);
      const orderIdShort = order.id.slice(-5);
      let msg = "";
      if (newStatus === "Preparing") {
        msg =
          `ඔයාගෙ ඕඩර් එක #${orderIdShort} ඇක්සෙප්ට් කරා. දැන් සූදානම් කරමින් පවතිනවා! 👨‍🍳\n\n` +
          `Your order #${orderIdShort} has been accepted and is now being prepared!\n\n` +
          `உங்கள் ஆர்டர் #${orderIdShort} ஏற்றுக்கொள்ளப்பட்டது, இப்போது தயார் செய்யப்படுகிறது!`;
      } else if (newStatus === "Cancelled") {
        msg =
          `කණගාටුයි, ඔයාගෙ ඕඩර් එක #${orderIdShort} අපිට දැනට අවලංගු (Cancel) කිරීමට සිදු වුණා. ❌\n\n` +
          `Sorry, we had to cancel your order #${orderIdShort} for now.\n\n` +
          `மன்னிக்கவும், உங்கள் ஆர்டர் #${orderIdShort} தற்போது ரத்து செய்யப்பட்டுள்ளது.`;
      } else if (newStatus === "Completed") {
        msg =
          `ඔයාගෙ ඕඩර් එක #${orderIdShort} සාර්ථකව සූදානම් කර අවසන්! 🍕\n\n` +
          `Your order #${orderIdShort} has been successfully prepared!\n\n` +
          `உங்கள் ஆர்டர் #${orderIdShort} வெற்றிகரமாக தயார் செய்யப்பட்டுவிட்டது!`;
      }

      if (msg) {
        sendWhatsApp(order.customerPhone || order.phone, msg);
      }
    } catch (error) {
      console.error("Update Error: ", error);
    }
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-black uppercase mb-6 italic">
          Chef <span className="text-[#FF5C00]">Kitchen</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by Name or Phone..."
            className="flex-1 p-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 rounded-2xl border border-gray-200 font-bold bg-white"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="grid gap-4">
          {displayOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-orange-200"
            >
              <div
                className="flex-1 cursor-pointer w-full"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-black text-[#FF5C00] hover:underline">
                    #{order.id.slice(-5)} - More Details 🔍
                  </p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : order.status === "Preparing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm font-bold uppercase text-gray-800">
                  {order.customerName}
                </p>
                <p className="text-xs text-gray-600">{order.phone}</p>

                {order.acceptedByChef && (
                  <p className="text-[10px] text-blue-600 font-bold mt-1 uppercase">
                    👨‍🍳 Accepted by: {order.acceptedByChef}
                  </p>
                )}

                <div className="text-xs text-gray-400 mt-2 italic">
                  {order.items
                    .map((i) => `${i.name} (x${i.quantity})`)
                    .join(", ")}
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto mt-2">
                {userRole === "marinate chef" && order.status === "pending" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTransferOrder(order);
                    }}
                    className="flex-1 md:flex-none bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-blue-700 transition-all"
                  >
                    Transfer Order 🔄
                  </button>
                )}

                {(order.status === "pending" ||
                  order.status === "Cancelled") && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusUpdate(order, "Preparing");
                    }}
                    className="flex-1 md:flex-none bg-black text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-gray-800 transition-all"
                  >
                    {order.status === "Cancelled" ? "Re-Accept" : "Accept"}
                  </button>
                )}

                {order.status === "Preparing" && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(order, "Cancelled");
                      }}
                      className="flex-1 md:flex-none bg-red-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(order, "Completed");
                      }}
                      className="flex-1 md:flex-none bg-[#FF5C00] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase"
                    >
                      Mark Completed
                    </button>
                  </>
                )}
                {order.status === "Completed" && (
                  <span className="text-green-600 font-bold italic text-sm">
                    ✓ Order Done
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ඕඩර් එකක් තෝරාගෙන තිබේ නම් පමණක් මොඩල් එක පෙන්වන්න */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default ChefDashboard;
