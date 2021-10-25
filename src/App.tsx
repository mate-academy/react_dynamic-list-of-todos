import React from 'react';
import './App.scss';
import './styles/general.scss';
import { promise } from './API/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo, User } from './Types';

type State = {
  todos: Todo[],
  users: User[],
  userId: number,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    users: [],
    userId: 0,
  };

  componentDidMount() {
    promise('todos').then((todos: Todo[]) => {
      this.setState({ todos });
    });
    promise('users').then((users: User[]) => {
      this.setState({ users });
    });
  }

  selectedUserId = (id: number) => {
    this.setState({ userId: id });
  };

  clearUser = () => {
    this.setState({ userId: 0 });
  };

  render() {
    const {
      todos,
      users,
      userId,
    } = this.state;

    return (
      <div className="App">
        {
          todos.length > 0 ? (
            <>
              <div className="App__sidebar">
                <TodoList
                  todos={todos}
                  users={users}
                  selectedUserId={this.selectedUserId}
                />
              </div>

              <div className="App__content">
                <div className="App__content-container">
                  {userId ? (
                    <CurrentUser
                      userId={userId}
                      clearUser={this.clearUser}
                    />
                  ) : 'No user selected'}
                </div>
              </div>
            </>
          ) : (
            <div>Loading data</div>
          )
        }
      </div>
    );
  }
}

export default App;
