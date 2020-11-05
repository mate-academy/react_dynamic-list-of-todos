import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos: this.validateTodos(todos),
      filteredTodos: this.validateTodos(todos),
    });
  }

  validateTodos = todos => todos.filter(todo => (
    todo.id
      && todo.userId
      && todo.title
      && typeof todo.completed === 'boolean'
  ))

  selectUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  filterTodosByTitle = (value) => {
    this.setState(prevState => ({
      filteredTodos: [...prevState.todos]
        .filter(todo => todo.title.includes(value)),
    }));
  }

  filterTodosByStatus = (value) => {
    if (value === 'completed') {
      this.setState(prevState => ({
        filteredTodos: [...prevState.todos]
          .filter(todo => todo.completed === true),
      }));

      return;
    }

    if (value === 'active') {
      this.setState(prevState => ({
        filteredTodos: [...prevState.todos]
          .filter(todo => todo.completed === false),
      }));

      return;
    }

    this.setState(prevState => ({
      filteredTodos: [...prevState.todos],
    }));
  }

  shuffleTodos = () => {
    this.setState(prevState => ({
      filteredTodos: [...prevState.filteredTodos]
        .sort(() => Math.random() - 0.5),
    }));
  }

  render() {
    const { filteredTodos, selectedUserId, query } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            selectUser={this.selectUser}
            filterTodosByTitle={this.filterTodosByTitle}
            filterTodosByStatus={this.filterTodosByStatus}
            shuffleTodos={this.shuffleTodos}
            title={query}
          />
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
