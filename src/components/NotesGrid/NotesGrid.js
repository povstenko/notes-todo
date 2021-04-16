import React from 'react';
import './NotesGrid.css';
import Note from '../../components/Note/Note'
import Masonry from 'masonry-layout'

class NotesGrid extends React.Component {
  componentDidMount() {
    var msnry = new Masonry('.notes-grid', {
      itemSelector: '.note',
      columnWidth: 400,
      gutter: 10
    });
  }

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
