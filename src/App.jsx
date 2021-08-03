import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosList } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodosList()
      .then(todos => this.setState({ todos }));
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  resetSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { state, selectUser, resetSelectedUser } = this;
    const { todos, selectedUserId } = state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0
            ? (
              <TodoList todos={todos} selectUser={selectUser} />
            ) : (
              'Not todos'
            )
          }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                resetUser={resetSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
