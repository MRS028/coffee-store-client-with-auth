import React, { createContext, useState, useEffect } from "react";
import { auth } from "../Firebase/firebase.init"; // Make sure firebase is correctly initialized
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null (not undefined)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Monitor authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state based on auth state change
      setLoading(false); // Stop loading once auth state is known
    });
    return unsubscribe; // Cleanup listener on component unmount
  }, []);

  // Create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user); // এখানে ইউজার সেট করা হচ্ছে
        setLoading(false); // লোডিং বন্ধ করুন
        return userCredential; // userCredential পুরো রিটার্ন করুন
      })
      .catch((err) => {
        setLoading(false); // লোডিং বন্ধ করুন
        throw err; // ত্রুটি ছুঁড়ে দিন
      });
  };
  

  // Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        setLoading(false); 
        throw err; 
      });
  };

  // Login with email/password
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log out
  const userLogOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null); 
      })
      .catch((err) => {
        setLoading(false); 
        throw err; // Handle the error
      });
  };

  // Pass necessary data to children via context
  const userInfo = {
    user,
    setUser,
    setError,
    loading,
    createUser,
    signInWithGoogle,
    userLogin,
    userLogOut,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
