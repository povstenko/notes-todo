import React from 'react';
import './NotesApp.css';
import NotesGrid from '../../components/NotesGrid/NotesGrid'
import NoteEditor from '../../components/NoteEditor/NoteEditor';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const initialState = {
  notes: ((JSON.parse(localStorage.getItem('notes'))) ? JSON.parse(localStorage.getItem('notes')) : []),
  displayedNotes: ((JSON.parse(localStorage.getItem('notes'))) ? JSON.parse(localStorage.getItem('notes')) : []),
  isTagFilter: false,
  filteredTag: '',
  tags: ((JSON.parse(localStorage.getItem('notes'))) ?
    JSON.parse(localStorage.getItem('notes')
    ).filter((el) => el.tags[0] !== undefined
    ).map((note) => note.tags[0].text
    ).filter((value, index, self) => self.indexOf(value) === index) : [])
};
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "ADD_NOTE":
      let updatedAdd = state.notes.slice()
      updatedAdd.unshift(action.payload)

      let tagsNames = ((JSON.parse(localStorage.getItem('notes'))) ?
      JSON.parse(localStorage.getItem('notes')
      ).filter((el) => el.tags[0] !== undefined
      ).map((note) => note.tags[0].text
      ).filter((value, index, self) => self.indexOf(value) === index) : [])

      let notesStrAdd = JSON.stringify(updatedAdd)
      localStorage.setItem('notes', notesStrAdd)
      return {
        ...state,
        tags: tagsNames,
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
          filteredTag: action.payload,
          displayedNotes: filteredItemsTag,
          isTagFilter: true
        }
      } else {
        return {
          ...state,
          filteredTag: '',
          displayedNotes: state.notes,
          isTagFilter: false
        }
      }
    default:
      return state;
  }
};
let store = createStore(reducer);

function mapStateToProps(state) {
  return {
    notes: state.notes,
    tags: state.tags,
    displayedNotes: state.displayedNotes,
    isTagFilter: state.isTagFilter,
    filteredTag: state.filteredTag
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onNoteAdd: newNote => dispatch({
      type: 'ADD_NOTE',
      payload: newNote
    }),
    onNoteDelete: noteId => dispatch({
      type: 'DELETE_NOTE',
      payload: noteId
    }),
    onSearch: e => dispatch({
      type: 'FILTER_NOTES',
      payload: e
    }),
    onTag: tag => dispatch({
      type: 'FILTER_NOTES_TAG',
      payload: tag
    })
  }
}

export const Component = ({ displayedNotes, tags, filteredTag, onNoteAdd, onNoteDelete, onSearch, onTag }) => (
  <div>
    <div className="row">
      <div className="col s2" >
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" className="" onChange={(e) => onSearch(e)} />
          <label htmlFor="icon_prefix">Search</label>
        </div>
        {
        console.log(tags)
        // console.log(filteredTag)
        }

        {tags.map((tag) => (
          <div>
              <button className={"waves-effect waves-light btn " + (filteredTag === tag ? "grey darken-3" : "grey darken-4")} onClick={() => { onTag(tag)}} style={{ width: '100%' }}>{tag}</button>
          </div>
        ))}
      </div>
      <div className="col s10">
        <div className="row">
          <div className="col offset-s3 w-50" style={{ width: '700px' }}>
            <NoteEditor onNoteAdd={onNoteAdd} />
          </div>
        </div>
        <div className="row">
          <NotesGrid notes={displayedNotes} onNoteDelete={onNoteDelete} onNoteTag={onTag} />
        </div>
      </div>
    </div>
  </div>
)
export const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

class NotesApp extends React.Component {
  render() {
    return <div className="notes-app">
      <Provider store={store}>
        <Container />
      </Provider>
    </div>
  }
}

NotesApp.propTypes = {};

NotesApp.defaultProps = {};

export default NotesApp;
