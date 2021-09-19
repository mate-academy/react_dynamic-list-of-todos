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

  getSelectedUserId = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const {
      selectedUserId,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            getSelectedUserId={this.getSelectedUserId}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            <CurrentUser
              selectedUserId={selectedUserId}
              clearUser={this.clearUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
