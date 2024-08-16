import React, { useState } from 'react';
import '../App.css'
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
    const [query, setquery] = useState("")
    const navigate = useNavigate()
    const handleSearch = (event) => { 
        event.preventDefault()
        setquery("")
        navigate(`/search/${query}`)
     }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Left Side - Home and Dashboard */}
                <Link to = './'
                    className='navbar-brand'>
                    My Website
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link to = './'
                    className='nav-link'>
                        Home
                </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#dashboard">Dashboard</a>
                        </li>
                    </ul>
                    
                    {/* Right Side - Search Bar, Login, Signup, Contact */}
                    <form className="d-flex ms-auto me-3" onSubmit={handleSearch}>
                        <div className='d-flex search-box rounded px-2'>
                            <button className="btn" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            <input className=" search-bar px-2" 
                                type="search" placeholder="Search" 
                                aria-label="Search" 
                                value={query}
                                onChange={(e)=>setquery(e.target.value)}
                                />
                            
                        </div>
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link to ='/login' className="nav-link">
                                Login 
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to ='/signup' className="nav-link">
                                Signup 
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
