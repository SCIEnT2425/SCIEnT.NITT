import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";
import logo from "../assets/logo_s.png";
import search from "../assets/search.svg";
import {ChevronDown} from "lucide-react";

const Navbar = () => { 
    const location = useLocation();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(clicked=>!clicked); 
        console.log(clicked)
    };
    const handleClick2 = () => {
        setClicked(clicked => false);
        
    };

    // Helper function to check if a link is active
    const isActive = (path) => location.pathname === path;

    return (
        <div>
            <nav className="nav py-2 relative">
                <Link to="/"  className="mr-10"
                    onClick={handleClick2}>
                    <img  className="logo" src={logo} alt="Logo" />
                </Link>

                <div className={`links ${!clicked ? 'active1 text-2xl' : ''}`}>
                    <Link
                        to="/"
                        onClick={handleClick}
                        className={`nav-link ${isActive('/') ? 'active font-bold text-2xl' : ''}`}
                    >
                        Home
                    </Link>

                    {/* <Link
                        to="/gallery"
                        onClick={handleClick}
                        className={`nav-link ${isActive('/gallery') ? 'active font-bold text-lg' : ''}`}
                    >
                        Gallery
                    </Link> */}

                    <Link
                        to="/inventory"
                        onClick={handleClick}
                        className={`nav-link ${isActive('/inventory') ? 'active font-bold text-2xl' : ''}`}
                    >
                        Inventory
                    </Link>
                         <Link
                        to="/openhouse"
                        onClick={handleClick}
                        className={`nav-link ${isActive('/openhouse') ? 'active font-bold text-2xl' : ''}`}
                    >
                        OpenHouse
                    </Link>

                    <Link
                        to="/project"
                        onClick={handleClick}
                        className={`nav-link ${isActive('/project') ? 'active font-bold text-2xl' : ''}`}
                    >
                        Projects
                    </Link>

                    {/* <Link
                        to="/roombook"
                        onClick={handleClick}
                        className={`nav-link ${isActive('/roombook') ? 'active font-bold text-lg' : ''}`}
                    >
                        Room Booking
                    </Link> */}

                    <div className="relative inline-block group">
                        <div className="cursor-pointer rounded-md px-4 py-2 flex items-center">
                            <div className="mr-2">Initiatives</div>
                            <ChevronDown />
                        </div>

                        <div className="absolute left-0 hidden w-150 rounded-lg bg-black shadow group-hover:block text-center border">
                            <div className="cursor-pointer px-4 py-2 hover:bg-gray-500 whitespace-nowrap">
                                <Link to="/inventive"
                                      onClick={handleClick}
                                      className={`nav-link ${isActive('/inventive') ? 'active font-bold text-2xl' : ''} `}
                                >
                                    Inventive '25
                                </Link>
                            </div>
                            <div className="cursor-pointer px-4 py-2 hover:bg-gray-500 whitespace-nowrap">
                                <Link to="/contrive"
                                      onClick={handleClick}
                                      className={`nav-link ${isActive('/contrive') ? 'active font-bold text-2xl' : ''} `}
                                >
                                    Contrive '25
                                </Link>
                            </div>
                        </div>
                    </div>
                   
                    <Link
                        to="/faculty-connect-dummy-url"
                        onClick={handleClick}
                        className={`nav-link ${isActive('/faculty-connect-dummy-url') ? 'active font-bold text-2xl' : ''} `}
                    >
                        Faculty Connect
                    </Link>
                   
                    <div className="relative inline-block group">
                        <div className="cursor-pointer rounded-md px-4 py-2 flex items-center">
                            <div className="mr-2">About Us</div>
                            <ChevronDown />
                        </div>

                        <div className="absolute left-0 hidden w-100 rounded-lg bg-black shadow group-hover:block">
                            <div className="cursor-pointer px-4 py-2 hover:bg-gray-500">
                                <Link to="/timeline"
                                      onClick={handleClick}
                                      className={`nav-link ${isActive('/timeline') ? 'active font-bold text-2xl' : ''} `}
                                >
                                    Timeline
                                </Link>
                            </div>
                            <div className="cursor-pointer px-4 py-2 hover:bg-gray-500">
                                <Link to="/team"
                                      onClick={handleClick}
                                      className={`nav-link ${isActive('/team') ? 'active font-bold text-2xl' : ''} `}
                                >
                                    Team
                                </Link>
                            </div>
                            <div className="cursor-pointer px-4 py-2 hover:bg-gray-500">
                                <Link to="/gallery"
                                      onClick={handleClick}
                                      className={`nav-link ${isActive('/gallery') ? 'active font-bold text-2xl' : ''} `}
                                >
                                    Gallery
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mobile" onClick={handleClick}>
                     <i id="bar" className={clicked ? 'fas fa-times':'fas fa-bars'}></i>
                </div> 
            </nav>
        </div>
    );
};

export default Navbar;