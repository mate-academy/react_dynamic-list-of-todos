import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos().then(todos => this.setState({ todos }));
  }

  selectedUser = (userID) => {
    this.setState({ selectedUserId: userID });
  };

  clearUserInfo = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} selectedUser={this.selectedUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUserInfo={this.clearUserInfo}
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
