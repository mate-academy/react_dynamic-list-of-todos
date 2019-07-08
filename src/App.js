import React from 'react';
import TodoList from './TodoList';
import { getTodos, getUsers } from './getDataFromServer';

import './App.css';

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

  handleClick = async() => {
    const todos = await getTodos();
    const users = await getUsers();

    const todosWithUser = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        todos: todosWithUser,
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  render() {
    return (
      <section className="task-list middle">
        {this.state.isLoaded ? (
          <div className="todo__items">
            <h1>Todo List</h1>
            <TodoList
              items={this.state.todos}
            />
          </div>
        ) : (
          <div>
            <button className="todo__front" type="submit" onClick={this.handleClick}>
              {this.state.isLoading ? 'Loading...' : 'Load'}
            </button>
          </div>
        )}
      </section>
    );
  }
}

export default App;
