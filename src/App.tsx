/* eslint-disable no-console */

import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 1,
  };

  selectUser = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  clearCurrentUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectedUserId={selectedUserId}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                currentUserId={selectedUserId}
                clearSelectedUser={this.clearCurrentUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
