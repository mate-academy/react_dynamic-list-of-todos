import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  setSelectedId = (id: number) => {
    this.setState({
      selectedUserId: id,
    });
  };

  render() {
    const {
      selectedUserId,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectedUserId={selectedUserId}
            setSelectedId={this.setSelectedId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
