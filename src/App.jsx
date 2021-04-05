import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const [users, todos] = await Promise.all([
      getUsers('users'),
      getTodos('todos'),
    ]);

    this.setState({
      users,
      todos: todos.filter(todo => (
        todo.title
      )),
    });
  }

  handleUserSelection = (userId) => {
    this.setState({ selectedUserId: userId });
  };

  handleClearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  findSelectedUser = () => {
    const { users, selectedUserId } = this.state;

    return users.find(user => user.id === selectedUserId);
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectUser={this.handleUserSelection}
            userId={selectedUserId}
            todos={todos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={this.findSelectedUser()}
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
