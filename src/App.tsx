import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import * as apiHelpers from './api/api';

type State = {
  selectedUserId: number | null;
  todos: Todo[];
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: null,
    todos: [],
  };

  async componentDidMount() {
    const todos = await apiHelpers.getTodos();

    this.setState({ todos });
  }

  handleUserSelect = (id: number) => {
    if (this.state.selectedUserId !== id) {
      this.setState({ selectedUserId: id });
    }
  };

  handleUserClear = () => {
    this.setState({ selectedUserId: null });
  };

  handleTodosShuffle = () => {
    this.setState(state => ({
      todos: state.todos.sort(() => 0.5 - Math.random()),
    }));
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            onUserSelect={this.handleUserSelect}
            onTodosShuffle={this.handleTodosShuffle}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={this.handleUserClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
