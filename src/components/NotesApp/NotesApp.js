import React from 'react';
import PropTypes from 'prop-types';
import './NotesApp.css';
import NotesGrid from '../../components/NotesGrid/NotesGrid'
import NoteEditor from '../../components/NoteEditor/NoteEditor';

let data = [
  {
    id: 1,
    title: 'title1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    color: '#feff9c'
  },
  {
    id: 2,
    title: 'title2',
    text: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    color: '#7afcff'
  },
  {
    id: 2,
    title: 'title2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    color: '#ff7eb9'
  },
  {
    id: 3,
    title: 'title2',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est',
    color: '#7afcff'
  },
  {
    id: 4,
    title: 'title2',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    color: '#feff9c'
  },
  {
    id: 5,
    title: 'title2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    color: '#fff740'
  },
]

const NotesApp = () => (
  <div className="notes-app">
    <NoteEditor />
    <NotesGrid />
  </div>
);

NotesApp.propTypes = {};

NotesApp.defaultProps = {};

export default NotesApp;
