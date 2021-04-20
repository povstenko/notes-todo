import React from 'react';
import './NotesGrid.css';
import Note from '../../components/Note/Note'
import Masonry from 'masonry-layout'

class NotesGrid extends React.Component {
  componentDidMount() {
    this.msnry = new Masonry('.notes-grid', {
      itemSelector: '.note',
      columnWidth: 200,
      gutter: 4
    });
  }
  componentDidUpdate(prevProps) {
    if(this.props.notes.length !== prevProps.notes.length)
    {
      this.msnry.reloadItems()
      this.msnry.layout()
    }
  }

  render() {
    return <div className="notes-grid row">
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
