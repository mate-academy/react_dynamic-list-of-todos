import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    todosFromServer: [],
    selectedUserId: 0,
    person: [],
  };

  componentDidMount() {
    getTodos()
      .then((result) => {
        this.setState({
          todos: result.filter(elem => elem.title !== null),
          todosFromServer: result.filter(elem => elem.title !== null),
        });
      });
  }

  componentDidUpdate() {
    if (this.state.selectedUserId !== 0
      && this.state.selectedUserId
      && this.state.selectedUserId !== this.state.person.id) {
      getUsers(this.state.selectedUserId)
        .then((user) => {
          this.setState({
            person: user,
          });
        });
    }
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
      person: [],
    });
  }

  filterTodo = (target) => {
    this.setState(state => ({
      todos: state.todosFromServer.filter(elem => (elem.title
        ? elem.title.includes(target)
        : '')),
    }));
  }

  sortedTodos = (target) => {
    switch (target) {
      case 'all':
        this.setState(state => ({
          todos: state.todosFromServer,
        }));
        break;
      case 'active':
        this.setState(state => ({
          todos: state.todosFromServer.filter(elem => !elem.completed),
        }));
        break;
      case 'completed':
        this.setState(state => ({
          todos: state.todosFromServer.filter(elem => elem.completed),
        }));
        break;
      default:
    }
  }

  render() {
    const { todos, selectedUserId, person } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            getUserId={this.selectUser}
            sortedTodos={this.sortedTodos}
            filterTodo={this.filterTodo}
          />
        </div>

        <div className="App__content">
          {selectedUserId ? (
            <CurrentUser
              {...person}
              clearUser={this.clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
