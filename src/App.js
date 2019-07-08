import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import TodoList from './components/TodoList';

const getUser = userId => (
  users.find(user => user.id === userId)
);

const currentList = todos.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
    dir: 'asc',
  };

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        todos: currentList,
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  };

  sortBy = (key) => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => {
        if (prevState.dir === 'asc') {
          return (a[key] > b[key]) ? 1 : -1;
        }

        return (b[key] > a[key]) ? 1 : -1;
      }),
      dir: prevState.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  sortByName = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => {
        if (prevState.dir === 'asc') {
          return (a.user.name > b.user.name) ? 1 : -1;
        }

        return (b.user.name > a.user.name) ? 1 : -1;
      }),
      dir: prevState.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  render() {
    return (
      <main>
        { this.state.isLoaded ? (
          <TodoList
            allTodos={this.state.todos}
            sortBy={this.sortBy}
            sortByName={this.sortByName}
          />
        ) : (
          <button
            type="button"
            className="loadData"
            onClick={this.handleClick}
          >
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </main>
    );
  }
}

export default App;
