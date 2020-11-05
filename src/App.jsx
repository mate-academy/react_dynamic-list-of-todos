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

    this.setState({
      todos: todos.filter(todo => todo.title !== '' && todo.userId !== null),
      allTodos: todos.filter(todo => todo.title !== '' && todo.userId !== null),
      isLoaded: true,
    });
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  filterUserByField = (value, field) => {
    this.setState(state => ({
      todos: [...state.allTodos].filter(todo => todo[field].includes(value)),
    }));
  }

  filterUserByCompleted = (value) => {
    if (value === 'all' || value === 'filter by status') {
      this.setState(state => ({
        todos: [...state.allTodos],
      }));

      return;
    }

    const filterValue = value === 'completed';

    this.setState(state => ({
      todos: [...state.allTodos].filter(todo => todo.completed === filterValue),
    }));
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
              filterUser={this.filterUserByField}
              filterUserByCompleted={this.filterUserByCompleted}
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
