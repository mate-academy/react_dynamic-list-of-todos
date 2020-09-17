import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

class App extends React.Component {
  state = {
    selectedUserId: 0,
  };

  setUserId = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            setUserId={this.setUserId}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                setUserId={this.setUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
