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
      let filteredItems = state.notes.filter(function (item) {
        let concat = item.title + " " + item.text
        return concat.toLowerCase().search(action.payload.target.value.toLowerCase()) !== -1;
      })
      return {
        ...state,
        displayedNotes: filteredItems
      }
    case "FILTER_NOTES_TAG":
      if (state.isTagFilter == false) {
        console.log(action.payload)
        let filteredItemsTag = state.notes.filter(function (item) {
          return item.tags.some(e => e.text == action.payload)
        })
        return { 
          ...state,
          displayedNotes: filteredItemsTag,
          isTagFilter: true
        }
      } else {
        return { 
          ...state,
          displayedNotes: state.notes,
          isTagFilter: false
        }
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
const filterNotes = (e) => {
  return {
    type: 'FILTER_NOTES',
    payload: e
  };
};
const filterNotesTag = (tag) => {
  return {
    type: 'FILTER_NOTES_TAG',
    payload: tag
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
    onSearch: e => dispatch(filterNotes(e)),
    onTag: tag => dispatch(filterNotesTag(tag))
  }
}

export const Component = ({ displayedNotes, onNoteAdd, onNoteDelete, onSearch, onTag }) => (
  <div>
    <div className="input-field">
        <i className="material-icons prefix">search</i>
        <input id="icon_prefix" type="text" className="" onChange={(e) => onSearch(e)} style={{ width: 300 }} />
        <label htmlFor="icon_prefix">Search</label>
      </div>
    < NoteEditor onNoteAdd={onNoteAdd} />

    <NotesGrid notes={displayedNotes} onNoteDelete={onNoteDelete} onNoteTag={onTag} />

  </div>
)
export const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

class NotesApp extends React.Component {
  constructor() {
    super();
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
