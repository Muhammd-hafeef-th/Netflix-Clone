import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const navigate = useNavigate()
  const { _, loading } = useAuth()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmIzYTExYTA4ZTU1NWNhZThlYzVlNTkwNDZkMDc4MCIsIm5iZiI6MTc1NTUyMjA2NC4zMzMsInN1YiI6IjY4YTMyNDEwZjRiNjczYjUzZTBjMDcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SySfDG3LhLrT1Sx_sXoEl6lGH6Vbbm2qv8D3pwTs2uo'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setHeroMovie(data.results[randomIndex]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="login-spinner">
    <img src={netflix_spinner} alt="" />
  </div>
  return (
    <div className="home">
      <Navbar />

      {heroMovie && (
        <div className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="banner-img"
          />

          <div className="hero-caption">
            <h1 className="caption-title">{heroMovie.title}</h1>

            <p>{heroMovie.overview}</p>

            <div className="hero-btns">
              <Link to={`/player/${heroMovie.id}`}> <button className="btn">
                <img src={play_icon} alt="" /> Play
              </button></Link>
              <button className="btn dark-btn" onClick={() => navigate(`/movie/${heroMovie.id}`)}>
                <img src={info_icon} alt="" /> More Info
              </button>
            </div>

            <TitleCards />
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards title={'Blockbuster Movies'} category={'top_rated'} />
        <TitleCards title={'Only on Netflix'} category={'popular'} />
        <TitleCards title={'Upcoming'} category={'upcoming'} />
        <TitleCards title={'Top Picks for You'} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
