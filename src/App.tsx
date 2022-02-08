import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number,
}

class App extends React.PureComponent<{}, State> {
  state: State = {
    selectedUserId: 0,
  };

  selectUserHandler = (userId: string) => {
    const userNewId = +userId;

    if (this.state.selectedUserId !== userNewId) {
      this.setState({ selectedUserId: userNewId });
    }
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
            selectUserHandler={this.selectUserHandler}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  userId={selectedUserId}
                  selectUserHandler={this.selectUserHandler}
                />
              )
              : (
                'No user selected'
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
