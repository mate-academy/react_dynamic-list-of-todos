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

  const sortByTitle = (title) => {
    if (sortedColumn !== title) {
      setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
      setSortedColumn(title);
    } else {
      setTodos([...todos].sort((a, b) => b.title.localeCompare(a.title)));
      setSortedColumn();
    }
  };

  const sortByStatus = (status) => {
    if (sortedColumn !== status) {
      setTodos([...todos].sort((a, b) => a.completed - b.completed));
      setSortedColumn(status);
    } else {
      setTodos([...todos].sort((a, b) => b.completed - a.completed));
      setSortedColumn();
    }
  };

  const sortById = (id) => {
    if(id !== 0) {
      id = 0;
    }
    if (sortedColumn !== id) {
      setTodos([...todos].sort((a, b) => a.id - b.id));
      setSortedColumn(id);
    } else {
      setTodos([...todos].sort((a, b) => b.id - a.id));
      setSortedColumn();
    }
  };

  const sortByUser = (user) => {
    if (sortedColumn !== user) {
      setTodos(
        [...todos].sort((a, b) => a.user.name.localeCompare(b.user.name))
      );
      setSortedColumn(user);
    } else {
      setTodos(
        [...todos].sort((a, b) => b.user.name.localeCompare(a.user.name))
      );
      setSortedColumn();
    }
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
              <th onClick={sortById}>ID</th>
              <th onClick={sortByTitle}>TITLE</th>
              <th onClick={sortByUser}>USER</th>
              <th onClick={sortByStatus}>STATUS</th>
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
