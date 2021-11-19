import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
}

export class App extends React.Component<{}, State> {
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

  clearUserId = () => {
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
            selectedUserId={selectedUserId}
            onChangeUser={this.changeUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUserId={this.clearUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}
