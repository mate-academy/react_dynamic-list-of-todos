import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const loadedTodos = await getTodos();

    this.setState({
      todos: loadedTodos,
    });
  }

  selectedUser = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  reset = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            id={selectedUserId}
            selectedUser={this.selectedUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                reset={this.reset}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
