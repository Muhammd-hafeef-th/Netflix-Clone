import React, { useEffect, useState } from "react";
import "./Mylist.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../../context/WishListContext";

const IMG_CDN_URL = "https://image.tmdb.org/t/p/original";

const Watchlist = () => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const navigate = useNavigate();
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    useEffect(() => {
        const fetchWatchlist = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setWatchlist(data.watchlist || []);
                    }
                } catch (error) {
                    console.error("Error fetching watchlist:", error);
                }
            }
        };

        fetchWatchlist();
    }, [user]);

    const handleRemove = async (movieId) => {
        try {
            await removeFromWatchlist(movieId);
            setWatchlist((prevWatchlist) =>
                prevWatchlist.filter((movie) => movie.id !== movieId)
            );
        } catch (error) {
            console.error("Error removing from watchlist:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="netflix-mylist-container">
                <div className="mylist-content">
                    <div className="mylist-header">
                        <h1>My List</h1>
                        <div className="list-count">{watchlist.length} Titles in your list</div>
                    </div>

                    {watchlist.length === 0 ? (
                        <div className="empty-watchlist">
                            <div className="empty-icon">
                                <svg
                                    className="w-24 h-24 mx-auto text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>

                            <h2 className="empty-title">Your list is empty</h2>
                            <p className="empty-description">
                                Browse our extensive library and add movies to your list for easy
                                access later.
                            </p>

                            <button
                                onClick={() => navigate("/")}
                                className="empty-browse-button"
                            >
                                Start Browsing
                            </button>
                        </div>
                    ) : (
                        <div className="movies-grid">
                            {watchlist.map((movie) => (
                                <div key={movie.id} className="movie-card">
                                    <div className="movie-poster">
                                        <img
                                            src={`${IMG_CDN_URL}${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                        <div className="movie-overlay">
                                            <button
                                                className="play-button"
                                                onClick={() => navigate(`/player/${movie.id}`)}
                                            >
                                                <i className="fas fa-play"></i>
                                            </button>
                                            <button
                                                className="remove-button"
                                                onClick={() => handleRemove(movie.id)}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="movie-info">
                                        <div className="movie-rating">
                                            <i className="fas fa-star"></i>{" "}
                                            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                                        </div>
                                        <div className="movie-year">
                                            {movie.release_date
                                                ? new Date(movie.release_date).getFullYear()
                                                : "N/A"}
                                        </div>
                                        <h3 className="movie-title">{movie.title || "Untitled"}</h3>
                                        <p className="movie-description">
                                            {movie.overview || "No description available."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Watchlist;