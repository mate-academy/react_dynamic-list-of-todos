import React from 'react';
import TodoList from './TodoList/TodoList';
import TodoFilter from './TodoFilter/TodoFilter';
import getTodosWithUsers from './utils/getTodosWithUsers';
import fetchData from './utils/fetchData';

const API_URL = `https://jsonplaceholder.typicode.com`;

class App extends React.Component {
  state = {
    todosList: [],
    isLoading: false,
    hasError: false,
  };

  loadData = async() => {
    this.setState({ isLoading: true, hasError: false });

    try {
      const todos = await fetchData(`${API_URL}/todos`);
      const users = await fetchData(`${API_URL}/users`);
      const preparedTodos = getTodosWithUsers(todos, users);
      this.setState({ todosList: preparedTodos });
    } catch (e) {
      this.setState({ hasError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFilterTodo = (filterValue) => {
    this.setState({ filter: filterValue });
  };

  getFilteredTodos = (todosList, filter) => {
    switch (filter) {
      case 'active':
        return todosList.filter(todo => !todo.completed);
      case 'completed':
        return todosList.filter(todo => todo.completed);
      default:
        return todosList;
    }
  };

  render() {
    const {
      todosList, isLoading, hasError, filter,
    } = this.state;

    const filteredTodoList = filter
      ? this.getFilteredTodos(todosList, filter)
      : todosList;

    const loadBtn = isLoading
      ? (
        <button type="button" className="btn btn-info" disabled>
         Loading...
        </button>
      )
      : (
        <button
          type="button"
          className="btn btn-info"
          onClick={this.loadData}
        >
         Load
        </button>
      );

    return (
      <div className="App">
        <h1 className="text-center">Dynamic list of todos</h1>
        <div className="container text-center">
          <div className="todo-list">

            {hasError ? <div>Error occurred!</div> : ''}

            {todosList.length === 0 ? loadBtn
              : (
                <>
                  <TodoFilter onFilterClick={this.handleFilterTodo} />
                  <TodoList todos={filteredTodoList} />
                </>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
