import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({ title, category }) => {
    const cardsRef = useRef();
    const [apiData, setApiData] = useState([])

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmIzYTExYTA4ZTU1NWNhZThlYzVlNTkwNDZkMDc4MCIsIm5iZiI6MTc1NTUyMjA2NC4zMzMsInN1YiI6IjY4YTMyNDEwZjRiNjczYjUzZTBjMDcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SySfDG3LhLrT1Sx_sXoEl6lGH6Vbbm2qv8D3pwTs2uo'
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])
    return (
        <div className='title-cards'>
            <h2>{title ? title : 'Popular on Netflix'}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return (
                        <Link to={`/movie/${card.id}`} className="card" key={index}>
                            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                            <p>{card.original_title}</p>
                            <div className="card-hover-info">
                                <div className="rating">
                                    <i className="fas fa-star"></i>
                                    {Math.round(card.vote_average * 10) / 10}
                                </div>
                                <div className="duration">
                                    <i className="far fa-clock"></i>
                                    {Math.floor(Math.random() * 120) + 90} min
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default TitleCards
