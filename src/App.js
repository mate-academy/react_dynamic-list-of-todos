import React from 'react';
import Buttons from './components/Buttons';
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

    this.sortByName = this.sortByName.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByCompleted = this.sortByCompleted.bind(this);
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
    console.log(todosWithUsers);

    this.setState({
      todos: todosWithUsers,
      sortedTodos: todosWithUsers,
      isLoaded: true,
      isLoading: false,
    });
  }

  sortByName(name) {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      sortedTodos: [...state.todos].sort((a, b) => (
        state.direction * (a.user[name].localeCompare(b.user[name]))
      )),
    }));
  }

  sortByTitle(title) {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      sortedTodos: [...state.todos].sort((a, b) => (
        state.direction * (a[title].localeCompare(b[title]))
      )),
    }));
  }

  sortByCompleted(completed) {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      sortedTodos: [...state.todos].sort((a, b) => (
        state.direction * (a[completed] - (b[completed]))
      )),
    }));
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <Buttons
            sortByName={this.sortByName}
            sortByTitle={this.sortByTitle}
            sortByCompleted={this.sortByCompleted}
          />
          <TodoList
            todosItems={this.state.sortedTodos}
          />
        </div>
      );
    }
    return (
      <div className="button_load">
        <button className="button" onClick={this.LoadData} type="button">
          {this.state.isLoading ? 'Loading...' : 'Load'}
        </button>
      </div>
    );
  }
}

export default App;
