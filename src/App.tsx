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

  switchUser = async (id: number) => {
    const { selectedUserId } = this.state;

    if (selectedUserId !== id) {
      this.setState({
        selectedUserId: id,
      });
    }
  };

  render() {
    const { selectedUserId } = this.state;
    const { switchUser } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectedUserId={selectedUserId}
            selectUser={switchUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                currentUserId={selectedUserId}
                clearSelectedUser={() => {
                  this.setState({ selectedUserId: 0 });
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
