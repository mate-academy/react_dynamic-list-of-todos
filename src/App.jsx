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
  };

  async componentDidMount() {
    const todos = await getTodos();
    const filteredTodos
      = todos.filter(
        todo => (todo.title && todo.userId && todo.compleated !== null),
      );

    this.setState({ todos: filteredTodos });
  }

  setSelectedUser = (value) => {
    this.setState({ selectedUserId: value });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {this.state.todos.length > 0 ? (
            <TodoList
              todos={todos}
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
