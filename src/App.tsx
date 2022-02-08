import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number | null;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 3,
  };

  selectUser = (userId: number): void => {
    if (userId === this.state.selectedUserId) {
      return;
    }

    this.setState({ selectedUserId: userId });
  }

  clearSelectedUser = (): void => {
    this.setState({ selectedUserId: null})
  }

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            onSelect={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
