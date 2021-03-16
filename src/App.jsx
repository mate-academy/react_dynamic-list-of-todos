import React from 'react';
import './App.scss';
import './styles/general.scss';
import * as API from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await API.getTodos();

    this.setState({
      todos,
    });
  }

  updateSelectedUserId = (userId) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  }

  resetSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { updateSelectedUserId, resetSelectedUser } = this;
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            updateSelectedUserId={updateSelectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                resetSelectedUser={resetSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
