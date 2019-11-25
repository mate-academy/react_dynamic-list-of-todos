import React from 'react';
import './App.css';

// import todos from './api/todos';
// import users from './api/users';

import TodoList from './components/TodoList';

const BaseUrl = 'https://jsonplaceholder.typicode.com/';

function getTodosWithUsers(todos, users) {
  return todos.map(item => ({
    ...item,
    user: users.find(elem => elem.id === item.userId),
  }));
}

class App extends React.Component {
  state = {
    loading: false,
    todosWithUsers: [],
  };

  getDataFromServer = async(url) => {
    const response = await fetch(`${BaseUrl}${url}`);
    return response.json();
  };

  getTodosList = async() => {
    const todosandUser = await Promise.all([
      this.getDataFromServer('todos'),
      this.getDataFromServer('users'),
    ]);

    return getTodosWithUsers(todosandUser[0], todosandUser[1]);
  };

  LoadTodos = async() => {
    this.setState({
      loading: true,
    });
    this.setState({
      todosWithUsers: await this.getTodosList(),
    });
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>Dynamic list of todos</h1>
          <button type="button" onClick={this.LoadTodos}>Download</button>
        </div>
        <br />
        {(this.state.loading && this.state.todosWithUsers.length === 0)
          ? 'loading...' : ''
        }
        {this.state.todosWithUsers.length === 0
          ? ''
          : <TodoList todos={this.state.todosWithUsers} />}
      </>
    );
  }
}

export default App;
