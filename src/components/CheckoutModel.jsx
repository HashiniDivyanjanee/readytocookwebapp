import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import LocationPicker from "./LocationPicker";

export const CheckoutModal = ({ isOpen, onClose, cart, total, clearCart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [position, setPosition] = useState({ lat: 6.9271, lng: 79.8612 });

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const googleMapsUrl = `https://www.google.com/maps?q=${position.lat},${position.lng}`;
    const itemDetails = cart
      .map((item) => {
        const price = Number(item.priceValue) || 0;
        const qty = Number(item.quantity) || 0;

        const weight = item.selectedWeight
          ? `%0A   - Weight: ${item.selectedWeight}`
          : "";
        const salt = item.selectedSold
          ? `%0A   - Salt: ${item.selectedSold}`
          : "";
        const spicy = item.selectedSpicy
          ? `%0A   - Spicy: ${item.selectedSpicy}`
          : "";

        return `• *${item.name}* (x${qty})${weight}${salt}${spicy}%0A   - Subtotal: Rs. ${(price * qty).toFixed(2)}`;
      })
      .join("%0A%0A");

    const message =
      `*NEW ORDER RECEIVED!*%0A%0A` +
      `*Customer:* ${customerInfo.name}%0A` +
      `*Phone:* ${customerInfo.phone}%0A` +
      `*Address:* ${customerInfo.address}%0A%0A` +
      `*--- ORDER ITEMS ---*%0A${itemDetails}%0A%0A` +
      `*Total Amount: Rs. ${total.toFixed(2)}*%0A%0A` +
      `*Delivery Location:*%0A${googleMapsUrl}`;

    const whatsappNumber = "94775407767";
    // const whatsappNumber = "94769070920";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    try {
      // 1. Firebase එකට Save කිරීම
      await addDoc(collection(db, "orders"), {
        customerName: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
        mapLocation: googleMapsUrl,
        items: cart,
        totalAmount: total,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // 2. WhatsApp එකට යැවීම
      window.open(whatsappUrl, "_blank");

      // 3. CART එක හිස් කිරීම (මෙය වැදගත්)
      if (clearCart) {
        clearCart();
      }

      alert("Order Placed Successfully!");
      onClose(); // Modal එක වසා දැමීම
    } catch (error) {
      console.error("Firebase Error: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 bg-gray-50 border-b flex justify-between items-center shrink-0">
          <h2 className="font-oswald text-2xl font-black uppercase tracking-tight text-gray-900">
            Delivery Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Your Name"
              className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#FF5C00]"
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, name: e.target.value })
              }
            />
            <input
              required
              type="tel"
              placeholder="Phone Number (e.g. 0771234567)"
              className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#FF5C00]"
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, phone: e.target.value })
              }
            />
            <textarea
              required
              placeholder="Delivery Address"
              className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 ring-[#FF5C00] h-24"
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, address: e.target.value })
              }
            />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600">
                  Pin Your Location
                </label>
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  className="text-xs bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200"
                >
                  📍 Use Current Location
                </button>
              </div>

              <div className="h-48 w-full rounded-2xl overflow-hidden border-2 border-gray-100 relative z-10">
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker
                    position={position}
                    setPosition={setPosition}
                  />
                </MapContainer>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5C00] text-white py-5 rounded-2xl font-bold text-lg uppercase shadow-xl hover:bg-black transition-all"
            >
              Confirm & Send to WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
