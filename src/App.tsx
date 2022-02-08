import React from 'react';
import './App.scss';
import './styles/general.scss';
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
    this.setState({ selectedUserId: userId });
  };

  clearUserInfo = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">

          <TodoList
            userId={this.state.selectedUserId}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={this.state.selectedUserId}
                clearUser={this.clearUserInfo}
              />
            ) : (
              <div className="content is-large has-text-centered has-text-weight-bold">
                No user selected
              </div>
            )}
          </div>
        </div>
        )

      </div>
    );
  }
}

export default App;
