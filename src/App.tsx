import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodo } from './api';
import { Todo } from './types';

export interface State {
  selectedUserId: number;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    getTodo()
      .then(todosFromServer => {
        this.setState({ todos: todosFromServer });
      });
  }

  selectUser = (userId: number) => {
    if (userId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            todos={todos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clear={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
