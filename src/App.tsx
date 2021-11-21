import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { API } from './utils/api';

interface State {
  selectedUserId: number;
  user: User;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    user: {
      id: 0,
      email: '',
      phone: '',
      name: '',
    },
  };

  componentDidUpdate(_prevProps: {}, prevState: State) {
    if (prevState.selectedUserId !== this.state.selectedUserId && this.state.selectedUserId !== 0) {
      this.loadUser();
    }
  }

  setSelectedId = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  loadUser() {
    const { selectedUserId } = this.state;

    API.getUserInfo(selectedUserId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { selectedUserId, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList setSelectedId={this.setSelectedId} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={user}
                clear={this.setSelectedId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
