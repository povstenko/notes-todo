import React from 'react';
import './NoteEditor.css';
import ReactChipInput from "react-chip-input";

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
    super(props);
    this.state = { title: '', text: '', color: '#fbd249', checked: false, tags: [] }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.hadleColorChange = this.hadleColorChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.addChip = this.addChip.bind(this)
    this.removeChip = this.removeChip.bind(this)
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
  handleTagChange(e) {
    this.setState({ tags: e.target.value })
  }
  addChip(value) {
    const chips = this.state.tags.slice();
    chips.push(value);
    this.setState({ tags: chips  });
  };
  removeChip(index) {
    const chips = this.state.tags.slice();
    chips.splice(index, 1);
    this.setState({ tags: chips });
  };

  handleOnClick() {
    let newNote = {
      id: Date.now(),
      title: this.state.title,
      text: this.state.text,
      color: this.state.color,
      tags: this.state.tags
    }
    this.props.onNoteAdd(newNote)
  }

  render() {
    return <div className="note-editor">
      <div className="card-panel">
        <div className="row" style={{ marginBottom: 0 }}>
          <div className="input-field col s11">
            <i className="material-icons prefix">mode_edit</i>
            <input type="text" onChange={this.handleTitleChange} id="icon_prefix1"></input>
            <label htmlFor="icon_prefix1">Title</label>
          </div>
          <div className="input-field col s11">
            <i className="material-icons prefix">subject</i>
            <textarea onChange={this.handleTextChange} id="icon_prefix2" className="materialize-textarea"></textarea>
            <label htmlFor="icon_prefix2">Text</label>
          </div>
          <div className="input-field col s11">
            <ReactChipInput
              classes="class1 class2"
              chips={this.state.tags}
              onSubmit={value => this.addChip(value)}
              onRemove={index => this.removeChip(index)}
            />
          </div>
          <div className="input-field col s11">
            <NoteColors onColorChanged={this.hadleColorChange} />
          </div>

          <div className="input-field col s1">
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
