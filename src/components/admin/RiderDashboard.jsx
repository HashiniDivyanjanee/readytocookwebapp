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
      }
    );

    return () => unsub();
  }, [userUid]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black italic uppercase">
          My <span className="text-[#FF5C00]">Tasks</span>
        </h1>
        <div className="bg-[#FF5C00] text-white px-4 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
          {myOrders.length} Orders
        </div>
      </div>

      {myOrders.length === 0 ? (
        <div className="bg-white p-10 rounded-[2rem] border-2 border-dashed border-gray-100 text-center text-gray-400 font-bold">
          No orders assigned to you yet.
        </div>
      ) : (
        <>
          {/* --- MOBILE VIEW (Cards) --- */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {myOrders.map((order) => (
              <div 
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 space-y-4 active:scale-95 transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase italic">Order ID</span>
                    <p className="font-black italic text-[#FF5C00]">#{order.id.slice(-5)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase italic ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-[#FF5C00]'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-black uppercase text-gray-900">{order.customerName}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{order.address}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex gap-2">
                    {/* Call Button */}
                    <a 
                      href={`tel:${order.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </a>
                    {/* Maps Button */}
                    <a
                      href={order.mapLocation || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </a>
                  </div>

                  <select
                    onChange={(e) => {
                      e.stopPropagation();
                      handleUpdateStatus(order.id, e.target.value);
                    }}
                    value={order.status}
                    className="bg-gray-900 text-white text-[10px] font-black uppercase italic p-2 rounded-lg outline-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* --- DESKTOP VIEW (Table) --- */}
          <div className="hidden md:block bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-white uppercase text-[10px] tracking-widest font-black italic">
                <tr>
                  <th className="p-6">Order</th>
                  <th className="p-6">Customer</th>
                  <th className="p-6">Contact</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-orange-50/50 transition-all cursor-pointer group"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="p-6 font-black italic text-gray-400 group-hover:text-[#FF5C00]">
                      #{order.id.slice(-5)}
                    </td>
                    <td className="p-6">
                      <p className="font-black uppercase text-sm leading-none mb-1">{order.customerName}</p>
                      <p className="text-gray-400 text-[10px] font-medium uppercase tracking-tighter">{order.address}</p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                        <a href={`tel:${order.phone}`} className="font-black text-sm hover:text-[#FF5C00]">{order.phone}</a>
                        <a
                          href={order.mapLocation || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </a>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="bg-orange-100 text-[#FF5C00] px-3 py-1 rounded-full text-[10px] font-black uppercase italic">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <select
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
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
        </>
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