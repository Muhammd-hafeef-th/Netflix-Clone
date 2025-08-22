import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Movies.css";
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useWatchlist } from "../../context/WishListContext";
import { useAuth } from "../../context/AuthContext";


const IMG_CDN_URL = "https://image.tmdb.org/t/p/original";

const MovieDetail = () => {

  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const {user}=useAuth()

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmIzYTExYTA4ZTU1NWNhZThlYzVlNTkwNDZkMDc4MCIsIm5iZiI6MTc1NTUyMjA2NC4zMzMsInN1YiI6IjY4YTMyNDEwZjRiNjczYjUzZTBjMDcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SySfDG3LhLrT1Sx_sXoEl6lGH6Vbbm2qv8D3pwTs2uo"
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log("Movie API Response:", res);
        setMovie(res);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) {
    return <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  }
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="movie-detail">
      <Header />
      <div className="movie-hero">
        <img
          src={`${IMG_CDN_URL}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-hero-overlay">
          <div className="movie-info">
            <h1>{movie.title}</h1>

            <div className="movie-meta">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>{movie.runtime} min</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>

            <p>{movie.overview}</p>

            <div className="movie-buttons">
              <button
                className="play-btn"
                onClick={() => navigate(`/player/${movie.id}`)}
              >
                ▶ Play
              </button>
              {inWatchlist ? (
                <button
                  className="watchlist-btn remove"
                  onClick={() => user?removeFromWatchlist(movie.id):navigate('/login')}
                >
                  ❌ Remove from Watchlist
                </button>
              ) : (
                <button
                  className="watchlist-btn add"
                  onClick={() => user?addToWatchlist(movie):navigate('/login')}
                >
                  🤍 Add to Watchlist
                </button>
              )}
              <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="details-section">
        <div className="details-grid">
          <div className="movie-poster-container">
            <img
              src={`${IMG_CDN_URL}${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="netflix-badge">N</div>
          </div>

          <div className="details-info">
            <div className="info-section">
              <h3 className="section-title">Genres</h3>
              <div className="genre-badges">
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="genre-badge">{genre.name}</span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3 className="section-title">Release Date</h3>
              <p className="info-text">{movie.release_date}</p>
            </div>

            <div className="info-section">
              <h3 className="section-title">Production Companies</h3>
              <div className="companies-list">
                {movie.production_companies?.map((company) => (
                  <p key={company.id} className="company-item">
                    <span className="company-bullet">•</span> {company.name}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetail;
