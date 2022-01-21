import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: [],
  todoError: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    todoError: false,
  };

  async componentDidMount() {
    try {
      const todos = await getTodos();

      this.setState({ todos });
    } catch (error) {
      this.setState({ todoError: true });
    }
  }

  userSelected = (userId: number) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({ selectedUserId: userId });
    }
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const {
      todos,
      selectedUserId,
      todoError,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todoError ? (
            <p>Cannot load data from server</p>
          ) : (
            <TodoList
              todos={todos}
              userSelected={this.userSelected}
              selectedUserId={selectedUserId}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userSelected={this.userSelected}
                selectedUserId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected or user is missing from the database'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
