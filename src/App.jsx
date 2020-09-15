import React, { Component } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { fetchTodos } from './api/api';

class App extends Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount = async() => {
    const todos = await fetchTodos();

    this.setState({
      todos: todos.filter(todo => todo.title && todo.userId && todo.id),
    });
  }

  setUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === +id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return { ...todo };
      }),
    }));
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            setUser={this.setUser}
            changeStatus={this.changeStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
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
