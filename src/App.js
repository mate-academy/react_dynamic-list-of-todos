import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList';

const getTodos = async() => {
  const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  const usersUrl = 'https://jsonplaceholder.typicode.com/users';

  const todosResponse = await fetch(todosUrl);
  const todos = await todosResponse.json();

  const usersResponse = await fetch(usersUrl);
  const users = await usersResponse.json();

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => todo.userId === user.id),
  }));
};

const sortPosts = (todos, sortField, direction) => {
  return todos
    .sort((postA, postB) => {
      switch (sortField) {
        case 'name':
          return postA.user.name.localeCompare(postB.user.name) * direction;
        case 'completed':
          return (direction > 0)
            ? postA.completed - postB.completed
            : postB.completed - postA.completed;
        default:
          return 0;
      }
    });
};

class App extends Component{
  state = {
    todos: [],
    visibleTodos: [],
    sortField: '',
    direction: 1,
  }

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
      visibleTodos: todos,
    });
  }

  handleSorting(sortField) {
    this.setState(({ todos, direction }) => ({
      sortField,
      visibleTodos: sortPosts(todos, sortField, direction),
      direction: direction === 1 ? -1 : 1,
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <span>Sort by: </span>
        <button onClick={() => this.handleSorting('name')}>Name</button>
        <button
          onClick={() => this.handleSorting('completed')}
        >
          Completed
        </button>
        <TodoList
          todos={this.state.visibleTodos}
        />
      </div>
    );
  }
}

export default App;
