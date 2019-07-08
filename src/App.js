import React from 'react';
import './App.css';

import TodoList from './components/TodoList';

let currentList = [];
const todosFromServer = 'https://jsonplaceholder.typicode.com/todos';
const usersFromServer = 'https://jsonplaceholder.typicode.com/users';

const getTodos = async() => {
  const response = await fetch(todosFromServer);
  const todos = await response.json();

  return todos;
};

const getUsers = async() => {
  const response = await fetch(usersFromServer);
  const todos = await response.json();

  return todos;
};

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
    dir: 'asc',
  };

  async componentDidMount() {
    const todos = await getTodos();
    const users = await getUsers();

    currentList = todos.map(todo => ({
      ...todo,
      user: users.find(user => (user.id === todo.userId)),
    }));
  }

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
    }, 0);
  };

  sortBy = (key) => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => {
        if (key) {
          if (prevState.dir.localeCompare('asc')) {
            return (a[key] > b[key]) ? 1 : -1;
          }

          return (b[key] > a[key]) ? 1 : -1;
        }

        if (prevState.dir.localeCompare('asc')) {
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
