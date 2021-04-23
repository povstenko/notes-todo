import React from 'react';
import './NotesApp.css';
import NotesGrid from '../../components/NotesGrid/NotesGrid'
import NoteEditor from '../../components/NoteEditor/NoteEditor';

// let data = [
//   {
//     id: 1,
//     title: 'title1',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//     color: '#feff9c'
//   },
//   {
//     id: 2,
//     title: 'title2',
//     text: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     color: '#7afcff'
//   },
//   {
//     id: 12,
//     title: 'title12',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
//     color: '#ff7eb9'
//   },
//   {
//     id: 3,
//     title: 'title3',
//     text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est',
//     color: '#7afcff'
//   },
//   {
//     id: 4,
//     title: 'title4',
//     text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     color: '#feff9c'
//   },
//   {
//     id: 5,
//     title: 'title5',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     color: '#fff740'
//   },
//   {
//     id: 6,
//     title: 'title6',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//     color: '#feff9c'
//   },
//   {
//     id: 7,
//     title: 'title7',
//     text: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     color: '#7afcff'
//   },
//   {
//     id: 8,
//     title: 'title8',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
//     color: '#ff65a3'
//   },
//   {
//     id: 9,
//     title: 'title9',
//     text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est',
//     color: '#7afcff'
//   },
//   {
//     id: 10,
//     title: 'title10',
//     text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     color: '#ff65a3'
//   },
//   {
//     id: 11,
//     title: 'title11',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     color: '#fff740'
//   }
// ]

class NotesApp extends React.Component {
  constructor() {
    super();
    this.state = { notes: [] };
    this.filterItems = this.filterItems.bind(this)
    this.handleNoteAdd = this.handleNoteAdd.bind(this)
    this.handleDeleteNote = this.handleDeleteNote.bind(this)
  }

  componentDidMount() {
    let localNotes = JSON.parse(localStorage.getItem('notes'))
    if (localNotes) {
      this.setState({ notes: localNotes })
    }
  }
  componentDidUpdate() {
    let notesStr = JSON.stringify(this.state.notes)
    localStorage.setItem('notes', notesStr)
  }

  handleNoteAdd(newNote) {
    let updated = this.state.notes.slice()
    updated.unshift(newNote)

    this.setState({ notes: updated })
  }

  handleDeleteNote(noteId) {
    let updated = this.state.notes.filter((note) => {
      return note.id !== noteId
    })
    this.setState({notes: updated})
    
  }

  filterItems(e) {
    let filteredItems = this.state.notes.filter(function (item) {
      return item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    })
    console.log(filteredItems);
    this.setState({ notes: filteredItems })
  }

  render() {
    return <div className="notes-app container">
      <input type="text" className="" placeholder="Search" onChange={this.filterItems} />
      <NoteEditor onNoteAdd={this.handleNoteAdd} />
      <NotesGrid notes={this.state.notes} onNoteDelete={this.handleDeleteNote} />
    </div>
  }

}

NotesApp.propTypes = {};

NotesApp.defaultProps = {};

export default NotesApp;
