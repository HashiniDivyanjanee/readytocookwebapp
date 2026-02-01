import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import ProductForm from "./admin/ProductForm";
import OfferForm from "./admin/OfferForm";
import ManageProducts from "./admin/ManageProducts";
import OrderTable from "./admin/OrderTable";
import ManageOffers from "./admin/ManageOffers";
import ManageGallery from "./admin/ManageGallery";
import GalleryForm from "./admin/GalleryForm";
import RiderForm from "./admin/RiderForm";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AdminDashboard = () => {
  const [adminView, setAdminView] = useState("overview");
  const [loading, setLoading] = useState(false);

  // States
  const [allProducts, setAllProducts] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);

  // Form States (Products/Offers)
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    desc: "",
  });
  const [productImg, setProductImg] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [offerData, setOfferData] = useState({
    name: "",
    subtitle: "",
    offerPrice: "",
    discount: "",
  });
  const [offerImg, setOfferImg] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);

  useEffect(() => {
    // 1. Products
    const unsubProds = onSnapshot(
      query(collection(db, "products"), orderBy("createdAt", "desc")),
      (s) => setAllProducts(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );

    // 2. Offers
    const unsubOffers = onSnapshot(
      query(collection(db, "offers"), orderBy("createdAt", "desc")),
      (s) => setAllOffers(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );

    // 3. Orders
    const unsubOrders = onSnapshot(
      query(collection(db, "orders"), orderBy("createdAt", "desc")),
      (s) => setOrders(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );

    // 4. Gallery
    const unsubGal = onSnapshot(
      query(collection(db, "gallery"), orderBy("uploadedAt", "desc")),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Gallery items fetched:", items.length);
        setGalleryItems(items);
      },
      (err) => console.error("Gallery Error:", err),
    );

    return () => {
      unsubProds();
      unsubOffers();
      unsubOrders();
      unsubGal();
    };
  }, []);

  // --- Gallery Upload Logic ---
 const handleGalleryUpload = async (files) => {
  setLoading(true);
  try {
    const uploadPromises = files.map(async (file) => {
      const imgRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);

      return addDoc(collection(db, "gallery"), {
        imageUrl: url,
        uploadedAt: serverTimestamp(),
      });
    });

    await Promise.all(uploadPromises);

    alert(`Successfully uploaded ${files.length} images!`);
    setAdminView("manage-gallery");
  } catch (err) {
    alert("Gallery Error: " + err.message);
  }
  setLoading(false);
};


  const handleProductUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imgUrl = productData.image || "";
      if (productImg) {
        const imgRef = ref(
          storage,
          `products/${Date.now()}_${productImg.name}`,
        );
        await uploadBytes(imgRef, productImg);
        imgUrl = await getDownloadURL(imgRef);
      }

      const finalData = {
        ...productData,
        price: parseFloat(productData.price),
        image: imgUrl,
      };

      if (editingProduct) {
        await updateDoc(doc(db, "products", editingProduct), finalData);
        alert("Product Updated Successfully!");
      } else {
        await addDoc(collection(db, "products"), {
          ...finalData,
          createdAt: serverTimestamp(),
        });
        alert("Product Added Successfully!");

        setProductData({
          name: "",
          price: "",
          category: "",
          desc: "",
        });

        setProductImg(null);
      }
      setAdminView("manage-products");
      setEditingProduct(null);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  const handleOfferUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imgUrl = offerData.image || "";
      if (offerImg) {
        const imgRef = ref(storage, `offers/${Date.now()}_${offerImg.name}`);
        await uploadBytes(imgRef, offerImg);
        imgUrl = await getDownloadURL(imgRef);
      }
      if (editingOffer) {
        await updateDoc(doc(db, "offers", editingOffer), {
          ...offerData,
          image: imgUrl,
        });
      } else {
        await addDoc(collection(db, "offers"), {
          ...offerData,
          image: imgUrl,
          createdAt: serverTimestamp(),
        });
      }
      setAdminView("manage-offers");
      setEditingOffer(null);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };


  const handleRiderUpload = async (riderData) => {
    setLoading(true);
    try {
      const tempPassword = riderData.phone || "rider123";

      const res = await createUserWithEmailAndPassword(
        auth,
        riderData.email,
        tempPassword,
      );
      const uid = res.user.uid;

      await setDoc(doc(db, "data", "users", "users", uid), {
        uid: uid,
        name: riderData.name,
        email: riderData.email,
        phone: riderData.phone,
        vehicleNo: riderData.vehicleNo,
        role: "rider",
        status: "active",
        createdAt: serverTimestamp(),
      });

      alert(
        "Rider created! Note: You have been logged out for security. Please log in again as Admin.",
      );
      window.location.reload();
    } catch (err) {
      console.error("Auth & Firestore Error: ", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex justify-between items-center">
          <h1 className="text-4xl font-black italic uppercase">
            Admin <span className="text-[#FF5C00]">Panel</span>
          </h1>
          {adminView !== "overview" && (
            <button
              onClick={() => setAdminView("overview")}
              className="bg-black text-white px-6 py-2 rounded-full font-bold uppercase text-xs"
            >
              Back
            </button>
          )}
        </div>

        {adminView === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DashboardCard
              icon="➕"
              title="Add Product"
              onClick={() => setAdminView("add-product")}
            />
            <DashboardCard
              icon="🔥"
              title="Add Offer"
              onClick={() => setAdminView("add-offer")}
            />
            <DashboardCard
              icon="🖼️"
              title="Add Gallery"
              onClick={() => setAdminView("add-gallery")}
            />
            <DashboardCard
              icon="📦"
              title="Live Orders"
              onClick={() => setAdminView("orders")}
            />
            <DashboardCard
              icon="🛠️"
              title="Manage Items"
              onClick={() => setAdminView("manage-products")}
            />
            <DashboardCard
              icon="💥"
              title="Manage Offers"
              onClick={() => setAdminView("manage-offers")}
            />
            <DashboardCard
              icon="📸"
              title="Manage Gallery"
              onClick={() => setAdminView("manage-gallery")}
            />
            <DashboardCard
              icon="🛵"
              title="Add Rider"
              onClick={() => setAdminView("add-rider")}
            />
          </div>
        )}

        {adminView === "add-rider" && (
          <RiderForm loading={loading} onAddRider={handleRiderUpload} />
        )}

        {adminView === "add-gallery" && (
          <GalleryForm loading={loading} handleUpload={handleGalleryUpload} />
        )}

        {adminView === "manage-gallery" && (
          <ManageGallery galleryItems={galleryItems} />
        )}
        {adminView === "add-product" && (
          <ProductForm
            loading={loading}
            productData={productData}
            setProductData={setProductData}
            setProductImg={setProductImg}
            handleSubmit={handleProductUpload}
            isEditing={!!editingProduct}
          />
        )}

        {adminView === "add-offer" && (
          <OfferForm
            loading={loading}
            offerData={offerData}
            setOfferData={setOfferData}
            setOfferImg={setOfferImg}
            handleSubmit={handleOfferUpload}
            isEditing={!!editingOffer}
          />
        )}

        {adminView === "manage-products" && (
          <ManageProducts
            products={allProducts}
            onEdit={(p) => {
              setProductData(p);
              setEditingProduct(p.id);
              setAdminView("add-product");
            }}
          />
        )}

         {adminView === "manage-offers" && (
          <ManageOffers
            offers={allOffers}
            onEdit={(o) => {
              setOfferData(o);
              setEditingOffer(o.id);
              setAdminView("add-offer");
            }}
          />
        )}

        {adminView === "orders" && (
          <OrderTable
            orders={orders}
            updateOrderStatus={(id, s) =>
              updateDoc(doc(db, "orders", id), { status: s })
            }
          />
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-8 rounded-[2rem] shadow-md hover:shadow-xl transition-all border border-gray-100 group"
  >
    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-bold">{title}</h3>
  </button>
);

export default AdminDashboard;
