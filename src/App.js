import React, { Component } from 'react';

import getToDoList from './api/getToDoList';
import getAllUsers from './api/getAllUsers';
import ToDoList from './components/ToDoList/ToDoList';
import Spinner from './components/spinner/Spinner';
import Error from './components/error/Error';

export default class App extends Component {

  state = {
    users: [],
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

    const [users, todos] = await Promise.all([getAllUsers(), getToDoList()])
      .catch(() => {
        this.setState({ hasError: true, isLoading: false })
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });

    this.setState({
      users: users,
      todos: todos,
    });
  };

  sortItems = (event) => {
    const sortingType = event.target.textContent;
    this.setState({
      sortType: sortingType,
    });
  };

  render() {
    const { users, isLoading, todos, sortType, hasError } = this.state;
    if (isLoading) {
      return <Spinner />
    } if (hasError) {
      return <Error load={this.loadData} />
    } if (users.length === 0) {
      return (
        <button
          className="btn btn-dark mx-auto mt-5 btn-block w-25"
          onClick={this.loadData}>
            Load
        </button>);
    }

    return <ToDoList
              users={users}
              todos={todos}
              sorting={this.sortItems}
              sortType={sortType}
            />
  }
}
