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
  errorGettingUser: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    selectedUser: null,
    errorGettingUser: false,
  };

  componentDidMount() {
    if (!this.state.selectedUser) {
      getAllTodos()
        .then(todos => {
          this.setState({ todos });
        });
    }
  }

  componentDidUpdate = () => {
    const currentUserId = this.state.selectedUser && this.state.selectedUser.id;
    const { errorGettingUser, selectedUserId } = this.state;

    if (selectedUserId && selectedUserId !== currentUserId) {
      getUser(selectedUserId)
        .then(selectedUser => {
          this.setState({ selectedUser, errorGettingUser: false });
        })
        .catch(() => {
          if (!errorGettingUser) {
            this.setState({ selectedUser: null, errorGettingUser: true });
          }
        });
    }
  };

  deselectCurrentUser = () => {
    this.setState({
      selectedUser: null,
      selectedUserId: 0,
    });
  };

  render() {
    const {
      selectedUserId,
      todos,
      selectedUser,
      errorGettingUser,
    } = this.state;
    const message = errorGettingUser ? 'Opps, something went wrong :)' : 'No user selected';

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
            ) : message}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
