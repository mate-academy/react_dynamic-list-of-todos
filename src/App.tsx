import React from 'react';
import './App.scss';
import './styles/general.scss';
import * as apiService from './api/api';
import CurrentUser from './components/CurrentUser/CurrentUser';
import TodoList from './components/TodoList/TodoList';

interface State {
  selectedUserId: number;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    this.loadTodos();
  }

  handleSelectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  async loadTodos() {
    const todos = await apiService.getAllTodos();

    this.setState({ todos });
  }

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0 && (
            <TodoList
              selectedUser={selectedUserId}
              onSelectUser={this.handleSelectUser}
              todos={todos}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser onClear={this.clearSelectedUser} userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
