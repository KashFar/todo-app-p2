import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom"
import TodoList from "./TodoList"

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
      <Router>
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
          
          <Route
            exact
            path="/"
            render={() => (
            <TodoList
              todos={this.state.todos}
              handleToggleComplete={this.handleToggleComplete}
              handleDelete={this.handleDelete}
            />
            )}
          />
          <Route
            exact
            path="/active"
            render={() => (
              <TodoList
              todos={this.state.todos.filter(todo => !todo.completed)}
              handleToggleComplete={this.handleToggleComplete}
              handleDelete={this.handleDelete}
            />
            )}
            />
            <Route
            exact
            path="/completed"
            render={() => (
              <TodoList
              todos={this.state.todos.filter(todo => todo.completed)}
              handleToggleComplete={this.handleToggleComplete}
              handleDelete={this.handleDelete}
            />
            )}
            />

            <footer className="footer">
              <span className="todo-count">
                <strong>
                  {this.state.todos.filter(todo => !todo.complete).length}
                  </strong> 
                  {" item(s) left"}
              </span>
              <ul className ="filters">
                <li>
                  <NavLink exact to="/" activeClassName="selected">
                  All
                  </NavLink>
                </li>
                <li>
                <NavLink exact to="/active" activeClassName="selected">
                  Active
                </NavLink>
                </li>
                <li>
                <NavLink exact to="/completed" activeClassName="selected">
                  Completed
                </NavLink>
                </li>
              </ul>
              <button 
                className="clear-completed"
                onClick={this.handleDeleteCompleted}
              >
                Clear completed
              </button>
            </footer>
        </section>
      </div>
      </Router>
    );
  }
}

export default App;
