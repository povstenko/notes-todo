import React from 'react';
import './NoteEditor.css';

class NoteEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = { title: '', text: '' }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  handleOnClick() {
    let newNote = {
      id: Date.now(),
      title: this.state.title,
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
          <input type="text" onChange={this.handleTitleChange} id="icon_prefix1"></input>
          <label htmlFor="icon_prefix1">Title</label>
        </div>
        <div className="input-field col s10">
          <i className="material-icons prefix">subject</i>
          <textarea onChange={this.handleTextChange} id="icon_prefix2" className="materialize-textarea"></textarea>
          <label htmlFor="icon_prefix2">Text</label>
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
