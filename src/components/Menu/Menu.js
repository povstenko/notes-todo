import React from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';

const Menu = () => (
  <div className="menu">
    <nav>
      <div className="nav-wrapper deep-purple darken-1">
        <span className="brand-logo">Notes Todo App</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/about" activeClassName="activeMenu">About</NavLink></li>
          <li><NavLink to="/notes" activeClassName="activeMenu">Notes</NavLink></li>
          <li><NavLink to="/todo" activeClassName="activeMenu">Todo</NavLink></li>
        </ul>
      </div>
    </nav>
  </div>
);

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
