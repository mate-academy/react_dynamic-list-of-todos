import React from 'react';
import LIstHeaders from './components/LIstHeaders';
import TodoList from './components/TodoList';
import { loadTodos, loadUsers } from './api/dataOfUsersAndTodos';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      sortedTodos: [],
      isLoaded: false,
      isLoading: false,
      direction: 1,
    };
  }

  LoadData = async() => {
    this.setState({
      isLoading: true,
    });

    const users = await loadUsers();
    const todos = await loadTodos();

    const todosWithUsers = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({
      todos: todosWithUsers,
      sortedTodos: todosWithUsers,
      isLoaded: true,
      isLoading: false,
    });
  }

  sortByName = (name) => {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      sortedTodos: [...state.todos].sort((a, b) => (
        state.direction * (a.user[name].localeCompare(b.user[name]))
      )),
    }));
  }

  sortByTitle = (title) => {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      sortedTodos: [...state.todos].sort((a, b) => (
        state.direction * (a[title].localeCompare(b[title]))
      )),
    }));
  }

  sortByCompleted = (completed) => {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      sortedTodos: [...state.todos].sort((a, b) => (
        state.direction * (a[completed] - (b[completed]))
      )),
    }));
  }

  render() {
    const { isLoaded, sortedTodos, isLoading } = this.state;

    if (isLoaded) {
      return (
        <div>
          <LIstHeaders
            sortByName={this.sortByName}
            sortByTitle={this.sortByTitle}
            sortByCompleted={this.sortByCompleted}
          />
          <TodoList
            todosItems={sortedTodos}
          />
        </div>
      );
    }
    return (
      <div className="button_load">
        <button className="button" onClick={this.LoadData} type="button">
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      </div>
    );
  }
}

export default App;
