/* eslint-disable arrow-parens */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { request } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 2,
    pressedUserBtn: 0,
  };

  componentDidMount() {
    request('todos').then((todos) => this.setState({ todos: todos.data }));
  }

  setSelectedUserId = (id) => {
    this.setState({ selectedUserId: id });
  };

  setPressedUserBtn = (id) => {
    this.setState({ pressedUserBtn: id });
  };

  render() {
    const { todos, selectedUserId, pressedUserBtn } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            setSelectedUserId={this.setSelectedUserId}
            pressedUserBtn={pressedUserBtn}
            setPressedUserBtn={this.setPressedUserBtn}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                setSelectedUserId={this.setSelectedUserId}
                setPressedUserBtn={this.setPressedUserBtn}
              />
            ) : (
              'No user selected'
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
