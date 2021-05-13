import React from 'react';
import './TodoPage.css';

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
    var todoClass = this.props.item.done ? "todo-completed" : "grey darken-3";
    var textClass = this.props.item.done ? "line" : "";
    return (
      <div className={"card hoverable " + todoClass} onClick={this.onClickDone}>
        <div className="card-content">
          <div className="row" style={{ margin: 0 }}>
            <div className="col s10">
              <span className={"card-title " + textClass}>{this.props.item.value}</span>
            </div>
            <div className="col right">
              <button type="button" className="waves-effect waves-light red btn trash-btn  " onClick={this.onClickClose}><i className="material-icons">close</i></button>
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
      <div className="card-panel grey darken-3" style={{ paddingBottom: 0, paddingTop: 0 }}>
        <div className="row" style={{ marginBottom: 0 }}>
          <form ref="form" onSubmit={this.onSubmit} className="form-inline" style={{ margin: 10 }}>
            <div className="row" style={{ margin: 0 }}>
              <div className="input-field col s11">
                <i className="material-icons prefix">list</i>
                <input type="text" id="inp" className="materialize-textarea" ref="itemName"></input>
                <label htmlFor="inp">To do...</label>
              </div>
              <div className="col s1">
                <button type="submit" className="btn-floating btn-large waves-effect waves-light grey darken-4" style={{ width: 40, height: 40, marginTop:20 }}>
                  <i className="material-icons" style={{ lineHeight: 0 }}>add</i>
                </button>
              </div>
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
    if (filter === "all") {
      this.setState({ displayed: this.state.todoItems, filter: "all" })
    } else if (filter === "new") {
      let filteredItems = this.state.todoItems.filter(todo => todo.done === false)
      this.setState({ displayed: filteredItems, filter: "new" })
    } else if (filter === "completed") {
      let filteredItems = this.state.todoItems.filter(todo => todo.done === true)
      this.setState({ displayed: filteredItems, filter: "completed" })
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
    let activeAll = this.state.filter === "all" ? "grey darken-3" : "grey darken-4";
    let activeNew = this.state.filter === "new" ? "grey darken-3" : "grey darken-4";
    let activeCompleted = this.state.filter === "completed" ? "grey darken-3" : "grey darken-4";

    return (
      <div id="main">
        <div className="row">
          <div className="col s2" style={{ padding: 10 }}>
            <div>
              <button className={"waves-effect waves-light btn " + activeAll} onClick={this.setFilterAll} style={{ width: '100%' }}>All</button>
            </div>
            <div>
              <button className={"waves-effect waves-light btn " + activeNew} onClick={this.setFilterNew} style={{ width: '100%' }}>new</button>
            </div>
            <div>
              <button className={"waves-effect waves-light btn " + activeCompleted} onClick={this.setFilterCompleted} style={{ width: '100%' }}>Completed</button>
            </div>
          </div>
          <div className="col s10">
            <div className="row">
              <div className="col offset-s3 w-50" style={{ width: '700px' }}>
                <TodoForm addItem={this.addItem} />
              </div>
            </div>
            <div className="row">
              <div className="container">
                <TodoList items={this.state.displayed} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const TodoPage = () => (
  <div className="TodoPage">
    <div className="">
      <TodoApp />
    </div>
  </div>
);

TodoPage.propTypes = {};

TodoPage.defaultProps = {};

export default TodoPage;
