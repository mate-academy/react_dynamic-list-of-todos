import React from 'react';

import './App.scss';
import './styles/general.scss';

import { getTodos } from './api/todos';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    this.loadTodoList();
  }

  shuffleTodos = (arr) => {
    const todosSortRandom = [...arr]
      .sort(() => Math.round(Math.random() * 100) - 50);

    this.setState({
      todos: todosSortRandom,
    });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  loadTodoList = async() => {
    const prepearedTodoList = await getTodos();

    this.setState({
      todos: prepearedTodoList.data,
    });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            userId={selectedUserId}
            shuffleTodos={this.shuffleTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
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
