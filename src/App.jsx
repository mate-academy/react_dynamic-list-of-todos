import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();
    const users = await getUsers();

    this.setState({
      todos,
      users,
    });
  }

  chooseUser = (currentUserId) => {
    this.setState({
      selectedUserId: currentUserId,
    });
  }

  render() {
    const { todos, users, selectedUserId } = this.state;
    const filtredTodos = todos
      .filter(todo => todo.title)
      .filter(todo => todo.userId)
      .map(todo => ({
        ...todo,
        completed: todo.completed === null ? false : todo.completed,
      }));
    const filtredUsers = users
      .filter(user => user.name)
      .filter(user => user.id);

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0
          && (
            <TodoList
              todos={filtredTodos}
              chooseUser={this.chooseUser}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                users={filtredUsers}
                selectedUserId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
