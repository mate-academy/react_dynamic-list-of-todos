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
    originalTodos: [],
    isLoading: false,
    isLoaded: false,
    errors: '',
    countTryConnect: 0,
  };

  handleData = async () => {
    this.setState({
      isLoading: true,
      errors: '',
    });

    try {
      const [todosResponse, usersResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/todos'),
        fetch('https://jsonplaceholder.typicode.com/users'),
      ]);

      const todos = await todosResponse.json();
      const users = await usersResponse.json();
      const todosWithUsers = getTodosWithUsers(todos, users);

      this.setState({
        todos: [...todosWithUsers],
        originalTodos: [...todosWithUsers],
        isLoading: false,
        isLoaded: true,
        countTryConnect: 0,
      });
    }
    catch (error) {
      this.setState(prevState => ({
        errors: error.message,
        countTryConnect: prevState.countTryConnect + 1,
        isLoaded: false,
        isLoading: false,
      }));
    }
  }

  render() {
    const { todos,
      isLoading,
      isLoaded,
      errors,
      countTryConnect,
    } = this.state;

    return (
      <>
        <h1 className="app__title">Static list of todos</h1>
        {!todos.length && !isLoading
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

        {isLoaded && <TodoList todos={todos} />}
      </>
    );
  }
}

export default App;
