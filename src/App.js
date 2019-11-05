import React, { Component } from 'react';

import { users, todos } from './api/getAllUsers';
import ToDoList from './components/ToDoList/ToDoList';
import Spinner from './components/spinner/Spinner';
import Error from './components/error/Error';

export default class App extends Component {

  state = {
    todos: [],
    isLoading: false,
    sortType: 'Show default list',
    hasError: false,
  }

  loadData = async() => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    Promise.all([users, todos])
      .then(([users, todos]) => {
        this.setState({
          todos: todos.map(todo => {
            return {
              ...todo,
              user: users.find(user => user.id === todo.userId)
            }
          }),
        });
      })
      .catch(() => {
        this.setState({ hasError: true, isLoading: false })
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  sortItems = (sortingType) => {
    this.setState({
      sortType: sortingType,
    });
  };

  render() {
    const { isLoading, todos, sortType, hasError } = this.state;
    if (isLoading) {
      return <Spinner />
    } else if (hasError) {
      return <Error load={this.loadData} />
    } else if (!todos.length) {
      return (
        <button
          className="btn btn-dark mx-auto mt-5 btn-block w-25"
          onClick={this.loadData}
        >
            Load
        </button>);
    }

    return (
      <ToDoList 
        todos={todos} 
        sorting={this.sortItems}
        sortType={sortType}
      />
      );
  }
}
