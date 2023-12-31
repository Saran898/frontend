import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <div className="sidebar">
        <nav className="left-side-nav">
          <ul>
            <li>
              <NavLink to="/" className="active">
              <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                Role
              </NavLink>
            </li>
           <li>
              <NavLink to="/employee" className="active">
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>
    </div>
  );
};

export default Navigation;
