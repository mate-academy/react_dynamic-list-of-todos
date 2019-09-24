import React from 'react';

import './App.css';

import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

class App extends React.Component {
  state = {
    preparedTodos: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  }

  loadData = () => (
    Promise.all([
      fetch(usersUrl),
      fetch(todosUrl),
    ])
      .then(([usersData, todosData]) => (
        Promise.all([usersData.json(), todosData.json()])
      ))
  )

  getData = () => {
    this.setState({
      isLoading: true,
      isLoaded: false,
      hasError: false,
    });

    this.loadData()
      .then(([usersData, todosData]) => {
        this.setState({
          preparedTodos: this.getTodosWithUsers(todosData, usersData),
          isLoading: false,
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
          isLoading: false,
        });
      });
  }

  getTodosWithUsers = (todos, users) => (
    todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }))
  )

  render() {
    const {
      preparedTodos,
      isLoading,
      isLoaded,
      hasError
    } = this.state;

    return (
      <>
        <Header
          isLoading={isLoading}
          isLoaded={isLoaded}
          hasError={hasError}
          getData={this.getData}
        />
        <TodoList todos={preparedTodos} />
      </>
    );
  }
}

export default App;
