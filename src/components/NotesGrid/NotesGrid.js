import React from 'react';
import PropTypes from 'prop-types';
import './NotesGrid.css';
import Note from '../../components/Note/Note'

class NotesGrid extends React.Component {

  render() {
    return <div className="notes-grid">
      {
        this.props.notes.map((note) => {
          return <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
            color={note.color} />
        })
      }
    </div>
  }
}

NotesGrid.propTypes = {};

NotesGrid.defaultProps = {};

export default NotesGrid;
