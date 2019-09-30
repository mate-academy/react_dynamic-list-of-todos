import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TODO_API_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

const getTodos = () => fetch(TODO_API_URL)
  .then(response => response.json());

const getUsers = () => fetch(USERS_API_URL)
  .then(response => response.json());

class TodoList extends React.Component {
  state = {
    isLoading: false,
    todos: [],
    users: [],
    preparedTodos: [],
    isShowCompleted: false,
  };

  groupTodosWithUsers = () => {
    this.setState(prevState => ({
      preparedTodos: prevState.todos.map(todo => (
        {
          ...todo,
          user: prevState.users.find(({ id }) => id === todo.userId),
        }
      )),
    }));
  };

  loadData = async() => {
    this.setState({ isLoading: true });
    await Promise.all([
      getUsers().then((userList) => {
        this.setState({
          users: userList,
        });
      }),
      getTodos().then((todoList) => {
        this.setState({ todos: todoList });
      }),
    ])
      .then(() => {
        this.groupTodosWithUsers();
        this.setState({ isLoading: false });
      });
  };

  handleClick = () => {
    this.loadData();
  };

  toggleShowCompleted = () => {
    this.setState(prevState => ({
      isShowCompleted: !prevState.isShowCompleted,
    }));
  };

  filterTodos = (preparedTodos) => {
    if (this.state.isShowCompleted) {
      return preparedTodos.filter(todo => todo.completed);
    }

    return preparedTodos;
  };

  render() {
    const { isLoading } = this.state;
    const preparedTodos = this.filterTodos(this.state.preparedTodos);

    if (preparedTodos.length === 0) {
      return (
        <button
          className="loading-button"
          type="button"
          onClick={this.handleClick}
          disabled={isLoading}
        >
          {!this.state.isLoading ? 'Load' : 'Loading'}
        </button>
      );
    }

    return (
      <>
        <button
          className="btn-completed"
          type="button"
          onClick={this.toggleShowCompleted}
        >
          {!this.state.isShowCompleted ? 'Show completed only' : 'Show all'}
        </button>
        <div className="todo-list">
          {preparedTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </div>
      </>
    );
  }
}

export default TodoList;
