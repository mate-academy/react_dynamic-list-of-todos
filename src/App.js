import React from 'react';
import './App.css';

import { getTodos, getUsers} from './api/data';
import TodoList from './components/TodoList';

const getData = async () => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    };
  });
};

const getSortedTodos = ({ todos, sortField }) => {
 let callback = (typeof todos[0][sortField] === 'string')
  ? (todoA, todoB) => todoA[sortField].localeCompare(todoB[sortField])
  : (todoA, todoB) => todoA[sortField] - todoB[sortField]

  if (sortField === 'user') {
    callback = (todoA, todoB) => todoA.user.name.localeCompare(todoB.user.name)
    }

  return todos.sort(callback);
};


class App extends React.Component {

  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
    sortField: 'id',
  };

  loadData = async () => {
    const todos = await getData();
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoading: false,
        isLoaded: true,
        todos: todos,
      });
    }, 2000);

  };

  sortBy = (sortField) => {
    const sortedTodos = getSortedTodos({
      todos: this.state.todos,
      sortField,
    });
    this.setState({
      todos: sortedTodos,
      sortField,
    });
  };

  render() {
    const { todos, isLoaded, isLoading } = this.state;
    return (
      <main>
        <div className='center'>
          <h1>List of Todos</h1>
          {isLoaded ? (
            <div>
              <h2>({todos.length} items)</h2>
              <button onClick={() => this.sortBy('id')}>
                Sort by ID
              </button>

              <button onClick={() => this.sortBy('completed')}>
                Sort by status
              </button>

              <button onClick={() => this.sortBy('title')}>
                Sort by Title
              </button>

              <button onClick={() => this.sortBy('user')}>
                Sort by User
              </button>

              <TodoList todos={todos} />
            </div>
          ) : (
              <div>
                <h2>({todos.length} items)</h2>
                <button onClick={this.loadData}>
                  {isLoading ? 'Loading...' : 'Load'}
                </button>
              </div>
            )}
        </div>
      </main>
    );
  }
}

export default App;
