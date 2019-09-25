import React, { Component } from 'react';

import './App.css';
import TodoList from './components/TodoList/TodoList';
import Dropdown from './components/Dropdown/Dropdown';

const BASE_URL = `https://jsonplaceholder.typicode.com`;
const DROPDOWN_LIST = [
  {
    option: 'Title',
    value: 'title',
  },
  {
    option: 'User',
    value: 'userName',
  },
  {
    option: 'Status',
    value: 'completed',
  },
];

export default class App extends Component {
  state = {
    isLoaded: false,
    isLoading: false,
    todos: [],
    errorMessage: null,
  };

  onLoadClick = async () => {
    this.setState({ isLoading: true });

    try {
      const [ todosResponse, usersResponse ] = await Promise.all([
        fetch(`${BASE_URL}/todos`),
        fetch(`${BASE_URL}/users`),
      ]);

      if (!todosResponse.ok) {
        this.isError('ToDo list fetch is broken');
      }

      if (!usersResponse.ok) {
        this.isError('User list fetch is broken');
      }

      const todos = await todosResponse.json();
      const users = await usersResponse.json();

      this.setState({
        todos: todos
          .map(todo => ({
            ...todo,
            user: users.find(item => item.id === todo.userId),
          }))
          .map(todo => ({
            ...todo,
            userName: todo.user.name,
          })),
        isLoaded: true,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
  };

  isError = (errorMessage) => {
    this.setState({
      isLoaded: false,
      isLoading: false,
    });
    throw new Error(errorMessage);
  };

  handleDropdownSelect = (value) => {
    this.setState(({ todos }) => ({
      todos: todos.sort((a, b) => {
        console.log(a, b);
        if (a[value] > b[value])  {
          return 1
        }

        if (a[value] < b[value]) {
          return -1
        }

        if (a.id > b.id)  {
          return 1
        }

        if (a.id < b.id) {
          return -1
        }
        return 0;
      }),
    }
  ))};

  loaderButton = () => (this.state.isLoading
    ? (
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </button>
    )
    : (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => this.onLoadClick()}
      >
        Load
      </button>
    )
  );

  render() {
    const { isLoaded, todos, errorMessage } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <h2 className="error-message">{errorMessage}</h2>

        {isLoaded
          ? (
            <>
              <Dropdown
                title="Sort by"
                itemsList={DROPDOWN_LIST}
                handleDropdownSelect={this.handleDropdownSelect}
              />
              <TodoList todos={todos} />
            </>
            )
          : this.loaderButton()}
      </div>
    );
  }
}
