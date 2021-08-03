import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getAll } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  setTodos = (callback) => {
    callback().then(todos => this.setState({ todos }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} />
        </div>
        <button
          type="button"
          onClick={() => this.setTodos(getAll)}
        >
          click
        </button>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
