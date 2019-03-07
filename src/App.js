import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList
  };

  // onclick on todo item class
  handleToggleComplete = id => event => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
    this.setState({ todos: newTodos });
  };

  handleDelete = id => event => {
    const newTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos });
  };

  // copied this form
  handleDeleteCompleted = event => {
    const newTodos = this.state.todos.filter(todo => todo.completed !== true);
    this.setState({ todos: newTodos });
  };

  handleCreate = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTodos = this.state.todos.slice();
      newTodos.push({
        userId: 1,
        id: Math.ceil(Math.random() * 1000000),
        title: this.state.value,
        completed: false
      });
      this.setState({
        value: "",
        todos: newTodos
      });
    }
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <section className="todoapp">

          <header className="header">
            <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.handleChange}
            value={this.state.value}
            onKeyDown={this.handleCreate}
          />
          </header>
          
          <React.Fragment>
            <TodoList
              todos={this.state.todos}
              handleToggleComplete={this.handleToggleComplete}
              handleDelete={this.handleDelete}
            />
            <footer className="footer">
              <span className="todo-count">
                <strong>0</strong> item(s) left
              </span>
              <button 
                className="clear-completed"
                onClick={this.handleDeleteCompleted}
              >
                Clear completed
              </button>
            </footer>
          </React.Fragment>
        </section>
      </div>
    );
  }
  Î;
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onClick={this.props.handleToggleComplete}
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleDelete} />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem 
            key={todo.id}
            title={todo.title} 
            completed={todo.completed} 
            handleToggleComplete={this.props.handleToggleComplete(todo.id)}
            handleDelete={this.props.handleDelete(todo.id)}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
