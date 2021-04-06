import React from 'react';
import 'bulma';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './Api';

class App extends React.Component {
  state = {
    users: [],
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const allUsers = await getUsers;
    const allTodos = await getTodos;

    this.setState({
      users: allUsers,
      todos: allTodos,
    });
  }

  chooseUser = (userID) => {
    this.setState({ selectedUserId: userID });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { users, todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          { !!todos.length && (
          <TodoList
            todosFromServer={todos}
            chooseUser={this.chooseUser}
          />
          )
          }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={users.find(user => user.id === selectedUserId)}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
