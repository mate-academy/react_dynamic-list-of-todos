import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

import { Todo } from './types/Todo';

interface State {
  selectedUserId: number;
  todos: Todo[] | [],
  errorMessage: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    errorMessage: '',
  };

  async componentDidMount() {
    try {
      const todos = await getTodos();

      this.setState({ todos });
    } catch {
      this.setState({ errorMessage: 'List is not found' });
    }
  }

  selectUser = (userId: number) => {
    if (this.state.selectedUserId === userId) {
      return;
    }

    this.setState({ selectedUserId: userId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos, errorMessage } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0
            ? (
              <TodoList
                todos={todos}
                selectUser={this.selectUser}
                selectedUserId={selectedUserId}
              />
            )
            : <p>{errorMessage}</p>}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
