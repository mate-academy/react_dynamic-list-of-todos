import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getUser } from './api/api';

interface State {
  selectedUserId: number;
  chosenUser: User | null;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    chosenUser: null,
  };

  changeUser = async (id: number) => {
    const { selectedUserId } = this.state;

    if (selectedUserId !== id) {
      getUser(id)
        .then(user => this.setState({ chosenUser: user, selectedUserId: id }));
    }
  };

  render() {
    const { selectedUserId, chosenUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList changeUser={this.changeUser} selectedUserId={selectedUserId} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser selectedUser={chosenUser} changeUser={this.changeUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
