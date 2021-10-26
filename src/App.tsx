import { Component } from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadData } from './api/api';

import './App.scss';
import './styles/general.scss';

type State = {
  todos: Todo[],
  users: User[],
  userId: number,
};

class App extends Component<{}, State> {
  state: State = {
    todos: [],
    users: [],
    userId: 0,
  };

  componentDidMount() {
    loadData('todos').then((todos: Todo[]) => {
      this.setState({ todos });
    });
    loadData('users').then((users: User[]) => {
      this.setState({ users });
    });
  }

  selectUserId = (id: number) => {
    this.setState({ userId: id });
  };

  clearUser = () => {
    this.setState({ userId: 0 });
  };

  render() {
    const { todos, users, userId } = this.state;

    return (
      <div className="App">
        {
          todos.length > 0 ? (
            <>
              <div className="App__sidebar">
                <TodoList
                  userId={userId}
                  todos={todos}
                  users={users}
                  selectUserId={this.selectUserId}
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
            <div>Please, wait...</div>
          )
        }
      </div>
    );
  }
}

export default App;
