import React from 'react';

import { getTodos } from './api/api';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos: todos.data });
      });
  }

  handleCheck = (taskId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== taskId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  }

  handleSelect = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  handleClear = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onCheck={this.handleCheck}
            onSelect={this.handleSelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} onClear={this.handleClear} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
