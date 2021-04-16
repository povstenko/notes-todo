import React from 'react';
import PropTypes from 'prop-types';
import './Note.css';

const Note = (props) => (
  <div className="note" >
    <div class="card" style={{ backgroundColor: props.color }}>
      <div class="card-content">
        <span class="card-title">{props.title}</span>
        <p>{props.text}</p>
      </div>
    </div>
  </div>
);

Note.propTypes = {};

Note.defaultProps = {};

export default Note;
