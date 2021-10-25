import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  loadedTodos: Todo[] | [];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    loadedTodos: [],
  };

  componentDidMount() {
    getTodos()
      .then(todo => this.setState({ loadedTodos: todo }));
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  render() {
    const {
      selectedUserId,
      loadedTodos,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={loadedTodos}
            selectedUser={this.selectUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clearUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
