import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getUserByID } from './api';

class App extends React.Component {
  state = {
    selectedUserId: 0,
    selectedUser: {},
  };

  chooseUser = (todoUserId) => {
    getUserByID(todoUserId).then((user) => {
      this.setState(state => ({
        selectedUserId: todoUserId,
        selectedUser: user.data,
      }));
    });
  }

  clearUserID = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { selectedUserId, selectedUser } = this.state;
    const { chooseUser, clearUserID } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            chooseUser={chooseUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                {...selectedUser}
                clearUserID={clearUserID}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
