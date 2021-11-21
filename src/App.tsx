import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo, User } from './react-app-env';
import { getAllTodos, getUser } from './api';

interface State {
  selectedUserId: number,
  todos: Todo[] | [],
  selectedUser: User | null,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    selectedUser: null,
  };

  componentDidMount() {
    if (!this.state.selectedUser) {
      getAllTodos()
        .then(todos => {
          this.setState({ todos });
        });
    }
  }

  componentDidUpdate() {
    const userId = this.state.selectedUserId;

    getUser(userId)
      .then(user => {
        this.setState({ selectedUser: user });
      });
  }

  deselectCurrentUser() {
    this.setState({ selectedUser: null });
  }

  render() {
    const { selectedUserId, todos, selectedUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedIdUser={selectedUserId}
            selectUserId={(userId: number) => {
              return this.setState({ selectedUserId: userId });
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUser ? (
              <>
                <button
                  type="button"
                  onClick={this.deselectCurrentUser}
                >
                  Clear
                </button>
                <CurrentUser
                  user={selectedUser}
                />
              </>
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
