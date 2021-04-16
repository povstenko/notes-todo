import React from 'react';
import './Note.css';

const Note = (props) => (
  <div className="note" >
    <div className="card note-card" style={{ backgroundColor: props.color }}>
      <div className="card-content">
        <span className="card-title">{props.title}</span>
        <p>{props.text}</p>
      </div>
    </div>
  </div>
);

Note.propTypes = {};

Note.defaultProps = {};

export default Note;
