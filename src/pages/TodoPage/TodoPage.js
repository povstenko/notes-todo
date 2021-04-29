import React from 'react';
import './TodoPage.css';
// var todoItems = [];

// todoItems.push({ index: 1, value: "learn react", done: false });
// todoItems.push({ index: 2, value: "Go shopping", done: true });
// todoItems.push({ index: 3, value: "buy flowers", done: true });

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
    var todoClass = this.props.item.done ? "grey lighten-1" : "";
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
                <label htmlFor="inp">Add item to do</label>
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
    this.setFilterAll = this.setFilterAll.bind(this);
    this.setFilterNew = this.setFilterNew.bind(this);
    this.setFilterCompleted = this.setFilterCompleted.bind(this);
    this.filterTodos = this.filterTodos.bind(this);


    this.state = { todoItems: [], displayed: [], filter: "all" };
  }

  componentDidMount() {
    let localTodos = JSON.parse(localStorage.getItem('todoItems'))
    if (localTodos) {
      this.setState({ todoItems: localTodos, displayed: localTodos })
    }
  }
  componentDidUpdate() {
    let todosStr = JSON.stringify(this.state.todoItems)
    localStorage.setItem('todoItems', todosStr)
  }

  addItem(todoItem) {
    let todoItems = this.state.todoItems;
    todoItems.unshift({
      index: todoItems.length + 1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({ todoItems: todoItems });
  }
  removeItem(itemIndex) {
    let todoItems = this.state.todoItems;
    todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: todoItems });
  }
  markTodoDone(itemIndex) {
    let todoItems = this.state.todoItems;
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems });
  }
  filterTodos(filter) {
    if(filter === "all"){
      this.setState({ displayed: this.state.todoItems, filter: "all"})
    } else if(filter === "new"){
      let filteredItems = this.state.todoItems.filter(todo => todo.done === false)
      this.setState({ displayed: filteredItems, filter: "new"})
    } else if(filter === "completed") {
      let filteredItems = this.state.todoItems.filter(todo => todo.done === true)
      this.setState({ displayed: filteredItems, filter: "completed"})
    }
  }
  setFilterAll() {
    this.filterTodos("all");
  }
  setFilterNew() {
    this.filterTodos("new");
  }
  setFilterCompleted() {
    this.filterTodos("completed");
  }

  render() {
    let activeAll = this.state.filter === "all" ? "blue-grey" : "grey darken-2";
    let activeNew = this.state.filter === "new" ? "blue-grey" : "grey darken-2";
    let activeCompleted = this.state.filter === "completed" ? "blue-grey" : "grey darken-2";

    return (
      <div id="main">
        <TodoForm addItem={this.addItem} />
        <button className={"waves-effect waves-light btn " + activeAll} onClick={this.setFilterAll}>All</button>
        <button className={"waves-effect waves-light btn " + activeNew} onClick={this.setFilterNew}>New</button>
        <button className={"waves-effect waves-light btn " + activeCompleted} onClick={this.setFilterCompleted}>Completed</button>
        <TodoList items={this.state.displayed} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
      </div>
    );
  }
}

const TodoPage = () => (
  <div className="TodoPage">
    <div className="container">
      <TodoApp />
    </div>
  </div>
);

TodoPage.propTypes = {};

TodoPage.defaultProps = {};

export default TodoPage;
