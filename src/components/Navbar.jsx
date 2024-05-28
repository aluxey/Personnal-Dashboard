import { Link } from 'react-router-dom';
import React from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCloud, faNewspaper, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => { 

    return ( 
        <div className=" w-64 bg-gray-800 text-white flex flex-col">
          <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className='text-3xl font-bold primary-color ml-4'>A.LUXEY</h1>
          </div>
          <ul className="flex flex-col py-4">
              <li className='p-5'>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </Link>
              </li>
              <li className='p-5'>
                <Link to="/weather">
                  <FontAwesomeIcon icon={faCloud} />
                  Weather
                </Link>
              </li>
              <li className='p-5'>
                <Link to="/news">
                  <FontAwesomeIcon icon={faNewspaper} />
                  News
                </Link>
              </li>
              <li className='p-5'>
                <Link to="/finance">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  Finance
                </Link>
              </li>
          </ul>
        </div>
    )
}   

export default Navbar