import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getUsers, getTodos } from './api';

class App extends React.Component {
  state = {
    selectedUserId: 0,
    users: [],
    todos: [],
  };

  async componentDidMount() {
    const [users, todos] = await Promise.all([
      getUsers('users'),
      getTodos('todos'),
    ]);

    this.setState({
      users,
      todos: todos.filter(todo => (
        todo.id && todo.title && todo.userId
      )),
    });
  }

  handleSelectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  };

  handleClearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  selectedUser = () => {
    const { users, selectedUserId } = this.state;

    return users.find(user => user.id === selectedUserId);
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectUser={this.handleSelectUser}
            todos={todos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={this.selectedUser()}
                clearUser={this.handleClearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
