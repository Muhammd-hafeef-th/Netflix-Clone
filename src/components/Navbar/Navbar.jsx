import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search_icon.svg';
import bellIcon from '../../assets/bell_icon.svg';
import profileIcon from '../../assets/profile_img.png';
import caretIcon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const {user,loading}=useAuth()
    const navigate=useNavigate()
    const navref = useRef();
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 30) {
                navref.current.classList.add('nav-dark')
            } else {
                navref.current.classList.remove('nav-dark')
            }
        })
    }, [])
    return (
        <div ref={navref} className='navbar'>
            <div className="navbar-left">
                <img src={logo} alt="" />
                <ul>
                    <li><Link className='ul-link' to='/' >
                        Home
                    </Link>

                    </li>
                    <li>
                        TV Shows
                    </li>
                    <li>Movies

                    </li>
                    <li>
                        New & Popular
                    </li>
                    <li><Link className='ul-link' to='/myList' >
                        My List
                    </Link>

                    </li>
                    <li>
                        Browse by Languages
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={searchIcon} alt="" className='icons' />
                 {loading ? (
                    <p>Loading...</p>
                ) : (
                    <p>{user?user.name:'Guest'}</p> 
                )}
                <img src={bellIcon} alt="" className='icons' />
                <div className="navbar-profile">
                    <img src={profileIcon} alt="" className='profile' />
                    <img src={caretIcon} alt="" />
                    <div className="dropdown">
                        {
                            user ? <p onClick={() => { logout() }}>Sign Out</p>:<p onClick={()=>navigate('/login')}>Sign In </p>
                        }
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
