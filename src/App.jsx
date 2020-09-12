import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    preparedTodos: [],
    user: [],
  };

  componentDidMount = async() => {
    const todos = await getTodos();

    this.setState({
      todos: todos.data.filter(todo => todo.userId),
      preparedTodos: todos.data.filter(todo => todo.userId),
    });
  }

  componentDidUpdate = () => {
    if (this.state.selectedUserId !== 0
      && this.state.selectedUserId !== this.state.user.id
      && this.state.selectedUserId) {
      getUser(this.state.selectedUserId)
        .then((user) => {
          if (user.data !== null) {
            this.setState({ user: user.data });
          } else {
            this.setState(state => ({ user: {
              id: state.selectedUserId,
              name: 'No name',
              email: 'No email',
              phone: 'No phone',
            } }));
          }
        });
    }
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  onClear = () => {
    this.setState({
      user: [],
      selectedUserId: 0,
    });
  }

  findTodo = (query) => {
    this.setState(state => ({
      preparedTodos: [...state.todos].filter(todo => (todo.title
        ? todo.title.includes(query)
        : '')),
    }));
  }

  filterByCompleted = (event) => {
    switch (event.target.value) {
      case 'completed':
        this.setState(state => ({
          preparedTodos: [...state.todos].filter(todo => todo.completed),
        }));
        break;
      case 'active':
        this.setState(state => ({
          preparedTodos: [...state.todos].filter(todo => !todo.completed),
        }));
        break;
      default:
        this.setState(state => ({
          preparedTodos: [...state.todos],
        }));
    }
  }

  render() {
    const { selectedUserId, preparedTodos, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            selectUser={this.selectUser}
            findTodo={this.findTodo}
            filterByCompleted={this.filterByCompleted}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && user ? (
              <CurrentUser
                {...user}
                onClear={this.onClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
