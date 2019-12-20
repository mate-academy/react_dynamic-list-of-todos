import React from 'react';
import './App.css';
import { getTodos } from './todo';
import { getUsers } from './user';
import TodoList from './TodoList';

class App extends React.Component {
  state = {
    usersWithTodos: [],
    isLoading: false,
    isStart: false,
  }

  loadUsersAndTodos = async() => {
    this.setState({
      isLoading: true,
      isStart: true,
    });

    const [todos, users] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    this.setState({
      isLoading: false,
      usersWithTodos: todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
    });
  };

  render() {
    const { usersWithTodos, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        {this.state.isStart ? (
          <section>
            <button
              onClick={() => this.setState({
                usersWithTodos: [...usersWithTodos]
                  .sort((a, b) => a.title.localeCompare(b.title))
              })}
              type="button"
            >
              Sort title
            </button>
            <button
              onClick={() => this.setState({
                usersWithTodos: [...usersWithTodos]
                .sort((a, b) => (a.user.username.localeCompare(b.user.username)))
              })}
              type="button"
            >
              Sort name
            </button>
            <button
              onClick={() => this.setState({
                usersWithTodos: [...usersWithTodos]
                  .sort((a, b) => (b.id - a.id))
              })}
              type="button"
            >
              Sort id
            </button>
          </section>
        ) :(
          <button
            onClick={this.loadUsersAndTodos}
            type="button"
          >
              Load
          </button>
        )}

        <TodoList todos={usersWithTodos} />
      </div>
    );
  }
}

export default App;

