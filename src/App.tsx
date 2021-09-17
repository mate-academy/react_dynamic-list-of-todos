import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos, getUser } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
  };

  changeUser = (id: number) => {
    if (this.state.selectedUserId !== id) {
      this.setState({
        selectedUserId: id,
      });
    }
  };

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            getTodos={getTodos}
            selectedUserId={selectedUserId}
            changeUser={this.changeUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                getUser={getUser}
                clearUser={this.clearUser}
              />
            ) : <h3 className="text-center">No user selected</h3>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
