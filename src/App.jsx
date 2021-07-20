import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosApi } from './api/api';

class App extends React.Component {
  state = {
    todos: null,
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodosApi().then(response => (
      this.setState({
        todos: response.data,
      })
    ));
  }

  getSelectedUserId = (userId) => {
    if (this.state.selectedUserId === userId) {
      return;
    }

    this.setState({
      selectedUserId: userId,
    });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos ? (
            <TodoList
              todos={todos}
              getSelectedUserId={this.getSelectedUserId}
              selectedUserId={selectedUserId}
            />
          ) : (
            <h2>no todos</h2>
          )}
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

export default App;
