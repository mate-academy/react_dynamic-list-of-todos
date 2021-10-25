import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getUserById } from './api/api';

type User = {
  id: number,
  name: string,
  email: string,
  phone: number,
};

type State = {
  selectedUserId: number;
  selectedUser: User | null;
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    selectedUser: null,
  };

  switchUser = async (id: number) => {
    const { selectedUserId } = this.state;

    if (selectedUserId !== id) {
      const selectedUser = await getUserById(id);

      this.setState({
        selectedUser,
        selectedUserId: id,
      });
    }
  };

  render() {
    const { selectedUserId, selectedUser } = this.state;
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
                currentUser={selectedUser}
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
