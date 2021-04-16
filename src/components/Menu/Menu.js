import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';
import { NavLink } from 'react-router-dom';

const Menu = () => (
  <div className="menu">
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">Logo</a>
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
