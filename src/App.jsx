import React from 'react';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTodoId: null,
    filter: 'all',
  };

  componentDidMount = async() => {
    const todos = await getTodos();

    this.setState({
      todos: todos.filter(todo => todo.title && todo.id && todo.userId),
    });
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

  clear = () => {
    this.setState({
      selectedUserId: 0,
      selectedTodoId: null,
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
      filter } = this.state;

    let filteredTodos = [];

    switch (filter) {
      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      default:
        filteredTodos = todos;
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
                clear={this.clear}
                selectedUserId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
