import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: null,
    error: false,
  };

  componentDidMount = async() => {
    try {
      await getAllTodos()
        .then((todos) => {
          this.setState({ todos: todos.data });
        });
    } catch (error) {
      this.setState({ error: true });
    }
  }

  onUserSelect = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  onUserClear = () => {
    this.setState({ selectedUserId: null });
  }

  render() {
    const { todos, selectedUserId, error } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onUserSelect={this.onUserSelect}
            todosLoaded={!error}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearUser={this.onUserClear}
                />
              )
              : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
