import React from 'react';
import './App.css';

import TodoList from './components/TodoList';

const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const currentTodos = await response.json();

  return currentTodos;
};

const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const currentUsers = await response.json();

  return currentUsers;
};

const getSortedTodos = (completedTodoList, sortField) => {
  let callback = (typeof completedTodoList[0][sortField] === 'string')
    ? (a, b) => a[sortField].localeCompare(b[sortField])
    : (a, b) => a[sortField] - (b[sortField]);

  if (sortField === 'user') {
    callback = (a, b) => a.user.name.localeCompare(b.user.name);
  }
  return completedTodoList.sort(callback);
};

class App extends React.Component {
    state = {
      completedTodoList: [],
      isLoaded: false,
      isLoading: false,
    };

    handleClick = async() => {
      const todos = await getTodos();
      const users = await getUsers();
      const prepared = todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      }));
      this.setState({
        completedTodoList: prepared,
        isLoading: true,
      });

      setTimeout(() => {
        this.setState({
          isLoaded: true,
          isLoading: false,
        });
      }, 1000);
    };

    sortBy = (sortField) => {
      this.setState({
        completedTodoList: getSortedTodos(this.state.completedTodoList, sortField),
      });
    };

    render() {
      return (
        <div>
          { this.state.isLoaded ? (
            <div className="Todo">
              <button onClick={() => this.sortBy('id')}>ID</button>
              <button onClick={() => this.sortBy('completed')}>Completed</button>
              <button onClick={() => this.sortBy('title')}>Title</button>
              <button onClick={() => this.sortBy('user')}>User</button>
              <TodoList completedTodo={this.state.completedTodoList} />
            </div>
          ) : (
            <button type="button" onClick={this.handleClick} className="button-Load">
              {this.state.isLoading ? 'Loading...' : 'Load'}
            </button>
          )}
        </div>
      );
    }
}

export default App;
