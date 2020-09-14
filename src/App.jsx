/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    prevTodos: [],
    selectedUserId: undefined,
    selectedTodoId: null,
    currentUser: {},
    filter: 'all',
  };

  componentDidMount = async() => {
    const todos = await getTodos();

    this.setState({
      todos: todos.filter(todo => todo.title && todo.id && todo.userId),
    });
  }

  componentDidUpdate = async() => {
    if (this.state.currentUser.id !== this.state.selectedUserId) {
      const user = await getUser(this.state.selectedUserId);

      this.updateUser(user.data);
    }
  }

  checkboxChange = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === +id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return { ...todo };
      }),
    }));
  }

  handleClick = (selectedUserId, selectedTodoId) => {
    this.setState({
      selectedUserId,
      selectedTodoId,
    });
  }

  updateUser = (currentUser) => {
    this.setState({ currentUser });
  }

  clear = () => {
    this.setState({
      selectedUserId: undefined,
      selectedTodoId: null,
      currentUser: {},
    });
  }

  todoFilterText = async(text) => {
    const todos = await getTodos();

    this.setState({
      todos: todos.filter(todo => (
        todo.title && todo.title.includes(text))),
    });
  }

  todoFilterComplete = (filter) => {
    this.setState({ filter });
  }

  render() {
    const { todos,
      selectedUserId,
      selectedTodoId,
      currentUser,
      filter } = this.state;

    let filteredTodos = [];

    if (filter) {
      if (filter === 'all') {
        filteredTodos = todos;
      } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
      } else if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
      }
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            checkboxChange={this.checkboxChange}
            selectedUserId={selectedUserId}
            selectedTodoId={selectedTodoId}
            handleClick={this.handleClick}
            todoFilter={this.todoFilterText}
            todoFilterComplete={this.todoFilterComplete}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={currentUser}
                clear={this.clear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
