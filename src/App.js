import React from 'react';
import './App.css';

import { getTodos, getUsers } from './api/data';
import TodoList from './components/TodoList';

const getData = async() => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    };
  });
};

const getSortedTodos = (todos, sortField) => {
  const sortCallbacks = {
    id: (a, b) => a.id - b.id,
    completed: (a, b) => a.completed - b.completed,
    title: (a, b) => a.title.localeCompare(b.title),
    user: (a, b) => a.user.name.localeCompare(b.user.name),
  };

  return [...todos].sort(sortCallbacks[sortField]);
};

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
    isLoaded: false,
    isButtonDisabled: false,
    sortField: 'id',
  };

  loadData = async() => {
    this.setState({
      isButtonDisabled: true,
    });

    const todos = await getData();

    this.setState({
      isLoaded: true,
      todos,
      visibleTodos: getSortedTodos(todos, 'id'),
    });
  };

  sortBy = (sortField) => {
    const sortedTodos = getSortedTodos(this.state.todos, sortField);
    sortField !== this.state.sortField
      ? this.setState(prevState => ({
        visibleTodos: sortedTodos,
        sortField,
      }))
      : this.reverseSort();
  };

  reverseSort = () => {
    this.setState(prevState => ({
      visibleTodos: getSortedTodos(prevState.visibleTodos).reverse(),
    }));
  };

  render() {
    const { visibleTodos, isLoaded } = this.state;
    return (
      <main>
        <div className="center">
          <h1>List of Todos</h1>
          {isLoaded ? (
            <div>
              <h2>
                (
                {visibleTodos.length}
                 items)
              </h2>
              <button type="submit" onClick={() => this.sortBy('id')}>
                Sort by ID
              </button>

              <button type="submit" onClick={() => this.sortBy('completed')}>
                Sort by status
              </button>

              <button type="submit" onClick={() => this.sortBy('title')}>
                Sort by Title
              </button>

              <button type="submit" onClick={() => this.sortBy('user')}>
                Sort by User
              </button>

              <TodoList todos={visibleTodos} />
            </div>
          ) : (
            <div>
              <h2>({visibleTodos.length} items)</h2>
              <button
                type="submit"
                onClick={this.loadData}
                disabled={this.state.isButtonDisabled}
              >
                Load
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default App;
