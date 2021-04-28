import React from 'react';
import './TodoPage.css';
var todoItems = [];
todoItems.push({ index: 1, value: "learn react", done: false });
todoItems.push({ index: 2, value: "Go shopping", done: true });
todoItems.push({ index: 3, value: "buy flowers", done: true });

class TodoList extends React.Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render() {
    var todoClass = this.props.item.done ?
      "grey lighten-1" : "";
    var doneBtnClass = this.props.item.done ? "grey darken-3" : "green";
    return (
      <div className={"card " + todoClass}>
        <div className="card-content">
          <div className="row" style={{ margin: 0 }}>
            <div className="col">
              <span className="card-title">{this.props.item.value}</span>
            </div>
            <div className="col right">
              <button type="button" className={"waves-effect waves-light btn " + doneBtnClass} aria-hidden="true" onClick={this.onClickDone}>{this.props.item.done ? "Undone" : "Done"}</button>
              <button type="button" className="waves-effect waves-light red btn" onClick={this.onClickClose}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      this.refs.form.reset();
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <form ref="form" onSubmit={this.onSubmit} className="form-inline">
            <div className="row" style={{ margin: 0 }}>
              <div className="col"></div>
                <div className="input-field col s11">
                  <input type="text" id="inp" className="materialize-textarea" ref="itemName"></input>
                  <label htmlFor="inp">First Name</label>
                </div>
                <button type="submit" className="btn-floating btn-large"><i className="material-icons">add</i></button>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = { todoItems: todoItems };
  }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length + 1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({ todoItems: todoItems });
  }
  removeItem(itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: todoItems });
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems });
  }
  render() {
    return (
      <div id="main">
        <TodoForm addItem={this.addItem} />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
      </div>
    );
  }
}

const TodoPage = () => (
  <div className="TodoPage">
    <div className="container">
      <TodoApp initItems={todoItems} />
    </div>
  </div>
);

TodoPage.propTypes = {};

TodoPage.defaultProps = {};

export default TodoPage;
