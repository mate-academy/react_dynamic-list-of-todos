import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Loader } from './components/Loader';

class App extends React.Component {
  state = {
    allTodos: [],
    todos: [],
    selectedUserId: '',
    isLoaded: false,
  };

  async componentDidMount() {
    const todos = await getTodos();

    const validTodos = todos.filter(todo => todo.title && todo.userId);

    this.setState({
      todos: validTodos,
      allTodos: validTodos,
      isLoaded: true,
    });
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  filterTodosByTitle = (value, field) => {
    this.setState(state => ({
      todos: state.allTodos.filter(todo => todo[field].includes(value)),
    }));
  }

  filterTodosByStatus = (value) => {
    switch (value) {
      case 'all':
        this.setState(state => ({
          todos: [...state.allTodos],
        }));
        break;
      case 'completed':
        this.setState(state => ({
          todos: state.allTodos.filter(todo => todo.completed),
        }));
        break;
      case 'active':
        this.setState(state => ({
          todos: state.allTodos.filter(todo => !todo.completed),
        }));
        break;
      default:
        break;
    }
  }

  shuffle = () => {
    const { todos } = this.state;
    const shuffledTodos = [...todos];

    // eslint-disable-next-line no-plusplus
    for (let i = shuffledTodos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledTodos[i];

      shuffledTodos[i] = shuffledTodos[j];
      shuffledTodos[j] = temp;
    }

    this.setState({ todos: shuffledTodos });
  }

  render() {
    const { todos, selectedUserId, isLoaded } = this.state;

    return (
      <div className="App">
        {isLoaded ? (
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              selectUser={this.selectUser}
              filterUser={this.filterTodosByTitle}
              filterTodosByStatus={this.filterTodosByStatus}
              shuffle={this.shuffle}
            />
          </div>
        ) : <Loader />
        }

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId || 0}
                onClear={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
