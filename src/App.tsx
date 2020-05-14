import React, { FC, useState, MouseEvent } from 'react';
import { getPreparedTodos } from './api/api';
import { TodoList } from './components/TodoList';
import './App.css';

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadHandler = () => {
    setIsLoading(true);

    getPreparedTodos().then(todosWithUsers => {
      setTodos(todosWithUsers);
    });
  };

  const sortTodos = (todosList: TodoWithUser[], sortBy: string) => {
    switch (sortBy) {
      case 'name': {
        return todosList.sort((todoA, todoB) => (
          todoA.user.name.localeCompare(todoB.user.name)
        ));
        break;
      }

      case 'title': {
        return todosList.sort((todoA, todoB) => (
          todoA.title.localeCompare(todoB.title)
        ));
        break;
      }

      case 'completed': {
        return todosList.sort((todoA, todoB) => (+todoA.completed - +todoB.completed));
        break;
      }

      default: return todosList;
    }
  };

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const sortedTodos = sortTodos([...todos], event.currentTarget.name);

    setTodos(sortedTodos);
  };

  if (!todos.length) {
    return (
      <div className="container">
        <h1>Dynamic list of TODOs</h1>
        <button
          className="btn btn-primary btn-lg"
          type="button"
          disabled={isLoading}
          onClick={loadHandler}
        >
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dynamic list of TODOs</h1>
      <p>
        <span>Todos: </span>
        {todos.length}
      </p>
      <div className="btn-container">
        <button
          className="btn btn-info"
          name="title"
          type="button"
          onClick={clickHandler}
        >
          Sort by title
        </button>
        <button
          className="btn btn-warning"
          name="name"
          type="button"
          onClick={clickHandler}
        >
          Sort by name
        </button>
        <button
          className="btn btn-success"
          name="completed"
          type="button"
          onClick={clickHandler}
        >
          Sort by status
        </button>
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
