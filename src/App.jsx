import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    showError: false,
    completed: 'null',
    title: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    if (todos !== undefined) {
      const filteredTodos
      = todos.filter(
        todo => (todo.title && todo.userId && todo.compleated !== null),
      );

      this.setState({
        todos: filteredTodos,
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

  renderVisibleTodos = () => {
    const { todos, completed, title } = this.state;

    return todos
      .filter((todo) => {
        if (completed !== 'null') {
          return todo.completed === (completed === 'true');
        }

        return todo;
      })
      .filter(todo => todo.title.toLowerCase().includes(title));
  }

  render() {
    const { selectedUserId, completedFilter, titleFilter }
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
                  onChange={this.handleChange}
                >
                  <option value="null">All</option>
                  <option value>Completed</option>
                  <option value={false}>Active</option>
                </select>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={titleFilter}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.todos.length > 0 ? (
                <TodoList
                  todos={this.renderVisibleTodos()}
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
