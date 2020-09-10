import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todosFromServer: [],
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todo) => {
        this.setState({
          todosFromServer: todo.filter(elem => elem.title),
          todos: todo.filter(elem => elem.title),
        });
      });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
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
    const { todos, selectedUserId } = this.state;

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
              userId={selectedUserId}
              clearUser={this.clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
