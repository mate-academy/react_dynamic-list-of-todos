import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  allTodos: Todo[],
  hasLoadingError: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    allTodos: [],
    hasLoadingError: false,
  };

  async componentDidMount() {
    try {
      const allTodos = await getTodos();

      this.setState({ allTodos });
    } catch (error) {
      this.setState({
        hasLoadingError: true,
      });
    }
  }

  selectUser = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const {
      selectedUserId,
      allTodos,
      hasLoadingError,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          { hasLoadingError && <h2>No response, please try again later</h2>}
          <TodoList
            allTodos={allTodos}
            selectedUserId={selectedUserId}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : <h2>No user selected</h2>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
