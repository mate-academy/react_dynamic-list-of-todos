import React from 'react';
import './App.css';

import getTodosWithUsers from './api';
import TodoList from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    isLoading: false,
    sortMethod: 'Sort by todo Id',
  }

  loadTodos = () => {
    this.setState({
      isLoading: true,
    });

    getTodosWithUsers()
      .then((todos) => {
        this.setState({ todos, isLoading: false });
      });
  }

  changeSortMethod = (sortMethod) => {
    if (sortMethod !== this.state.sortMethod) {
      this.setState({
        sortMethod,
      });
    }
  }

  render() {
    const { todos, isLoading, sortMethod } = this.state;

    if (isLoading) {
      return <button type="button">Loading...</button>;
    }

    if (todos.length === 0) {
      return (
        <button type="button" onClick={this.loadTodos}>
          Load
        </button>
      );
    }

    return (
      <TodoList
        todos={todos}
        sortMethod={sortMethod}
        changeSortMethod={this.changeSortMethod}
      />
    );
  }
}

export default App;
