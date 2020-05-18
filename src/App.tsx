import React, { useState } from 'react';
import './App.css';
import { getPreparedTodos } from './api';
import { TodoList } from './ToDoList';

const App: React.FC = () => {
  const [isLoaded, setLoad] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<PreparedTodos>([]);

  const downloadData = () => {
    setLoading(true);
    getPreparedTodos().then((todo) => {
      setTodos(todo);
      setLoad(true);
      setLoading(false);
    });
  };

  const sortTodoByTytle = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortTodoByStatus = () => {
    setTodos([...todos].sort((a, b) => +a.completed - +b.completed));
  };

  const sortTodoByName = () => {
    setTodos([...todos].sort((a, b) => a.users.name.localeCompare(b.users.name)));
  };

  const sortTodoById = () => {
    setTodos([...todos].sort((a, b) => a.id - b.id));
  };

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
                  onClick={sortTodoById}
                >
                  Sort by id
                </button>
              </td>

              <td>
                <button
                  type="button"
                  className="button"
                  onClick={sortTodoByTytle}
                >
                  Sort by title
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="button"
                  onClick={sortTodoByName}
                >
                  Sort by name
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="button"
                  onClick={sortTodoByStatus}
                >
                  Sort by completed
                </button>
              </td>
            </tr>

            <TodoList todos={todos} />

          </table>


        )
      }
    </>
  );
};

export default App;
