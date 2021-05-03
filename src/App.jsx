import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getUsers, getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: null,
    selectedUserId: 0,
    users: [],
  };

  async componentDidMount() {
    const [todos, users] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    this.setState({
      todos,
      users,
    });
  }

  selectedUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  render() {
    const { todos, selectedUserId, users } = this.state;

    if (!todos) {
      return (
        <p>Please wait</p>
      );
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectedUser={this.selectedUser}
            selectedUserId={selectedUserId}
            todos={todos.data}
          />

        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUser={this.selectedUser}
                userId={selectedUserId}
                users={users.data}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
