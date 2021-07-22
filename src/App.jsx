import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    this.setState({
      todos: todosFromServer,
      users: usersFromServer,
    });
  }

  setUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, users } = this.state;
    let currentUser = [];

    if (selectedUserId !== 0) {
      currentUser = users.find(user => user.id === selectedUserId);
    }

    return (
      <div className="App">

        <div className="App__sidebar">

          <TodoList todos={todos} filter={this.filter} setUser={this.setUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={currentUser}
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
