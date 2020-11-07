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

    switch (value) {
      case 'completed':
        this.setState(prevState => ({
          filteredTodos: prevState.todos
            .filter(todo => todo.completed === true),
        }));
        break;

      case 'active':
        this.setState(prevState => ({
          filteredTodos: prevState.todos
            .filter(todo => todo.completed === false),
        }));
        break;

      default:
        this.setState(prevState => ({
          filteredTodos: prevState.todos,
        }));
    }
  }

  shuffleTodos = () => {
    this.setState((prevState) => {
      const shuffledTodos = [...prevState.filteredTodos];

      for (let i = shuffledTodos.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));

        [
          shuffledTodos[i],
          shuffledTodos[j],
        ] = [shuffledTodos[j], shuffledTodos[i]];
      }

      return {
        filteredTodos: shuffledTodos,
      };
    });
  }

  render() {
    const { filteredTodos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            selectUser={this.selectUser}
            filterTodosByTitle={this.filterTodosByTitle}
            filterTodosByStatus={this.filterTodosByStatus}
            shuffleTodos={this.shuffleTodos}
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
