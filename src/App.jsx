import React from 'react';

import './App.scss';
import './styles/general.scss';

import { getTodos } from './api/todos';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    onSelectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  render() {
    const { todos, onSelectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onSelectedUserId={onSelectedUserId}
            onUserSelected={(userId) => {
              this.setState({ onSelectedUserId: userId });
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {onSelectedUserId ? (
              <CurrentUser
                userId={onSelectedUserId}
                clearUser={() => {
                  this.setState({ onSelectedUserId: 0 });
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
