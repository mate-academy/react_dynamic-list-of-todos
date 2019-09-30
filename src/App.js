import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList/ToDoList';

const getTodos = () => fetch(`https://jsonplaceholder.typicode.com/todos`)
  .then(response => response.json());

const getUsers = () => fetch(`https://jsonplaceholder.typicode.com/users`)
  .then(response => response.json());

function getTodosWithUsers(todos, users) {
  return todos.map(item => ({
    ...item,
    user: users.find(person => person.id === item.userId),
  }));
}

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  };

  getData = () => {
    this.setState({
      todos: [],
      isLoading: true,
      hasError: false,
    });

    Promise.all([getTodos(), getUsers()])
      .then(([todos, users]) => {
        this.setState({
          isLoaded: true,
          users,
          todos,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  sotring = (event) => {
    const { value } = event.target;

    this.setState((prevState) => {
      switch (value) {
        case 'name': return {
          todos: prevState.todos.sort((a, b) => (a.user > b.user ? 1 : -1)),
        };
        case 'title': return {
          todos: prevState.todos.sort((a, b) => (a.title > b.title ? 1 : -1)),
        };
        case 'completed': return {
          todos: prevState.todos.sort(
            (a, b) => (a.completed < b.completed ? 1 : -1)
          ),
        };
        default:
          return 0;
      }
    });
  };

  render() {
    const {
      todos,
      users,
      isLoading,
      hasError,
      isLoaded,
    } = this.state;

    const preparedTodos = getTodosWithUsers(todos, users);

    return (
      <div className="main">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {todos.length}
          <br />
          <span>Users: </span>
          {users.length}
        </p>
        {!todos.length && !users.length && !isLoading && !hasError && (
          <button
            type="button"
            onClick={this.getData}
          >
            Load todos
          </button>
        )}
        {isLoading && (
          <div>
            <span>Loading...</span>
          </div>
        )}
        {hasError && (
          <>
            <h3>Error loading:(</h3>
            <button
              type="button"
              onClick={this.getData}
            >
              You need try again
            </button>
          </>
        )}
        {isLoaded && (

          <>
            <button
              type="submit"
              value="name"
              onClick={this.sotring}
            >
          Sort by Name
            </button>
            <button
              type="submit"
              value="title"
              onClick={this.sotring}
            >
          Sort by Title
            </button>
            <button
              type="submit"
              value="completed"
              onClick={this.sotring}
            >
          Sort by Completed
            </button>
            <ToDoList
              todos={preparedTodos}
            />
          </>

        )}
      </div>
    );
  }
}

export default App;
