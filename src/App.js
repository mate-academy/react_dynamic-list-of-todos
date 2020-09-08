import React from 'react';
import './App.scss';
import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    user: [],
    todosCopy: [],
  };

  componentDidMount = () => {
    getTodos()
      .then((todos) => {
        this.setState({
          todos: todos.data,
          todosCopy: todos.data,
        });
      });
  };

  componentDidUpdate = () => {
    if (this.state.selectedUserId !== 0
      && this.state.selectedUserId !== this.state.user.id) {
      getUser(this.state.selectedUserId)
        .then((user) => {
          this.setState({ user: user.data });
        });
    }
  }

  changeUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  changeInput = (val) => {
    this.setState(prevState => ({
      todosCopy: prevState.todos.filter(todo => (
        todo.title
          ? todo.title.includes(val)
          : ''
      )),
    }));
  }

  check = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      todosCopy: prevState.todosCopy.map(todo => ((todo.id !== Number(value))
        ? { ...todo }
        : {
          ...todo,
          completed: !todo.completed,
        })),
    }));
  }

  onClear = () => {
    this.setState({
      user: '',
      selectedUserId: 0,
    });
  }

  filterTodos = (event) => {
    switch (event.target.value) {
      case 'All':
        this.setState(state => ({
          todosCopy: [...state.todos],
        }));
        break;
      case 'Active':
        this.setState(state => ({
          todosCopy: [...state.todos.filter(todo => !todo.completed)],
        }));
        break;
      case 'Completed':
        this.setState(state => ({
          todosCopy: [...state.todos.filter(todo => todo.completed)],
        }));
        break;
      default:
        return false;
    }
  }

  render() {
    const { todosCopy, selectedUserId, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todosCopy}
            changeUser={this.changeUser}
            changeInput={this.changeInput}
            filterTodos={this.filterTodos}
            check={this.check}
          />
        </div>
        <div className="App__content">
          {selectedUserId ? (
            <CurrentUser
              user={user}
              onClear={this.onClear}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
