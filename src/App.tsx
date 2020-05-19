import React, { useState, useMemo } from 'react';
import './App.css';
import { getPreparedTodos } from './api';
import { TodoList } from './ToDoList';

const getVisibleTodos = (todos: PreparedTodos, sortType: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'completed':
      return [...todos].sort((a, b) => +a.completed - +b.completed);

    case 'userName':
      return [...todos].sort((a, b) => a.users.name.localeCompare(b.users.name));

    default:
      return todos;
  }
};

const App: React.FC = () => {
  const [isLoaded, setLoad] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<PreparedTodos>([]);
  const [sortType, setSortType] = useState('');

  const downloadData = () => {
    setLoading(true);
    getPreparedTodos().then((todo) => {
      setTodos(todo);
      setLoad(true);
      setLoading(false);
    });
  };

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, sortType);
  }, [todos, sortType]);

  return (
    <>
      <h1 className="head">
        Dynamic list of TODOs
      </h1>
      {
        !isLoaded ? (
          <button
            type="button"
            className="button download"
            onClick={downloadData}
          >
            {isLoading ? 'Loading...' : 'Download Data'}
          </button>
        ) : (
          <table className="data_table">
            <tr className="button-container">

              <td>
                <button
                  type="button"
                  className="button"
                  onClick={() => setSortType(' ')}
                >
                  Reset
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="button"
                  onClick={() => setSortType('title')}
                >
                  Sort by title
                </button>
              </td>

              <td>
                <button
                  type="button"
                  className="button"
                  onClick={() => setSortType('userName')}
                >
                  Sort by user
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="button"
                  onClick={() => setSortType('completed')}
                >
                  Sort by completed
                </button>
              </td>
            </tr>

            <TodoList todos={visibleTodos} />

          </table>


        )
      }
    </>
  );
};

export default App;
