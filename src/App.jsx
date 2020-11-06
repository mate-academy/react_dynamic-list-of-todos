import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { request } from './api';

let todosFromServer;

class App extends React.PureComponent {
  state = {
    todos: [],
    selectedUserId: null,
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    request('./todos').then((result) => {
      todosFromServer = result.data.filter(todo => (
        todo.title && todo.id
      ));

      this.setState({
        todos: todosFromServer,
      });
    });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: null,
    });
  };

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
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
