import React from 'react';
import './App.scss';
import './styles/general.scss';
import 'bulma/css/bulma.min.css';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

type State = {
  selectedUserId: number;
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
  };

  selectUser = (userId: number) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  clearUser = () => (
    this.setState({ selectedUserId: 0 })
  );

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectUser={this.selectUser}
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
