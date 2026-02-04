import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const userData = {
          uid: res.user.uid,
          name: name,
          email: email,
          role: "customer", 
        };

        await setDoc(doc(db, "data", "users", "users", res.user.uid), userData);

        setSuccessMsg("Account Created Successfully!");
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(db, "data", "users", "users", res.user.uid);
        const userDoc = await getDoc(userDocRef);

        let role = "customer";
        if (userDoc.exists()) {
          role = userDoc.data().role;
        }

        onLoginSuccess(role, res.user);
      }
    } catch (err) {
      console.error("Auth Error: ", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1a1a1a] border border-[#FF5C00]/30 p-8 rounded-3xl w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-3xl font-black text-white uppercase mb-6 italic">
          {isSignUp ? "Join the " : "Welcome "}
          <span className="text-[#FF5C00]">GRILL</span>
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#FF5C00]"
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#FF5C00]"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#FF5C00]"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-[#FF5C00] text-white py-3 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all">
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-white/50 text-center mt-6 text-sm">
          {isSignUp ? "Already have an account?" : "New to Ready to Cook?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#FF5C00] ml-2 font-bold underline"
          >
            {isSignUp ? "Sign In" : "Sign Up Now"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
