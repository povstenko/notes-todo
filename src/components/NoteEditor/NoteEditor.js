import React from 'react';
import './NoteEditor.css';

class NoteColors extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let colors = ["#aed143", "#fbd249", "#f49f3f", "#ff7eb9", "#ff65a3", "#7afcff", "#51bcb3"];
    return (
      <div className="colors-list">
        {
          colors.map((el, i) => {
            return (
              <div key={i} style={{ backgroundColor: el }}>
                <input
                  className="radio-custom"
                  id={el}
                  type="radio"
                  name="color"
                  onChange={(e) => this.props.onColorChanged(e, el)}
                />
                <label className="radio-custom-label" htmlFor={el} />
              </div>
            );
          })
        }
      </div>
    );
  }
};

class NoteEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = { title: '', text: '', color: '', checked: false }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.hadleColorChange = this.hadleColorChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value })
  }
  hadleColorChange(e, color) {
    this.setState({
      color: color,
      checked: e.target.checked
    })
  }

  handleOnClick() {
    let newNote = {
      id: Date.now(),
      title: this.state.title,
      text: this.state.text,
      color: this.state.color
    }
    this.props.onNoteAdd(newNote)
  }

  render() {
    return <div className="note-editor">
      <div className="card-panel">
        <div className="row" style={{marginBottom: 0}}>
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
          <div className="input-field col s10">
            <NoteColors onColorChanged={this.hadleColorChange} />
          </div>

          <div className="input-field col s2">
            <a onClick={this.handleOnClick} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a>
          </div>
        </div>
      </div>

    </div>
  }

}

NoteEditor.propTypes = {};

NoteEditor.defaultProps = {};

export default NoteEditor;
