import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { NavMenuTodo } from './components/NavMenuTodo';

import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos,
        });
      });
  }

  updateTodos = (newTodos) => {
    this.setState({
      todos: newTodos,
    });
  }

  updateSelectUserId = (value) => {
    this.setState({
      selectedUserId: value,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <NavMenuTodo
            todos={todos}
            updateSelectUserId={this.updateSelectUserId}
            updateTodos={this.updateTodos}
          />
          <TodoList
            todos={todos}
            updateSelectUserId={this.updateSelectUserId}
          />
        </div>

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
