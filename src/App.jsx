import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    title: '',
    status: 'All',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos: todos.filter(todo => todo.title && todo.userId),
      }));
  }

  setUserId = (id) => {
    this.setState({ selectedUserId: id });
  }

  setTitle = (title) => {
    this.setState({ title });
  }

  setStatus = (status) => {
    this.setState({ status });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: '',
    });
  }

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return { ...todo };
      }),
    }));
  }

  render() {
    const { todos, selectedUserId, title, status } = this.state;

    const todosByTitle = todos.filter(todo => todo.title.includes(title));

    let visibleTodos;

    switch (status) {
      case 'completed':
        visibleTodos = todosByTitle.filter(todo => todo.completed);
        break;

      case 'active':
        visibleTodos = todosByTitle.filter(todo => !todo.completed);
        break;
      default:
        visibleTodos = todosByTitle;
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            setUserId={this.setUserId}
            setTitle={this.setTitle}
            setStatus={this.setStatus}
            changeStatus={this.changeStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getUser={getUser}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
