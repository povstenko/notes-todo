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
    super(props);
    this.state = { title: '', text: '', color: '#fbd249', checked: false, tag: '', tags: [] }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.hadleColorChange = this.hadleColorChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.removeChip = this.removeChip.bind(this)
    this.handleAddTag = this.handleAddTag.bind(this)
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
    this.setState({ tag: e.target.value })
  }

  removeChip(index) {
    let chips = this.state.tags.filter((tag) => {
      return tag.id !== index
    })
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
  handleAddTag() {
    let chips = this.state.tags.slice();
    chips.push({
      id: Date.now(),
      text: this.state.tag
    })

    this.setState({ tags: chips })
    console.log(chips);
  }

  render() {
    return <div className="note-editor">
      <div className="card-panel">
        <div className="row" style={{ marginBottom: 0 }}>
          <div className="input-field col s11">
            <i className="material-icons prefix">text_fields</i>
            <input type="text" onChange={this.handleTitleChange} id="icon_prefix1" style={{ width: 500 }}></input>
            <label htmlFor="icon_prefix1">Title</label>
          </div>
          <div className="input-field col s11">
            <i className="material-icons prefix">subject</i>
            <textarea onChange={this.handleTextChange} id="icon_prefix2" className="materialize-textarea" style={{ height: 100 }}></textarea>
            <label htmlFor="icon_prefix2">Text</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">label</i>
            <input type="text" onChange={this.handleTagChange} id="icon_prefix3"></input>
            <label htmlFor="icon_prefix3">Tags</label>
            <a onClick={this.handleAddTag} className="btn waves-effect waves-light prefix deep-purple lighten-3"><i className="material-icons">add</i></a>

            {
              this.state.tags.map((tag) => {
                return <div key={tag.id} className="chip" onClick={() => { this.removeChip(tag.id) }}>
                  {tag.text}
                  <i className="close material-icons">close</i>
                </div>
              })
            }
          </div>

          <div className="input-field col s11">
            <NoteColors onColorChanged={this.hadleColorChange} />
          </div>

          <div className="input-field col s1">
            <a onClick={this.handleOnClick} className="btn-floating btn-large waves-effect waves-light deep-purple darken-1"><i className="material-icons">add</i></a>
          </div>
        </div>
      </div>

    </div>
  }

}

NoteEditor.propTypes = {};

NoteEditor.defaultProps = {};

export default NoteEditor;
