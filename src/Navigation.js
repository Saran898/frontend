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
    <div className="main-container">
        <nav className="left-side-nav">
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
              <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                Role
              </NavLink>
            </li>
           <li>
              <NavLink to="/" activeClassName="active">
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
