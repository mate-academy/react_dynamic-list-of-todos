import React from 'react';
import User from './components/User';
import TodoList from './components/TodoList';
import './App.css';
import { getTodos, getUsers } from './components/dataComponents';

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

  handleClick = async() => {
    this.setState({
      isLoading: true,
    });
    const todos = await getTodos();
    const users = await getUsers();
    const result = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
    this.setState({
      todos: result,
      isLoading: false,
      isLoaded: true,
    });
  };

    sortName = () => {
      this.setState(prevState => ({
        todos:
          prevState.todos.sort((a, b) =>
            (a.user.username > b.user.username) ? 1 : -1),
      }));
    };

    sortComplete = () => {
      this.setState(prevState => ({
        todos:
          prevState.todos.sort((a, b) => (a.completed > b.completed) ? -1 : 1),
      }));
    };

    render() {
      const res = this.state.todos.map(todo => (
        <div key={todo.id} className="todo">
          <TodoList item={todo} />
          <User users={todo.user} />
        </div>
      ));
      if (!this.state.isLoaded) {
        return (
          <button
            type="submit"
            className="btn btn-success mt-5"
            onClick={this.handleClick}
            disabled={this.state.isLoading}
          >
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        );
      }

      return (
        <main className="App">
          <button
            type="submit"
            className="btn btn-primary mt-5 mb-5 mr-3"
            onClick={this.sortName}
          >
            sortName
          </button>
          <button
            type="submit"
            className="btn btn-primary mt-5 mb-5"
            onClick={this.sortComplete}
          >
            sortComplete
          </button>
          <div>{res}</div>
        </main>
      );
    }
}

export default App;
