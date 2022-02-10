import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

type State = {
  selectedUserId: number,
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
  };

  selectUser = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList setUserId={this.selectUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} selectUser={this.selectUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
