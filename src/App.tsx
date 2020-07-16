import React from 'react';
import './App.css';
import { Todo, User } from './components/Interfaces';
import { getData } from './api/getData';
import { TodoList } from './components/TodoList';

type State = {
  todos: Todo[];
  isLoading: boolean;
  filterBy: string;
};

class App extends React.Component<{}, State, Todo[]> {
  todosCopy: Todo[];

  constructor() {
    super({});

    this.todosCopy = [];
  }

  state: State = {
    todos: [],
    isLoading: false,
    filterBy: '',
  };

  loadTodos = () => {
    const API_TODOS = 'https://mate.academy/students-api/todos';
    const API_USERS = 'https://mate.academy/students-api/users';
    let users: User[];

    this.setState({
      isLoading: true,
    });

    getData<User>(API_USERS)
      .then((usersFromServer: User[]) => {
        users = usersFromServer;
      });

    getData<Todo>(API_TODOS)
      .then((todosFromServer: Todo[]) => {
        this.setState({
          todos: todosFromServer.map((todo) => {
            const todoCopy = { ...todo };
            const userForTodo = users.find(user => user.id === todo.userId);

            todoCopy.userName = userForTodo ? userForTodo.name : '';

            return todoCopy;
          }),
          isLoading: false,
        },
        () => {
          this.todosCopy = [...this.state.todos];
        });
      });
  };

  handleFilter = (value: string) => {
    if (value === 'title') {
      this.setState({
        todos: this.todosCopy.sort((a, b) => a.title.localeCompare(b.title)),
        filterBy: value,
      });
    }

    if (value === 'userName') {
      this.setState({
        todos: this.todosCopy.sort((a, b) => {
          if (a.userName && b.userName) {
            return a.userName.localeCompare(b.userName);
          }

          return 0;
        }),
        filterBy: value,
      });
    }

    if (value === 'completed') {
      this.setState({
        todos: this.todosCopy.sort((a, b) => {
          if (a.completed === b.completed) {
            return 0;
          }

          if (a.completed) {
            return -1;
          }

          return 1;
        }),
        filterBy: value,
      });
    }
  };

  render() {
    const { todos, isLoading } = this.state;

    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (todos.length === 0) {
      return (
        <button
          type="button"
          onClick={this.loadTodos}
        >
          Load todos
        </button>
      );
    }

    return (
      <div>
        <select
          name="filterBy"
          value={this.state.filterBy}
          onChange={event => this.handleFilter(event.target.value)}
        >
          <option value="title">Title</option>
          <option value="completed">Completed</option>
          <option value="userName">User name</option>
        </select>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
