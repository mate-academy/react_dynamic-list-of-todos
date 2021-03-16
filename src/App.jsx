import React from 'react';
import './App.scss';
import './styles/general.scss';
import 'bulma';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    selectedUserId: 0,
  };

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearUserId = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { selectedUserId } = this.state;
    const { selectUser, clearUserId } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectedUser={selectUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={clearUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
