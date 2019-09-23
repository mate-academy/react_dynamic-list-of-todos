import React from 'react';
import './App.css';

import TodoList from './component/TodoList/TodoList';

const getTodosWithUsers = (todoList, userList) => (
  todoList.map(todo =>({
    ...todo,
    user: userList.find(user => user.id === todo.userId),
  }))
);

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    isLoaded: false,
    errors: '',
    countTryConnect: 0,
  };

  handleData = () => {
    this.setState({
      isLoading: true,
      errors: '',
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos'),
      fetch('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([todos, users]) => Promise.all([todos.json(), users.json()]))
      .then(([todosData, usersData]) => this.setState({
        todos: todosData,
        users: usersData,
        isLoading: false,
        isLoaded: true,
        countTryConnect: 0,
      }))
      .catch((error) => {
        this.setState(prevState => ({
          errors: error.message,
          countTryConnect: prevState.countTryConnect + 1,
          isLoaded: false,
          isLoading: false,
        }));
      });
  }

  render() {
    const { todos,
      users,
      isLoading,
      isLoaded,
      errors,
      countTryConnect,
    } = this.state;
    const todosWithUsers = getTodosWithUsers(todos, users);

    return (
      <>
        <h1 className="app__title">Static list of todos</h1>
        {!todos.length && !users.length && !isLoading
          && <button
            type="button"
            className="app__button-load"
            onClick={this.handleData}
          >
              Load todos
          </button>
        }

        {isLoading
          && (
            <div className="app__loading">
              <span>Loading...</span>
            </div>
          )
        }

        {errors
          && (
            <div className="app__error-message">
              <p>
                {`Error: ${errors} date`}
              </p>
              <p>
                {`Try to connect: ${countTryConnect}`}
              </p>
            </div>
          )
        }

        {isLoaded && <TodoList todoList={todosWithUsers} />}
      </>
    );
  }
}

export default App;
