import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
  checkedTodo: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    checkedTodo: false,
  };

  selectUser = (id: number) => {
    this.setState(state => ({
      selectedUserId: id,
      checkedTodo: !state.checkedTodo,
    }));
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
