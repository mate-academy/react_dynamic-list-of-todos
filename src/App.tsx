import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
  todos: Todo[],
  errorMessage: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    errorMessage: '',
  };

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clear = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos, errorMessage } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {!errorMessage
            ? (
              <TodoList
                selectedUserId={selectedUserId}
                selectUser={this.selectUser}
              />
            ) : (
              { errorMessage }
            )}
        </div>
        <p>{todos}</p>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clear={this.clear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
