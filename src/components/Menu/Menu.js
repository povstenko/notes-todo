import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = () => (
  <div className="menu">
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">Logo</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/todo">Todo</Link></li>
        </ul>
      </div>
    </nav>
  </div>
);

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
