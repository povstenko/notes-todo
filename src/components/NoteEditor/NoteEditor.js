import React from 'react';
import './NoteEditor.css';

class NoteEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {text: ''}
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }

  handleOnClick() {
    let newNote = {
      id: Date.now(),
      title: 'NoteTitle',
      text: this.state.text,
      color: '#feff9c'
    }
    this.props.onNoteAdd(newNote)
  }

  render() {
    return <div className="note-editor">
      <div className="row">
        <div className="input-field col s10">
          <i className="material-icons prefix">mode_edit</i>
          <textarea onChange={this.handleTextChange} id="icon_prefix2" className="materialize-textarea"></textarea>
          <label htmlFor="icon_prefix2">Add note</label>
        </div>

        <div className="input-field col s2">
          <a onClick={this.handleOnClick} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a>
        </div>
      </div>
    </div>
  }

}

NoteEditor.propTypes = {};

NoteEditor.defaultProps = {};

export default NoteEditor;
