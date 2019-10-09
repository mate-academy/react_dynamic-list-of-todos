import React from 'react';

import PropTypes from 'prop-types';

import EnhancedList from './components/TodoList/TodoListHandler';

import './App.css';

const App = ({
  isLoading,
  receiveTodosAndUsers,
  isInitialized,
  hasError,
  sortTodos,
}) => {
  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (hasError) {
    return (
      <>
        <h1 className="App__title">You want to upload again.</h1>
        <button
          type="button"
          className="btn btn-warning load load-again"
          onClick={receiveTodosAndUsers}
        >
          Load again
        </button>
      </>
    );
  }

  if (!isInitialized) {
    return (
      <>
        <h1 className="App__title">Want to upload a list of todos?</h1>
        <button
          type="button"
          className="btn btn-primary load"
          onClick={receiveTodosAndUsers}
        >
          Load
        </button>
      </>
    );
  }

  return (
    <div className="App">
      <button
        type="button"
        onClick={sortTodos}
        className="btn btn-primary load"
      >
        Sort
      </button>
      <EnhancedList />
    </div>
  );
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  receiveTodosAndUsers: PropTypes.func.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  sortTodos: PropTypes.func.isRequired,
};

export default App;
