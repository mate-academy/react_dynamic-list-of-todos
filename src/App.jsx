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
    filterBy: '',
  };

  async componentDidMount() {
    const todos = await getTodos();
    const users = await getUsers();

    this.setState({
      todos,
      users,
    });
  }

  handleFilterChange = (event) => {
    this.setState({
      filterBy: event.target.value,
    });
  }

  chooseUser = (currentUserId) => {
    this.setState({
      selectedUserId: currentUserId,
    });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, users, selectedUserId, filterBy } = this.state;

    const filtredTodos = todos
      .filter(todo => todo.title)
      .filter(todo => todo.userId)
      .filter(todo => users.find(user => user.id === todo.userId))
      .map(todo => ({
        ...todo,
        completed: !todo.completed ? false : todo.completed,
      }))
      .filter(todo => (filterBy ? todo.title.includes(filterBy) : true));

    const filtredUsers = users
      .map(user => ({
        ...user,
        name: !user.name ? 'No name' : user.name,
        email: !user.email ? 'No email' : user.email,
        phone: !user.phone ? 'No phone' : user.phone,
      }));

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0
          && (
            <>
              <label>
                Filter:
                <input
                  name="filterBy"
                  type="text"
                  value={this.state.filterBy}
                  onChange={this.handleFilterChange}
                />
              </label>
              <TodoList
                todos={filtredTodos}
                chooseUser={this.chooseUser}
              />
            </>
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                users={filtredUsers}
                selectedUserId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
