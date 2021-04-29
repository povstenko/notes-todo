import React from 'react';
import './Note.css';

const Note = (props) => (
  <div className="note" >
    <div className="card note-card" style={{ backgroundColor: props.color }}>
      <div className="delete-note">
        <div className="delete-btn-container">
          <span className="delte-note" onClick={() => { props.onDelete(props.id) }}>&times;</span>
        </div>
      </div>
      <div className="card-content">
        <span className="card-title">{props.title}</span>
        <p>{props.text}</p>

        {props.tags.map((tag) => {
          return <div key={tag.id} className="chip" style={{ marginTop: 30 }} onClick={() => { props.onTag(tag.id) }}>
            {tag.text}
          </div>
        })}

      </div>
    </div>
  </div>
);

Note.propTypes = {};

Note.defaultProps = {};

export default Note;
