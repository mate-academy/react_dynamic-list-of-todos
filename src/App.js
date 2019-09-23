import React from 'react';
import './App.css';

import TodoList from './components/TodoList/TodoList';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    error: null,
    isShowButton: true,
  }

  loadTodos = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(TODOS_URL),
      fetch(USERS_URL),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        todos: data1,
        users: data2,
        isLoading: false,
        isShowButton: false,
      }))
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  }

  render() {
    const {
      todos, users, isLoading, error, isShowButton,
    } = this.state;
    const preparedTodos = getTodosWithUsers(todos, users);

    if (isLoading) {
      return <div>...Loading</div>;
    }

    if (error) {
      return <div>{`Error: ${error.message} data`}</div>;
    }

    return (
      <div className="App todo-list">
        {isShowButton && (
          <button
            type="button"
            onClick={this.loadTodos}
          >
            Load
          </button>
        )}
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
