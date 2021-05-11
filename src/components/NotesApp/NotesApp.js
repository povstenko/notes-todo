import React from 'react';
import './NotesApp.css';
import NotesGrid from '../../components/NotesGrid/NotesGrid'
import NoteEditor from '../../components/NoteEditor/NoteEditor';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const initialState = {
  notes: ((JSON.parse(localStorage.getItem('notes'))) ? JSON.parse(localStorage.getItem('notes')) : []),
  displayedNotes: ((JSON.parse(localStorage.getItem('notes'))) ? JSON.parse(localStorage.getItem('notes')) : []),
  isTagFilter: false
};
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "LOAD_NOTES":
      return {
        ...state
      }
    case "UPDATE_NOTES":
      // let notesStr = JSON.stringify(state.notes)
      // localStorage.setItem('notes', notesStr)
      return {
        ...state
      }
    case "ADD_NOTE":
      let updatedAdd = state.notes.slice()
      updatedAdd.unshift(action.payload)

      let notesStrAdd = JSON.stringify(updatedAdd)
      localStorage.setItem('notes', notesStrAdd)
      return {
        ...state,
        notes: updatedAdd,
        displayedNotes: updatedAdd
      }
    case "DELETE_NOTE":
      console.log(action.payload)
      let updatedDel = state.notes.filter((note) => {
        return note.id !== action.payload
      })

      let notesStrDel = JSON.stringify(updatedDel)
      localStorage.setItem('notes', notesStrDel)
      return {
        ...state,
        notes: updatedDel,
        displayedNotes: updatedDel
      }
    case "FILTER_NOTES":
      return {
        ...state
      }
    case "FILTER_NOTES_TAG":
      return { 
        ...state
      }
    default:
      return state;
  }
};
let store = createStore(reducer);

const addNote = (note) => {
  return {
    type: 'ADD_NOTE',
    payload: note
  };
};
const deleteNote = (noteId) => {
  return {
    type: 'DELETE_NOTE',
    payload: noteId
  };
};

function mapStateToProps(state) {
  return {
    notes: state.notes,
    displayedNotes: state.displayedNotes,
    isTagFilter: state.isTagFilter
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onNoteAdd: newNote =>  dispatch(addNote(newNote)),
    onNoteDelete: noteId => dispatch(deleteNote(noteId)),
    onTag: () => { dispatch({ type: 'FILTER_NOTES_TAG' }) }
  }
}

export const Component = ({ displayedNotes, onNoteAdd, onNoteDelete, onTag }) => (
  <div>
    {/* <div className="input-field">
        <i className="material-icons prefix">search</i>
        <input id="icon_prefix" type="text" className="" onChange={this.filterItems} style={{ width: 300 }} />
        <label htmlFor="icon_prefix">Search</label>
      </div> */}
    < NoteEditor onNoteAdd={onNoteAdd} />

    <NotesGrid notes={displayedNotes} onNoteDelete={onNoteDelete} onNoteTag={onTag} />

  </div>
)
export const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

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
    // store.dispatch({ type: 'UPDATE_NOTES' })
  }

  handleNoteAdd(newNote) {
    // let updated = this.state.notes.slice()
    // updated.unshift(newNote)

    // this.setState({ notes: updated, displayedNotes: updated })
  }

  handleDeleteNote(noteId) {
    let updated = this.state.notes.filter((note) => {
      return note.id !== noteId
    })
    this.setState({ notes: updated, displayedNotes: updated })
  }

  handleTagClick(tag) {
    if (this.state.isTagFilter == false) {
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
      <Provider store={store}>
        <Container />
      </Provider>
    </div>
  }
}

NotesApp.propTypes = {};

NotesApp.defaultProps = {};

export default NotesApp;
