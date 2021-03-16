import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    selectedUserId: 0,
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList selectUser={this.selectUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
