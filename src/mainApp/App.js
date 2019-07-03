import React from "react";

import ToDoList from "../toDo/ToDoList";
import {
  SORT_ORDER_TITLE,
  SORT_ORDER_COMPLETED,
  SORT_ORDER_USER
} from "../helper/Helper";
import "../mainApp/App.css";
import MDSpinner from "react-md-spinner";

class App extends React.Component {
  state = {
    todos: [],
    sortField: "user"
  };

  async componentDidMount() {
    const todo = await this.getToDosFromServer();
    const user = await this.getUsersFromServer();
    this.setState({
      todos: this.findToDosAndUsers(todo, user)
    });
  }

  getToDosFromServer = () => {
    return fetch("https://jsonplaceholder.typicode.com/todos").then(res =>
      res.json()
    );
  };

  getUsersFromServer = () => {
    return fetch("https://jsonplaceholder.typicode.com/users").then(res =>
      res.json()
    );
  };

  findToDosAndUsers = (todos, users) => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId)
    }));
  };

  sortToDos = sortField => {
    const callbackMap = {
      [SORT_ORDER_TITLE]: (a, b) => a.title.localeCompare(b.title),
      [SORT_ORDER_USER]: (a, b) => a.user.name.localeCompare(b.user.name),
      [SORT_ORDER_COMPLETED]: (a, b) => a.completed - b.completed
    };

    const callback = callbackMap[sortField] || callbackMap.title;

    return this.state.todos.sort(callback);
  };

  sortAndSetField = sortField => {
    this.setState({ sortField }, () => {
      this.setState({ todos: this.sortToDos(sortField) });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        {this.state.todos.length > 0 ? (
          <ToDoList
            sortBy={this.sortAndSetField}
            toDoItems={this.state.todos}
          />
        ) : (
          <MDSpinner />
        )}
      </div>
    );
  }
}

export default App;
