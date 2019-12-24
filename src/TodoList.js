import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ getTodos }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sortedColumn, setSortedColumn] = useState();
  const [error, setError] = useState(false);

  const loadTodos = async() => {
    try {
      setLoading(true);

      const gotTodos = await getTodos();

      setTodos(gotTodos);
      setLoading(false);
      setLoaded(true);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const sortBy = (field) => {
    const by = {
      title: (a, b) => a.title.localeCompare(b.title),
      status: (a, b) => b.completed - a.completed,
      user: (a, b) => a.user.name.localeCompare(b.user.name),
      id: (a, b) => a.id - b.id,
    };

    setSortedColumn(field);

    sortedColumn !== field
      ? setTodos([...todos].sort(by[field]))
      : setTodos([...todos].reverse());
  };

  return (
    <div>
      {todos.length === 0 && !error && (
        <button className="button" type="button" onClick={loadTodos}>
          Load
        </button>
      )}
      {isLoading && !error && <p>Loading...</p>}
      {loaded && !isLoading && (
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => sortBy('id')}>ID</th>
              <th onClick={() => sortBy('title')}>TITLE</th>
              <th onClick={() => sortBy('user')}>USER</th>
              <th onClick={() => sortBy('status')}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
      {error && (
        <div>
          Error
          <button className="button" type="button" onClick={loadTodos}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

TodoList.propTypes = {
  getTodos: PropTypes.func.isRequired,
};

export default TodoList;
