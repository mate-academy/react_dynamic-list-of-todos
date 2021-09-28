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

  chooseAUser = (event: React.MouseEvent) => {
    const { target } = event;
    const { value } = target as HTMLButtonElement;

    if (+value !== this.state.selectedUserId) {
      this.setState({
        selectedUserId: +value,
      });
    }
  };

  unselectUser = () => {
    this.setState({ selectedUserId: 0 });
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
            chooseAUser={this.chooseAUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUser={selectedUserId}
                clear={this.unselectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
