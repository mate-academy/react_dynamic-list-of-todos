import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

type State = {
  selectedUserId: number;
  todos: Todo[];
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    this.downloadTodos();
  }

  downloadTodos = async () => {
    this.setState({
      todos: await getTodos(),
    });
  };

  changeSelectedUser = (id: number) => {
    this.setState({
      selectedUserId: id,
    });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUser={selectedUserId}
            onChangeUser={this.changeSelectedUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUser={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
