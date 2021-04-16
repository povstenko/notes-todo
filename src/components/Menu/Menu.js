import React from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';

const Menu = () => (
  <div className="menu">
    <nav>
      <div className="nav-wrapper">
        <span className="brand-logo">Logo</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
          <li><NavLink to="/notes" activeClassName="active">Notes</NavLink></li>
          <li><NavLink to="/todo" activeClassName="active">Todo</NavLink></li>
        </ul>
      </div>
    </nav>
  </div>
);

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
