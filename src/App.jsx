import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos, getUser } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedUser: [],
  };

  selectedUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  };

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
      selectedUser: [],
    });
  }

  componentDidMount = async() => {
    const todos = await getTodos();

    this.setState({ todos: todos.data });
  };

  componentDidUpdate = () => {
    const { selectedUserId, selectedUser } = this.state;

    if (selectedUserId !== 0
      && selectedUserId
      && selectedUserId !== selectedUser.id) {
      getUser(selectedUserId)
        .then(user => this.setState({ selectedUser: user.data }));
    }
  }

  render() {
    const { todos, selectedUserId, selectedUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            onSelectUser={this.selectedUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && selectedUser ? (
              <CurrentUser
                {...selectedUser}
                clear={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
