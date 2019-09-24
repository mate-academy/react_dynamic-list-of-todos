import React from 'react';
import './App.css';
import './components/TodoItem/TodoItem';

import { todos } from './api/todos';
import { users } from './api/users';
import TodoList from './components/TodoList/TodoList';

function getTodosWithUsers(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => item.id === todo.userId),
  }));
}

class App extends React.Component {
  state = {
    isLoading: false,
    todos: [],
    originTodos: [],
    users: [],
    isLoaded: false,
  };

  getData = () => {
    this.setState({
      isLoading: true,
    });
    todos().then(data => this.setState({
      todos: data,
      originTodos: data,
    }));
    users().then(data => this.setState({
      users: data,
    }));

    Promise.all([todos(), users()])
      .then(() => {
        this.setState({
          isLoaded: true,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const {
      users, todos, isLoading, isLoaded,
    } = this.state;
    const preparedTodos = getTodosWithUsers(todos, users);
    return (
      <div className="app">
        {isLoading && (
          <div className="ui segment">
            <div className="ui active inverted dimmer">
              <div className="ui large text loader">Loading</div>
            </div>
            <p />
            <p />
            <p />
          </div>
        )}
        {!users.length && !todos.length && !isLoading && (
          <button onClick={this.getData} className="positive ui button">
            Click
          </button>
        )}
        {isLoaded && (
          <>
            <h1>
              <span className="ui red header">Static</span>
              {' '}
              <span className="ui green header">list</span>
              {' '}
              <span className="ui yellow header">of</span>
              {' '}
              <span className="ui blue header">todos</span>
            </h1>
            <div className="ui statistics">
              <div className="teal statistic">
                <div className="value">{todos.length}</div>
                <div className="label">TODOs</div>
              </div>
              <div className="orange statistic">
                <div className="value">{users.length}</div>
                <div className="label">USERS</div>
              </div>
            </div>
            <TodoList todos={preparedTodos} />
          </>
        )}
      </div>
    );
  }
}

export default App;
