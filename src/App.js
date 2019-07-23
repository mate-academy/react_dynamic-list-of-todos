import React from 'react';
import './App.css';
import TodoList from './TodoList';
import { getTodos, getUsers } from './getData';

const getData = async() => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};

let currentKey = '';
let currentTodos = [];
let sortedTodos = [];

const getSortedTodos = ({ todos, sortField }) => {
  if (currentKey === sortField && currentTodos === todos) {
    return sortedTodos.reverse();
  }

  currentKey = sortField;
  currentTodos = todos;
  const callbackMap = {
    id: (a, b) => a.id - b.id,
    completed: (a, b) => a.completed - b.completed,
    title: (a, b) => a.title.localeCompare(b.title),
    user: (a, b) => a.user.name.localeCompare(b.user.name),
  };
  const callback = callbackMap[sortField];
  sortedTodos = [...todos].sort(callback);
  return sortedTodos;
};

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
    isLoaded: false,
    isLoading: false,
    sortField: 'id',
    disabled: false,
  };

  handlerClick = async() => {
    this.setState({
      isLoading: true,
      disabled: true,
    });
    setTimeout(() => {
      this.setState({
        isLoaded: true,
      });
    }, 2000);
    this.loadData();
  };

  loadData = async() => {
    const todos = await getData();
    this.state.todos = todos;
    this.setState(prevState => ({
      visibleTodos: getSortedTodos(prevState),
      isLoading: true,
    }));
  };

  sortBy = (sortField) => {
    this.setState({
      sortField,
    });
    this.setState(prevState => ({
      visibleTodos: getSortedTodos(prevState),
    }));
  };

  render() {
    const { visibleTodos, isLoading, isLoaded, disabled } = this.state;

    return (
      <main className="main">
        {
          (!isLoaded)
            ? (
              <button
                onClick={this.handlerClick}
                className="main__button"
                type="button"
                disabled={disabled}
              >
                {isLoading ? 'Loading...' : 'Load'}
              </button>
            ) : (
              <>
                <h1>Todos List</h1>
                <TodoList
                  todos={visibleTodos}
                  onSortBy={this.sortBy}
                />
              </>
            )
        }
      </main>
    );
  }
}

export default App;
