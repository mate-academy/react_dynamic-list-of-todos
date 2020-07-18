import React from 'react';
import './App.css';
import { getPrepearedTodos } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoaded, setLoading] = React.useState<boolean>(false);
  const [isError, setError] = React.useState<string>('');

  const handleClick = async () => {
    setLoading(true);

    await getPrepearedTodos()
      .then(data => setTodos(data))
      .catch(error => {
        setError(error);
      });
  };

  return (
    <div className="container-md">
      <h1>Dynamic list of TODOs</h1>
      {todos.length > 0
        ? <TodoList todos={todos} />
        : (
          <>
            <button
              disabled={isLoaded}
              type="button"
              className="btn btn-success"
              onClick={handleClick}
            >
              {isLoaded
                ? 'Loading'
                : 'Load'}
            </button>
            {isError
              ? (<p>Please, refresh page</p>)
              : null}
          </>
        )}

    </div>
  );
};

export default App;
