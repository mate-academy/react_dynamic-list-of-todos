import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    preparedTodos: [],
    selectedUserId: 0,
    user: [],
  };

  componentDidMount = () => {
    getTodos()
      .then(todos => (
        this.setState({
          todos: todos.data
            .filter(todo => todo.userId),
          preparedTodos: todos.data
            .filter(todo => todo.userId),
        })
      ));
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

  filterByTitle = (query) => {
    this.setState(state => ({
      preparedTodos: [...state.todos].filter(todo => (todo.title
        ? todo.title.includes(query)
        : '')),
    }));
  }

  filterByCompleted = (event) => {
    if (event.target.value === 'completed') {
      this.setState(state => ({
        preparedTodos: [...state.todos].filter(todo => todo.completed),
      }));
    } else if (event.target.value === 'active') {
      this.setState(state => ({
        preparedTodos: [...state.todos].filter(todo => !todo.completed),
      }));
    } else {
      this.setState(state => ({
        preparedTodos: [...state.todos],
      }));
    }
  }

  render() {
    const { preparedTodos, selectedUserId, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            selectUser={this.selectUser}
            filterByTitle={this.filterByTitle}
            filterByCompleted={this.filterByCompleted}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && user ? (
              <CurrentUser
                onClear={this.onClear}
                {...user}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
