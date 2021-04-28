import React from 'react';
import './NotesApp.css';
import NotesGrid from '../../components/NotesGrid/NotesGrid'
import NoteEditor from '../../components/NoteEditor/NoteEditor';

class NotesApp extends React.Component {
  constructor() {
    super();
    this.state = { notes: [], displayedNotes: [] };
    this.filterItems = this.filterItems.bind(this)
    this.handleNoteAdd = this.handleNoteAdd.bind(this)
    this.handleDeleteNote = this.handleDeleteNote.bind(this)
  }

  componentDidMount() {
    let localNotes = JSON.parse(localStorage.getItem('notes'))
    if (localNotes) {
      this.setState({ notes: localNotes, displayedNotes: localNotes })
    }
  }
  componentDidUpdate() {
    let notesStr = JSON.stringify(this.state.notes)
    localStorage.setItem('notes', notesStr)
  }

  handleNoteAdd(newNote) {
    let updated = this.state.notes.slice()
    updated.unshift(newNote)

    this.setState({ notes: updated, displayedNotes: updated })
  }

  handleDeleteNote(noteId) {
    let updated = this.state.notes.filter((note) => {
      return note.id !== noteId
    })
    this.setState({ notes: updated, displayedNotes: updated })

  }

  filterItems(e) {
    let filteredItems = this.state.notes.filter(function (item) {
      return item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    })
    console.log(filteredItems);
    this.setState({ displayedNotes: filteredItems })
  }

  render() {
    return <div className="notes-app container">
      <div className="card-panel">
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" className="" onChange={this.filterItems} />
          <label htmlFor="icon_prefix">Search</label>
        </div>
      </div>

      <NoteEditor onNoteAdd={this.handleNoteAdd} />

      <NotesGrid notes={this.state.displayedNotes} onNoteDelete={this.handleDeleteNote} />
    </div>
  }

}

NotesApp.propTypes = {};

NotesApp.defaultProps = {};

export default NotesApp;
