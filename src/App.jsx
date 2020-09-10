import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';


class App extends React.Component {
  state = {
    todos: [],
    prepearedTodos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos: todos.filter(todo => todo.title),
        prepearedTodos: todos,
      }));
  }

  nameFilter = (input) => {
    this.setState(state => ({
      todos: [...state.prepearedTodos].filter(todo => (todo.title
        ? todo.title.includes(input)
        : '')),
    }));
  }

  completedFilter = (input) => {
    switch (input) {
      case 'completed':
        this.setState(state => ({
          todos: [...state.prepearedTodos].filter(todo => todo.completed),
        }));
        break;

      case 'notCompleted':
        this.setState(state => ({
          todos: [...state.prepearedTodos].filter(todo => !todo.completed),
        }));
        break;

      default:
        this.setState(state => ({
          todos: [...state.prepearedTodos],
        }));
        break;
    }
  }

  selectUser = (userId) => {
    if (userId === this.state.selectedUserId) {
      return;
    }

    this.setState({
      selectedUserId: userId,
    });
  }

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            nameFilter={this.nameFilter}
            completedFilter={this.completedFilter}
            selectUser={this.selectUser}
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
