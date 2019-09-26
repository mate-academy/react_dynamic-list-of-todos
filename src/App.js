import React from "react";
import "./App.css";

import { TodoList } from "./components/TodoList/TodoList";

import { getTodos } from "./api/todos";
import { getUsers } from "./api/users";

function getTodosWithUsers(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => item.id === todo.userId)
  }));
}

class App extends React.Component {
  state = {
    originTodos: [],
    todos: [],
    isLoading: false,
    isLoaded: false,
    hasError: false
  };

  sortByName = () => {
    this.setState(prevState => ({
      todos: prevState.originTodos.sort((a, b) =>
        a.user.name.localeCompare(b.user.name)
      )
    }));
  };

  sortByTitle = () => {
    this.setState(prevState => ({
      todos: prevState.originTodos.sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    }));
  };

  sortByCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.originTodos.sort((a, b) =>
        a.completed < b.completed
          ? 1
          : a.completed === b.completed
          ? a.user.name.localeCompare(b.user.name)
          : -1
      )
    }));
  };

  getData = () => {
    this.setState({
      todos: [],
      isLoading: true,
      hasError: false
    });

    Promise.all([getTodos(), getUsers()])
      .then(data => {
        console.log(data);
        this.setState({
          todos: getTodosWithUsers(data[0], data[1]),
          originTodos: getTodosWithUsers(data[0], data[1]),
          isLoaded: true
        });
      })
      .catch(() => {
        this.setState({
          hasError: true
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    const { todos, isLoading, hasError, isLoaded } = this.state;
    return (
      <div className="main">
        <h1>Static list of todos</h1>
        {!todos.length && !isLoading && !hasError && (
          <button
            type="button"
            onClick={this.getData}
            className="btn btn-outline-dark"
          >
            Load todos
          </button>
        )}
        {isLoading && (
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {hasError && (
          <>
            <h3>Something went wrong:(</h3>
            <button
              type="button"
              onClick={this.getData}
              className="btn btn-outline-dark"
            >
              Try again
            </button>
          </>
        )}
        {isLoaded && (
          <TodoList
            todos={todos}
            sortByName={this.sortByName}
            sortByTitle={this.sortByTitle}
            sortByCompleted={this.sortByCompleted}
          />
        )}
      </div>
    );
  }
}

export default App;
