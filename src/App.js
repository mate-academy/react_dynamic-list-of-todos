import React from 'react';
import './App.css';

import { getTodosFromServer } from './api/todos';
import { getUsersFromServer } from './api/users';

import TodoList from './TodoList';

class App extends React.Component {
  state = {
    todosWithUsers: [],
    isLoading: false,
    isStarted: false,
  };

  loadTodos = async() => {
    this.setState({
      isLoading: true,
      isStarted: true,
    });

    const todos = await getTodosFromServer();

    const users = await getUsersFromServer();

    this.setState({
      isLoading: false,
      isStarted: true,
      todosWithUsers: todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
    });
  };

  sortByTitle = () => {
    this.setState(state => ({
      todosWithUsers: [...state.todosWithUsers]
        .sort((a, b) => a.title.localeCompare(b.title)),
    }));
  };

  sortByLength = () => {
    this.setState(state => ({
      todosWithUsers: [...state.todosWithUsers]
        .sort((a, b) => a.title.length - b.title.length),
    }));
  };

  render() {
    const { todosWithUsers, isLoading } = this.state;

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="App">
        <h1 className="title">Dynamic List of Todos</h1>

        <section>
          {this.state.isStarted ? (
            <>
              <button
                type="button"
                className="button"
                onClick={this.sortByTitle}
              >
              Sort Todos
              </button>

              <button
                type="button"
                className="button"
                onClick={this.sortByLength}
              >
              Sort Todos Length
              </button>
            </>
          ) : (
            <button
              type="button"
              className="button"
              onClick={this.loadTodos}
            >
              Load
            </button>
          )}

          {todosWithUsers.length > 0 && <TodoList todos={todosWithUsers} />}
        </section>
      </div>
    );
  }
}

export default App;
