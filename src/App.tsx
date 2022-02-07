import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[],

}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const todos = await getAllTodos();

    this.setState({ todos });
  }

  onUserSelect = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  handleClearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const {
      selectedUserId,
      todos,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {this.state.todos.length > 0
            && (
              <TodoList
                todos={todos}
                handleUserSelect={this.onUserSelect}
              />
            )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                clearUser={this.handleClearUser}
                userId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
