import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();
    const usersFromServer = await getUser();

    this.setState({
      todos: todosFromServer,
      users: usersFromServer,
    });
  }

  showUserInfo = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, users, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            showUserInfo={this.showUserInfo}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={users.find(user => user.id === selectedUserId)}
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
