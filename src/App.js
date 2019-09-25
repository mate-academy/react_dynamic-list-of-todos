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

  sortByCompleted = () => {
    this.setState(prevState => ({
      // eslint-disable-next-line max-len
      todos: prevState.todos.sort((a, b) => (a.completed < b.completed ? 1 : -1)),
    }));
  };

  sortByName = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => (a.user > b.user ? 1 : -1)),
    }));
  };

  sortByTitle = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => (a.title > b.title ? 1 : -1)),
    }));
  };

  getData = () => {
    this.setState({
      todos: [],
      isLoading: true,
      hasError: false,
    });

    getTodos().then((values) => {
      this.setState({
        todos: values,
      });
    });

    getUsers().then((values) => {
      this.setState({
        users: values,
      });
    });

    Promise.all([getTodos(), getUsers()])
      .then(() => {
        this.setState({
          isLoaded: true,
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
          <ToDoList
            todos={preparedTodos}
            sortByCompleted={this.sortByCompleted}
            sortByName={this.sortByName}
            sortByTitle={this.sortByTitle}
          />
        )}
      </div>
    );
  }
}

export default App;
