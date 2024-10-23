import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCloud, faInfo } from '@fortawesome/free-solid-svg-icons';
import "../styles/sidebar.css";

const Navbar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarContainerTitle">
                <h1 className="sidebarTitle">A.LUXEY</h1>
            </div>
            <ul className="sidebarMenu">
                <li className="homeIcon">
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} />
                        Home
                    </Link>
                </li>
                <li className="weatherIcon">
                    <Link to="/weather">
                        <FontAwesomeIcon icon={faCloud} />
                        Weather Full
                    </Link>
                </li>
                <li className="twitchIcon">
                    {/* Make sure this links to the page with the TwitchLogin button */}
                    <Link to="/twitch-login">
                        <FontAwesomeIcon icon={faInfo} />
                        Twitch
                    </Link>
                </li>
                <li className="twitchIcon">
                    {/* Make sure this links to the page with the TwitchLogin button */}
                    <Link to="/twitter">
                        <FontAwesomeIcon icon={faInfo} />
                        Twitter
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
