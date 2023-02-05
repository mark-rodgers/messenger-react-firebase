import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          throw new Error("Email is already in use.");
        case "auth/weak-password":
          throw new Error("Password is too weak.");
        default:
          console.log(err);
          throw new Error("Something went wrong. Please try again later.");
      }
    }
  };

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          throw new Error(
            "The email and password you entered did not match our records. Please double check and try again."
          );
        case "auth/wrong-password":
          throw new Error(
            "The email and password you entered did not match our records. Please double check and try again."
          );
        default:
          console.log(err);
          throw new Error("Something went wrong. Please try again later.");
      }
    }
  };

  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (err) {
      switch (err.code) {
        default:
          console.log(err);
          throw new Error("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
