import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos, loadUsers } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todosFromServer = await loadTodos();
    const usersFromServer = await loadUsers();

    this.setState({
      todos: todosFromServer,
      users: usersFromServer,
    });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { todos, selectedUserId, users } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length ? (
            <TodoList
              todos={todos}
              selectUser={this.selectUser}
              userId={selectedUserId}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUser}
                users={users}
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
