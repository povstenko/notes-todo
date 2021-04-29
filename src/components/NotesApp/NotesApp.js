import React from 'react';
import './NotesApp.css';
import NotesGrid from '../../components/NotesGrid/NotesGrid'
import NoteEditor from '../../components/NoteEditor/NoteEditor';

class NotesApp extends React.Component {
  constructor() {
    super();
    this.state = { notes: [], displayedNotes: [], isTagFilter: false };
    this.filterItems = this.filterItems.bind(this)
    this.handleNoteAdd = this.handleNoteAdd.bind(this)
    this.handleDeleteNote = this.handleDeleteNote.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
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

  handleTagClick(tag) {
    if(this.state.isTagFilter == false) {
      console.log(tag)
      let filteredItems = this.state.notes.filter(function (item) {
        return item.tags.some(e => e.text == tag)
      })
      this.setState({ displayedNotes: filteredItems, isTagFilter: true })
    } else {
      this.setState({ displayedNotes: this.state.notes, isTagFilter: false })
    }
  }

  filterItems(e) {
    let filteredItems = this.state.notes.filter(function (item) {
      let concat = item.title + " " + item.text
      return concat.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    })
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

      <NotesGrid notes={this.state.displayedNotes} onNoteDelete={this.handleDeleteNote} onNoteTag={this.handleTagClick}/>
    </div>
  }
}

NotesApp.propTypes = {};

NotesApp.defaultProps = {};

export default NotesApp;
