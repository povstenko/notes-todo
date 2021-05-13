import React from 'react';
import './NoteEditor.css';

class NoteColors extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let colors = ["#345920", "#42275e", "#5c2b29", "#5b2245", "#614a19", "#2d555e", "#635d19", "#1e3a5f", "3c3f43"];
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
    this.state = { title: '', text: '', color: '#424242', checked: false, tag: '', tags: [], showing: false }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.hadleColorChange = this.hadleColorChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.removeChip = this.removeChip.bind(this)
    this.handleAddTag = this.handleAddTag.bind(this)
    this.handleOpenEditor = this.handleOpenEditor.bind(this)
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
    this.setState({ showing: false })
    let title = document.querySelector('#title_field')
    let text = document.querySelector('#text_field')
    let tag = document.querySelector('#tag_field')
    title.value = ''
    text.value = ''
    tag.value = ''

    this.setState({title: '', text: '', tags: []})

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
    let tag = document.querySelector('#tag_field')
    tag.value=''
    let chips = this.state.tags.slice();
    chips.push({
      id: Date.now(),
      text: this.state.tag
    })

    this.setState({ tags: chips })
    console.log(chips);
  }
  handleOpenEditor() {
    this.setState({ showing: true })
  }

  render() {
    return <div className="note-editor">
      <div className="card-panel grey darken-3" style={{ paddingBottom: 0, paddingTop: 0 }}>
        <div className="row" style={{ marginBottom: 0 }}>

          <div className="input-field col s11" style={{ display: (this.state.showing ? 'block' : 'none') }}>
            <i className="material-icons prefix">text_fields</i>
            <input type="text" onChange={this.handleTitleChange} id="title_field"></input>
            <label htmlFor="title_field">Title</label>
          </div>

          <div className="input-field col s11">
            <i className="material-icons prefix">subject</i>
            <textarea onChange={this.handleTextChange} onClick={this.handleOpenEditor} id="text_field" className="materialize-textarea"></textarea>
            <label htmlFor="text_field">Take a note...</label>
          </div>

          <div className="input-field col s6" style={{ display: (this.state.showing ? 'block' : 'none') }}>
            <i className="material-icons prefix">label</i>
            <input type="text" onChange={this.handleTagChange} id="tag_field"></input>
            <label htmlFor="tag_field">Tags</label>
            <a onClick={this.handleAddTag} className="btn prefix grey darken-4" style={{ padding: 0 }}><i className="material-icons">add</i></a>

            {
              this.state.tags.map((tag) => {
                return <div key={tag.id} className="chip" onClick={() => { this.removeChip(tag.id) }}>
                  {tag.text}
                  <i className="close material-icons">close</i>
                </div>
              })
            }
          </div>
        </div>
        <div className="row" style={{ margin: 0 }} style={{ display: (this.state.showing ? 'block' : 'none') }}>
          <div className="input-field col s10" style={{ paddingLeft: '20px' }}>
            <NoteColors onColorChanged={this.hadleColorChange} id="color_field" />
          </div>

          <div className="col s2 right-align">
            <a onClick={this.handleOnClick} className="btn-floating btn-large waves-effect waves-light grey darken-4" style={{ width: 40, height: 40 }}>
              <i className="material-icons" style={{ lineHeight: 0 }}>add</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  }
}

NoteEditor.propTypes = {};

NoteEditor.defaultProps = {};

export default NoteEditor;
