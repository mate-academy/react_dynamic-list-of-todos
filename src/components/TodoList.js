import React from 'react';
import {getData, todosUrl, usersUrl} from "./utils";
import TodoItem from './TodoItem';
import './TodoList.css';

class TodoList extends React.Component {
  state = {
    todos: [],
    requested: false,
    loaded: false,
  };

  loadData() {
    this.setState({
      requested: true,
    });

    Promise.all([getData(todosUrl), getData(usersUrl)])
      .then(([ todos, users ]) => {
        this.setState({
          todos: todos.map(todo => ({
            ...todo,
            user: users.find(user => user.id === todo.userId)
          })),
          loaded: true,
          requested: false,
        })
    })
  }

  sortTodos(title) {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => {
        switch (title) {
          case 'user':
            return a[title].name.localeCompare(b[title].name);
          case 'completed':
            return a[title] - b[title];
          default:
            return a[title].localeCompare(b[title]);
        }
      }),
    }))
  }

  render() {
    if (this.state.requested) {
      return (
        <h2>Loading...</h2>
      );
    }

    if (!this.state.loaded) {
      return (
        <button className={"btn btn-outline-dark btn-lg"} onClick={() => this.loadData()}>Load data</button>
      );
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th className="title title-title" onClick={() => this.sortTodos('title')}>Task</th>
            <th className="title title-user" onClick={() => this.sortTodos('user')}>User</th>
            <th className="title title-completed" onClick={() => this.sortTodos('completed')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.todos.map(todo => <TodoItem {...todo} />)}
        </tbody>
      </table>
    )
  }
}
export default TodoList;
