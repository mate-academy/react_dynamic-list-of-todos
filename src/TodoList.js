import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ getTodosArr }) => {
  const [visibleTodos, saveTodos] = useState([]);
  const [isLoading, changeLoading] = useState(false);
  const [loaded, saveLoaded] = useState(false);
  const [sortedColumn, changeSortedColumn] = useState('');
  const [error, saveError] = useState(false);

  const loadTodos = async() => {
    try {
      changeLoading(true);

      const todos = await getTodosArr();

      saveTodos(todos);
      changeLoading(false);
      saveLoaded(true);
      saveError(false);
    } catch (e) {
      saveError(true);
    }
  };

  const sortById = (a, b) => a.id - b.id;
  const sortByTitle = (a, b) => a.title.localeCompare(b.title);
  const sortbyName = (a, b) => a.user.name.localeCompare(b.user.name);
  const sortByStatus = (a, b) => (a.completed > b.completed ? -1 : 1);

  const sortHeader = (title, func) => {
    const sortedTodos = [...visibleTodos].sort(func);

    sortedColumn === title
      ? saveTodos([...visibleTodos].reverse())
      : saveTodos(sortedTodos);
    changeSortedColumn(title);
  };

  return (
    <div>
      {visibleTodos.length === 0 && !error
        && (
          <button
            type="button"
            onClick={loadTodos}
          >
            Load
          </button>
        )}
      {isLoading && !error && <p>Loading...</p>}
      {loaded && !isLoading && (
        <table>
          <thead>
            <tr className="header">
              <th onClick={e => sortHeader(e.target.innerText, sortById)}>
                ID
              </th>
              <th onClick={e => sortHeader(e.target.innerText, sortByTitle)}>
                TITLE
              </th>
              <th onClick={e => sortHeader(e.target.innerText, sortbyName)}>
                USER
              </th>
              <th onClick={e => sortHeader(e.target.innerText, sortByStatus)}>
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleTodos.map(todo => (
              <TodoItem todo={todo} />
            ))}
          </tbody>
        </table>
      )
      }
      {error && (
        <div>
Error occurred
          <button
            type="button"
            onClick={loadTodos}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

TodoList.propTypes = { getTodosArr: PropTypes.func.isRequired };

export default TodoList;
