import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase"; 
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext"; 

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) {
        setWatchlist([]);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setWatchlist(userSnap.data().watchlist || []);
      } else {
        await setDoc(userRef, { watchlist: [] }, { merge: true });
        setWatchlist([]);
      }
    };

    fetchWatchlist();
  }, [user]);

  const addToWatchlist = async (movie) => {
    if (!user) return;

    if (!watchlist.some((m) => m.id === movie.id)) {
      const updatedList = [...watchlist, movie];
      setWatchlist(updatedList);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { watchlist: updatedList });
    }
  };

  const removeFromWatchlist = async (id) => {
    if (!user) return;

    const updatedList = watchlist.filter((m) => m.id !== id);
    setWatchlist(updatedList);

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { watchlist: updatedList });
  };

  const isInWatchlist = (id) => {
    return watchlist.some((m) => m.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};
