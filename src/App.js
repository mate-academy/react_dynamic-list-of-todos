import React from 'react';
import './App.css';

import TodoList from './TodoList';
import { getTodos, getUsers } from './api';

const getData = async() => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};

const getSortedTodos = (todos, sortField) => {
  const globTodoSort = {
    id: (a, b) => a.id - b.id,
    completed: (a, b) => a.completed - b.completed,
    title: (a, b) => a.title.localeCompare(b.title),
    user: (a, b) => a.user.name.localeCompare(b.user.name),
  };

  const callback = globTodoSort[sortField];

  return [...todos].sort(callback);
};

class App extends React.Component {
  state = {
    sortField: 'id',
    visibleTodos: [],
    isLoaded: false,
    isLoading: false,
  };

  handleClick = async() => {
    const todos = await getData();

    this.setState(prev => ({
      isLoading: true,
      visibleTodos: getSortedTodos(todos, prev.sortField),
    }), () => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    });
  }

  sortBy = (sortField) => {
    if (this.state.sortField === sortField) {
      this.setState(prev => ({
        visibleTodos: getSortedTodos(prev.visibleTodos, sortField).reverse(),
        sortField,
      }));
    } else {
      this.setState(prev => ({
        visibleTodos: getSortedTodos(prev.visibleTodos, sortField),
        sortField,
      }));
    }
  };

  render() {
    const { sortField, visibleTodos } = this.state;
    console.log(visibleTodos);
    return (
      <div>

        { this.state.isLoaded ? (
          <div>
            <h1>
              {this.state.visibleTodos.length}
              {' '}
              sorted by:
              {' '}
              {sortField}
            </h1>
            <table className="App">
              <thead>
                <tr>
                  <th>
                    <button type="button" onClick={() => this.sortBy('id')}>
                        №
                    </button>
                  </th>
                  <th>
                    <button type="button" onClick={() => this.sortBy('user')}>
                        Name
                    </button>
                  </th>
                  <th>
                    <button
                      type="button"
                      onClick={() => this.sortBy('title')}
                    >
                      title
                    </button>
                  </th>
                  <th>
                    <button
                      type="button"
                      onClick={() => this.sortBy('completed')}
                    >
                      Completed
                    </button>
                  </th>
                </tr>
              </thead>
              <TodoList currentTodos={this.state.visibleTodos} />
            </table>
          </div>
        ) : (
          <button type="button" onClick={this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </div>
    );
  }
}

export default App;
