import React from 'react';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './styles/general.scss';
import './App.scss';

interface State {
  selectedUserId: number;
  selectorStatus: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    selectorStatus: 0,
  };

  getSelectedUserId = (id: number) => {
    this.setState((
      { selectedUserId: id }
    ));
  };

  handleSelectorStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectorStatus: +event.target.value,
    });
  };

  render() {
    const {
      selectedUserId,
      selectorStatus,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectedUserId={this.getSelectedUserId}
            handleSelectorStatus={this.handleSelectorStatus}
            selectorStatus={selectorStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                getSelectedUserId={this.getSelectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
