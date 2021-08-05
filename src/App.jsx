import React, { Component } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { getTodos } from './helpers';
import { CurrentUser } from './components/CurrentUser';

export class App extends Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const response = await getTodos();

    this.setState({ todos: response.data });
  }

    selectUser = (userId) => {
      this.setState({ selectedUserId: userId });
    }

    clearSelectedUser = () => {
      this.setState({ selectedUserId: 0 });
    }

    render() {
      const { todos, selectedUserId } = this.state;

      return (
        <div className="App">
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              selectUser={this.selectUser}
            />
          </div>

          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearSelectedUser={this.clearSelectedUser}
                />
              ) : 'No user selected'}
            </div>
          </div>
        </div>
      );
    }
}


