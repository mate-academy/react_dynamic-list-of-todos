import React from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';
import './styles/general.scss';

interface State {
  selectedUserId: number;
}

export class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
  };

  chooseUser = (userId: number) => {
    this.resetState();
    this.setState({
      selectedUserId: userId,
    });
  };

  resetState = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            chooseUser={this.chooseUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                chooseUser={this.chooseUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}
