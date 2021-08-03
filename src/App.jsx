import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    currentUser: null,
  };

  componentDidMount() {
    request('/todos').then((todos) => {
      this.setState({
        todos,
      });
    });
  }

  componentDidUpdate(prevstate) {
    if (prevstate.selectedUserId !== this.state.selectedUserId) {
      request('/users/').then((users) => {
        this.setState(state => ({
          currentUser: users.find(user => user.id === state.selectedUserId),
        }));
      });
    }
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearSelect = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId, currentUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                currentUser={currentUser}
                clearSelect={this.clearSelect}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
