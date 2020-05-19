import React from 'react';

import { getUsersFromServer, getTodosFromServer } from './api';
import { Todos, Users } from './interface';

type State = {
  todos: Todos[];
  users: Users[];
  dataLoaded: boolean;
};

export default class TodoList extends React.PureComponent<{},
{ todos: Todos[]; users: Users[]; dataLoaded: boolean }> {
  state: State = {
    todos: [],
    users: [],
    dataLoaded: false,
  };

  sortByTitle = () => {
    this.setState(state => ({
      todos: [...state.todos.sort((a, b) => a.title.localeCompare(b.title))],
    }));
  };

  sortByName = () => {
    this.setState(state => ({
      todos: [...state.todos.sort((a, b) => a.userId - b.userId)],
    }));
  };

  sortByCompletion = () => {
    this.setState(state => ({
      todos: [...state.todos
        .sort((a, b) => (Number(a.completed) - Number(b.completed))).reverse()],
    }));
  };

  loadTodosFromServer = () => {
    Promise.all([getUsersFromServer(), getTodosFromServer()]).then((data) => {
      this.setState({
        users: data[0],
        todos: data[1],
        dataLoaded: true,
      });
    });
  };

  render() {
    return (
      <>
        <div className="button__wrapper">
          <button
            type="button"
            className="button button__load"
            style={{ display: this.state.dataLoaded ? 'none' : 'initial' }}
            onClick={this.loadTodosFromServer}
          >
            Load Todos from Server
          </button>
          <button
            type="button"
            style={{ display: this.state.dataLoaded ? 'initial' : 'none' }}
            className="button button__sort"
            onClick={this.sortByTitle}
          >
            Sort by title
          </button>
          <button
            type="button"
            style={{ display: this.state.dataLoaded ? 'initial' : 'none' }}
            className="button button__sort"
            onClick={this.sortByName}
          >
            Sort by name
          </button>
          <button
            type="button"
            style={{ display: this.state.dataLoaded ? 'initial' : 'none' }}
            className="button button__sort"
            onClick={this.sortByCompletion}
          >
            Sort by completion
          </button>
        </div>
        <div className="todo__list">

          {this.state.todos.map(todo => (
            <div
              key={todo.id}
              className="todo"
            >
              <span className="todo__user">
                Executor:
                {' '}
                {`${(this.state.users.filter(user => user.id === todo.userId)[0]).name}`}
              </span>
              <span className="todo__title">
                {todo.title}
              </span>
              <span className={todo.completed ? 'todo__completed' : 'todo__not-completed'}>
                Completed:
                {' '}
                {`${todo.completed}`}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }
}
