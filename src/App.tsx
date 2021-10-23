import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getCurrentUser } from './api/api';

interface State {
  selectedUserId: number;
  selectedUser: User | null;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    selectedUser: null,
  };

  changeUser = async (id: number) => {
    const { selectedUserId } = this.state;

    if (selectedUserId !== id) {
      const selectedUser = await getCurrentUser(id);

      this.setState({ selectedUser, selectedUserId: id });
    }
  };

  render() {
    const { selectedUserId, selectedUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList selectedUserId={selectedUserId} selectUser={this.changeUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser currentUser={selectedUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
