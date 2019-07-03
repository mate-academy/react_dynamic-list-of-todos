import React from "react";

import ToDoList from "../toDo/ToDoList";
import {
  SORT_ORDER_TITLE,
  SORT_ORDER_COMPLETED,
  SORT_ORDER_USER,
  SORT_ORDER_TITLE_BACK,
  SORT_ORDER_COMPLETED_BACK,
  SORT_ORDER_USER_BACK,
  getUsersFromServer,
  getToDosFromServer
} from "../helper/Helper";
import "../mainApp/App.css";
import MDSpinner from "react-md-spinner";

class App extends React.Component {
  state = {
    todos: [],
    sortField: "user"
  };

  async componentDidMount() {
    const todo = await getToDosFromServer();
    const user = await getUsersFromServer();
    this.setState({
      todos: this.findToDosAndUsers(todo, user)
    });
  }

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
      [SORT_ORDER_COMPLETED]: (a, b) => a.completed - b.completed,
      [SORT_ORDER_TITLE_BACK]: (a, b) => b.title.localeCompare(a.title),
      [SORT_ORDER_USER_BACK]: (a, b) => b.user.name.localeCompare(a.user.name),
      [SORT_ORDER_COMPLETED_BACK]: (a, b) => b.completed - a.completed
    };

    const callback = callbackMap[sortField] || callbackMap.SORT_ORDER_TITLE;

    return this.state.todos.sort(callback);
  };

  sortAndSetField = sortField => {
    this.setState({ sortField, todos: this.sortToDos(sortField) });
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        {this.state.todos.length > 0 ? (
          <ToDoList
            sortBy={this.sortAndSetField}
            sorted={this.state.sortField}
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
