import React from 'react';
import './App.css';
import TodoList from './TodoList';
import { getTodos, getUsers } from './getData';

class App extends React.Component {
  todos = [];

  state = {
    visibleTodos: [],
    sortTodos: [],
    isLoaded: false,
    isLoading: false,
    sortField: 'id',
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
    this.setState(prevState => ({
      visibleTodos: this.todos,
      isLoaded: true,
      isLoading: false,
    }));
  };

  sortBy = (sortField) => {
    const sortTodos = this.getSortedTodos(sortField);
    this.setState(prevState => ({
      sortField,
      visibleTodos: sortTodos,
      sortTodos,
    }));
  };

  getSortedTodos = (newSortField) => {
    const { sortField, sortTodos } = this.state;
    if (sortField === newSortField) {
      return [...sortTodos].reverse();
    }
    const callbackMap = {
      id: (a, b) => a.id - b.id,
      completed: (a, b) => a.completed - b.completed,
      title: (a, b) => a.title.localeCompare(b.title),
      user: (a, b) => a.user.name.localeCompare(b.user.name),
    };

    const callback = callbackMap[newSortField];
    return [...this.todos].sort(callback);
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
              <button
                onClick={this.handlerClick}
                className="main__button"
                type="button"
                disabled={disabled}
              >
                {isLoading ? 'Loading...' : 'Load'}
              </button>
            ) : (
              <>
                <h1>Todos List</h1>
                <TodoList
                  todos={visibleTodos}
                  onSortBy={this.sortBy}
                />
              </>
            )
        }
      </main>
    );
  }
}

export default App;
