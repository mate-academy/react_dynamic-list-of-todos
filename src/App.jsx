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
    filterByTitle: '',
    filterByCompleted: '',
  };

  async componentDidMount() {
    const todos = await getTodos();
    const users = await getUsers();

    this.setState({
      todos,
      users,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
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
    const { todos, users, selectedUserId, filterByTitle,
      filterByCompleted } = this.state;

    let filtredTodos = todos
      .filter(todo => todo.title)
      .filter(todo => todo.userId)
      .filter(todo => users.find(user => user.id === todo.userId))
      .map(todo => ({
        ...todo,
        completed: !todo.completed ? false : todo.completed,
      }))
      .filter(todo => (
        filterByTitle ? todo.title.includes(filterByTitle) : true
      ));

    if (filterByCompleted.length > 0) {
      filtredTodos = filtredTodos.filter(todo => (
        filterByCompleted === 'complete'
          ? !todo.completed
          : todo.completed
      ));
    }

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
                  name="filterByTitle"
                  type="text"
                  value={filterByTitle}
                  onChange={this.handleChange}
                />
              </label>
              <select
                name="filterByCompleted"
                type="text"
                value={filterByCompleted}
                onChange={this.handleChange}
              >
                <option value="">All</option>
                <option value="complete">Active</option>
                <option value="uncomplete">Completed</option>
              </select>
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
