import React from 'react';
import classNames from 'classnames';
import './App.css';

import { getTodos, getUsers } from './api';
import TodoList from './TodoList';
import { AppState, User, Todo } from './types';


class App extends React.Component {
  state: AppState = {
    preparedTodos: [],
    todosFromServer: [],
    usersFromServer: [],
    isButtonVisible: true,
    isButtonDisabled: false,
    buttonText: 'Load',
    sortedBy: '',
  };


  preparedTodosGenerate = () => {
    if (this.state.todosFromServer.length === 0
      || this.state.usersFromServer.length === 0) {
      return;
    }

    this.setState((prevState: AppState) => {
      return (
        {
          preparedTodos: prevState.todosFromServer.map((todo: Todo) => {
            return ({
              ...todo,
              user: (prevState.usersFromServer.find((user: User) => (user.id === todo.userId))),
            });
          }),
          isButtonVisible: false,
        }
      );
    });
  };

  handleLoadButtonClick = () => {
    this.setState({
      isButtonDisabled: true,
      buttonText: 'Loading...',
    });

    Promise.all([getTodos(), getUsers()])
      .then((dataFromServer) => {
        this.setState({
          todosFromServer: dataFromServer[0],
          usersFromServer: dataFromServer[1],
        });
        this.preparedTodosGenerate();
      });
  };


  handleSortByTitleButtonClick = () => {
    this.setState((prevState: AppState) => ({
      preparedTodos: [...prevState.preparedTodos]
        .sort((a: Todo, b: Todo) => a.title.localeCompare(b.title)),
      sortedBy: 'Sorted by Description',
    }));
  };

  handleSortByNameButtonClick = () => {
    this.setState((prevState: AppState) => ({
      preparedTodos: [...prevState.preparedTodos]
        .sort((a: Todo, b: Todo) => a.user.name.localeCompare(b.user.name)),
      sortedBy: 'Sorted by Name',
    }));
  };

  handleSortByCompletedButtonClick = () => {
    this.setState((prevState: AppState) => ({
      preparedTodos: [...prevState.preparedTodos]
        .sort((a: Todo, b: Todo) => ((a.completed.toString()
          .localeCompare(b.completed.toString())))),
      sortedBy: 'Sorted by Complete',
    }));
  };

  render() {
    const { isButtonVisible, isButtonDisabled } = this.state;

    return (
      <>
        <h1>Dynamic list of TODOs</h1>
        <button
          type="button"
          disabled={isButtonDisabled}
          className={classNames({ visible: isButtonVisible }, { 'un-visible': !isButtonVisible })}
          onClick={this.handleLoadButtonClick}
        >
          {this.state.buttonText}
        </button>
        <button
          className={classNames({ visible: !isButtonVisible }, { 'un-visible': isButtonVisible })}
          type="button"
          onClick={this.handleSortByNameButtonClick}
        >
          Sort by user name
        </button>
        <button
          className={classNames({ visible: !isButtonVisible }, { 'un-visible': isButtonVisible })}
          type="button"
          onClick={this.handleSortByTitleButtonClick}
        >
          Sort by description
        </button>
        <button
          className={classNames({ visible: !isButtonVisible }, { 'un-visible': isButtonVisible })}
          type="button"
          onClick={this.handleSortByCompletedButtonClick}
        >
          Sort by complited
        </button>

        <p>{this.state.sortedBy}</p>
        <TodoList
          todos={this.state.preparedTodos}
        />
      </>
    );
  }
}

export default App;
