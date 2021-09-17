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
    selectedUserId: 0,
  };

  hendleUserSelection = (userId: number) => {
    this.setState({ selectedUserId: userId });
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
            selectedUser={this.hendleUserSelection}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.clearCurrentUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
