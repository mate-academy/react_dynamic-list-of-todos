import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { request } from './api/api';
import { Todo } from './types/Todo';

interface State {
  selectedUserId: number | null;
  todos: Todo[],
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: null,
    todos: [],
  };

  componentDidMount() {
    request()
      .then(todos => this.setState({ todos }));
  }

  buttonHandler = (userId: number) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  clearUser = () => {
    this.setState({ selectedUserId: null });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            buttonHandler={this.buttonHandler}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
