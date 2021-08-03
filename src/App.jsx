import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    selectedUserId: 0,
    showError: false,
    completed: '',
    title: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    if (todos !== undefined) {
      const filteredTodos
      = todos.filter(
        todo => (todo.title && todo.userId && todo.compleated !== null),
      );

      console.log(filteredTodos);

      this.setState({
        todos: filteredTodos,
        filteredTodos,
      });
    } else {
      this.setState({ showError: true });
    }
  }

  setSelectedUser = (value) => {
    this.setState({ selectedUserId: value });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  filtered = (event) => {
    const { todos } = this.state;
    const { name, value } = event.target;

    if (value !== this.state[name] && name === 'title') {
      const filter
      = todos.filter(
        todo => todo[name].toLowerCase().includes(value.toLowerCase()),
      );

      this.setState({ filteredTodos: filter });
    }

    if (name === 'completed') {
      const filter
      = todos.filter(
        todo => todo.completed === value,
      );

      console.log(todos);

      this.setState({ filteredTodos: filter });
    }
  }

  render() {
    const { filteredTodos, selectedUserId, completedFilter, titleFilter }
      = this.state;

    return (
      <div className="App">
        {!this.state.showError ? (
          <>
            <div className="App__sidebar">
              <div>
                <select
                  name="completed"
                  id="completed"
                  value={completedFilter}
                  onChange={(event) => {
                    this.handleChange(event);
                    this.filtered(event);
                  }}
                >
                  <option value="">All</option>
                  <option value="true">Completed</option>
                  <option value="false">Active</option>
                </select>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={titleFilter}
                  onChange={(event) => {
                    this.handleChange(event);
                    this.filtered(event);
                  }}
                />
              </div>
              {this.state.todos.length > 0 ? (
                <TodoList
                  todos={filteredTodos}
                  selectedUser={selectedUserId}
                  setSelectedUser={this.setSelectedUser}
                />
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className="App__content">
              <div className="App__content-container">
                {selectedUserId ? (
                  <CurrentUser
                    userId={selectedUserId}
                    clearUser={this.setSelectedUser}
                  />
                ) : 'No user selected'}
              </div>
            </div>
          </>
        ) : (
          <p>Sorry, Error! Please reload page later!</p>
        )}
      </div>
    );
  }
}

export default App;
