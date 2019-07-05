import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

class App extends React.Component {
  state = {
    todoWidthUser: [],
    isLoaded: false,
    isLoading: false,
  };

  loadData = () => {
    this.setState({
      isLoading: true,
    });
    const todos = fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json());
    const users = fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());

    Promise.all([todos, users]).then((lists) => {
      const todoWidthUser = lists[0].map(item => ({
        ...item,
        user: lists[1].find(user => user.id === item.userId),
      }));
      this.setState({
        todoWidthUser: todoWidthUser,
        isLoading: false,
        isLoaded: true,
      });
    });
  };

  sortByName = () => {
    this.setState(prevState => ({
      todoWidthUser:
        prevState.todoWidthUser.sort((a, b) => (a.user.name > b.user.name) ? 1 : -1),
    }));
  };

  sortByComplete = () => {
    this.setState(prevState => ({
      todoWidthUser:
        prevState.todoWidthUser.sort((a, b) => (a.completed > b.completed) ? -1 : 1),
    }));
  };

  render() {
    if (!this.state.isLoaded) {
      return <button className="load-button" onClick={this.loadData}>
        {this.state.isLoading ? 'Loading...' : 'Load' }
      </button>;
    }
    return (
      <div className="main">
        <div className="main__sort-buttons">
          Sort by:
          <button onClick={this.sortByName}>Name</button>
          <button onClick={this.sortByComplete}>Complete</button>
        </div>
        <TodoList todoWidthUser={this.state.todoWidthUser} />
      </div>
    );
  }
}

export default App;
