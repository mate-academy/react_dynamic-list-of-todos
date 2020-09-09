import React from 'react';
import './App.scss';
import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todosFromServer: [],
    todos: [],
    selectedUserId: 0,
    selectedUser: {},
  };

  componentDidMount() {
    getTodos().then((list) => {
      const initialTodos = list.data.filter(todo => todo.title);

      this.setState({
        todosFromServer: initialTodos,
        todos: initialTodos,
      });
    });
  }

  setUser = (userId) => {
    if (userId === this.state.selectedUserId) {
      return;
    }

    getUser(userId).then(user => this.setState({
      selectedUser: user.data,
      selectedUserId: userId,
    }));
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0, selectedUser: {},
    });
  }

  filterByValue = (inputValue) => {
    this.setState(state => ({
      todos: state.todosFromServer.filter(
        todo => todo.title.includes(inputValue),
      ),
    }));
  }

  filterByStatus = (selectValue) => {
    switch (selectValue) {
      case 'all':
        this.setState(state => ({
          todos: state.todosFromServer,
        }));
        break;
      case 'active':
        this.setState(state => ({
          todos: state.todosFromServer.filter(todo => !todo.completed),
        }));
        break;
      case 'completed':
        this.setState(state => ({
          todos: state.todosFromServer.filter(todo => todo.completed),
        }));
        break;
      default:
    }
  }

  updateTodoStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== +id) {
          return { ...todo };
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));

    this.setState(state => ({
      todosFromServer: state.todos,
    }));
  }

  render() {
    const { todos, selectedUserId, selectedUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.setUser}
            handleInput={this.filterByValue}
            handleSelect={this.filterByStatus}
            checkTodo={this.updateTodoStatus}
          />
        </div>

        <div className="App__content">
          {selectedUserId ? (
            <CurrentUser
              user={selectedUser}
              handleClearButton={this.clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
