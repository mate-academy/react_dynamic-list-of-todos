import React from 'react';
import './App.css';
import TodoList from './components/scripts/TodoList';
import { getTodos, getUsers } from './api/api';

class App extends React.Component {
  todos = [];

  state = {
    visibleTodos: [],
    sortTodos: [],
    isLoaded: false,
    isLoading: false,
    sortField: '',
    disabled: false,
  };

  getData = async() => {
    const todos = await getTodos();
    const users = await getUsers();

    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  };

  handlerClick = async() => {
    this.setState({
      isLoading: true,
      disabled: true,
    });
    setTimeout(() => {
      this.loadData();
    }, 2000);
  };

  loadData = async() => {
    this.todos = await this.getData();
    this.setState(() => ({
      visibleTodos: this.todos,
      isLoaded: true,
      isLoading: false,
    }));
  };

  sortBy = (sortField) => {
    const sortTodos = this.getSortedTodos(sortField);
    this.setState(() => ({
      sortField,
      visibleTodos: sortTodos,
      sortTodos,
    }));
  };

  getSortedTodos = (newSortField) => {
    if (newSortField) {
      const { sortField, sortTodos, visibleTodos } = this.state;
      if (sortField === newSortField && sortTodos === visibleTodos) {
        return [...sortTodos].reverse();
      }
      const callbackMap = {
        completed: (a, b) => a.completed - b.completed,
        title: (a, b) => a.title.localeCompare(b.title),
        user: (a, b) => a.user.name.localeCompare(b.user.name),
      };

      const callback = callbackMap[newSortField];
      return [...this.todos].sort(callback);
    }
    return [...this.todos];
  };

  render() {
    const {
      visibleTodos,
      isLoading,
      isLoaded,
      disabled,
    } = this.state;

    return (
      <main className="main">
        {
          (!isLoaded)
            ? (
              <>
                <button
                  onClick={this.handlerClick}
                  className="load-button"
                  type="button"
                  disabled={disabled}
                >
                  {isLoading ? 'Loading...' : 'Load'}
                </button>
                {isLoading ? <div className="spinner" /> : null}
              </>
            ) : (
              <>
                <TodoList
                  todos={visibleTodos}
                  sortBy={this.sortBy}
                />
              </>
            )
        }
      </main>
    );
  }
}

export default App;
