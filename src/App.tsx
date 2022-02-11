import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import * as todosAPI from './api/todos';

interface State {
  todos: Todo[],
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    this.getAllTodos();
  }

  getAllTodos = async () => {
    const todos = await todosAPI.getAllTodos();

    this.setState({ todos });
  };

  getSelectedUser = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.state.todos}
            getSelectedUser={this.getSelectedUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
