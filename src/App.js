import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requested: false,
      loaded: false,
      todos: null,
      users: null,
    };

    this.requestData = this.requestData.bind(this);
  }

  requestData() {
    this.setState({
      requested: true
    });
    const xhrTodo = new XMLHttpRequest();

    xhrTodo.open('GET', 'https://jsonplaceholder.typicode.com/todos');
    xhrTodo.addEventListener('load',() => {
      const xhrUsers = new XMLHttpRequest();

      xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
      xhrUsers.addEventListener('load',() => {
        this.setState({
          loaded: true,
          users: JSON.parse(xhrUsers.response),
          todos: JSON.parse(xhrTodo.response)
        });
      });
      xhrUsers.send();
    });
    xhrTodo.send();
  }

  render() {
    const {
      todos,
      users,    
    } = this.state;

    if (!this.state.requested) {
      return <button onClick={this.requestData}>Load todo list</button>
    } else if (this.state.loaded) {
        const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
        const todosWithUsers = todos.map(todo => ({ ...todo, user: usersMap[todo.userId] }));

        return (
          <TodoList todos={todosWithUsers} />
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default App;
