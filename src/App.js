import React from 'react';
import './App.css';

import TodoList from './component/TodoList/TodoList';

function getTodosWithUsers(todoList, userList) {
  return todoList.map(todo => {
    return (
      {
        ...todo,
        user: userList.find(user => user.id === todo.userId),
      }
    );
  });
}

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    isLoad: false,
    errors: '',
    countTryConnect: 0,
  };

  handleData = () => {
    this.setState({
      isLoading: true,
      errors: '',
    });

    setTimeout(() => Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos'),
      fetch('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([todos, users]) => Promise.all([todos.json(), users.json()]))
      .then(([todosData, usersData]) => this.setState({
        todos: todosData,
        users: usersData,
        isLoading: false,
        isLoad: true,
        countTryConnect: 0,
      }))
      .catch((error) => {
        this.setState(prevState => ({
          errors: error.message,
          countTryConnect: prevState.countTryConnect + 1,
          isLoad: false,
          isLoading: false,
        }));
      }), 500);
  }

  render() {
    const { todos,
      users,
      isLoading,
      isLoad,
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
            <div>
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

        {isLoad && <TodoList todoList={todosWithUsers} />}
      </>
    );
  }
}

export default App;
