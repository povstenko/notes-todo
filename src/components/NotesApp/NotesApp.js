import React from 'react';
import PropTypes from 'prop-types';
import './NotesApp.css';
import NotesGrid from '../../components/NotesGrid/NotesGrid'
import NoteEditor from '../../components/NoteEditor/NoteEditor';

const NotesApp = () => (
  <div className="notes-app">
    <NoteEditor />
    <NotesGrid />
  </div>
);

NotesApp.propTypes = {};

NotesApp.defaultProps = {};

export default NotesApp;
