import { Link } from 'react-router-dom';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCloud, faNewspaper, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import "../styles/sidebar.css"

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
                        Weather
                    </Link>
                </li>
                <li className="newsIcon">
                    <Link to="/news">
                        <FontAwesomeIcon icon={faNewspaper} />
                        News
                    </Link>
                </li>
                <li className="financeIcon">
                    <Link to="/finance">
                        <FontAwesomeIcon icon={faMoneyBill} />
                        Finance
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
