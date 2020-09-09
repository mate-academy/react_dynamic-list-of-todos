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
          todos: todos.data,
          preparedTodos: todos.data,
        })
      ));
  }

  componentDidUpdate = () => {
    if (this.state.selectedUserId !== 0
      && this.state.selectedUserId !== this.state.user.id) {
      getUser(this.state.selectedUserId)
        .then((user) => {
          this.setState({ user: user.data });
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
            onComplete={this.onComplete}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                onClear={this.onClear}
                user={user}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
