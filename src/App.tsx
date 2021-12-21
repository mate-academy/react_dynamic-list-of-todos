import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './types';

interface State {
  selectedUserId: number;
  todos: Todo[];
  isLoading: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    getTodos()
      .then(result => this.setState({ todos: result }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onSelectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { todos, selectedUserId, isLoading } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {isLoading
            ? 'Loading todos list... Please, wait'
            : (
              <TodoList
                todos={todos}
                selectedUser={selectedUserId}
                onSelectUser={this.onSelectUser}
              />
            )}

        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
