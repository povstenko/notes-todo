import React from 'react';
import PropTypes from 'prop-types';
import './NotesPage.css';
import NotesApp from '../../components/NotesApp/NotesApp'

const NotesPage = () => (
  <div className="NotesPage">
    <NotesApp/>
  </div>
);

NotesPage.propTypes = {};

NotesPage.defaultProps = {};

export default NotesPage;
