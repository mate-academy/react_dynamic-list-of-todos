import React from 'react';

import { getUsersFromServer, getTodosFromServer } from './api';


interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;

}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

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

  loadTodosFromSrver = () => {
    getUsersFromServer().then(users => {
      this.setState({ users });
    });
    getTodosFromServer().then(todos => {
      this.setState({ todos });
    });
    this.setState({ dataLoaded: true });
  };

  render() {
    return (
      <>
        <div className="button__wrapper">
          <button
            type="button"
            className="button button__load"
            style={{ display: this.state.dataLoaded ? 'none' : 'initial' }}
            onClick={this.loadTodosFromSrver}
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
