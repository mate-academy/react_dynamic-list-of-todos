import React from 'react';
import './ToDoList.css';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';

function ToDoList({
  todos, sortByTitle, sortByUser, sortByStatus,
}) {
  return (
    <>
      <div className="buttons">
        <button type="button" className="btn btn-info" onClick={sortByTitle}>
          {' '}
          Sort by title
        </button>
        <button type="button" className="btn btn-info" onClick={sortByStatus}>
          Sort by status
        </button>
        <button type="button" className="btn btn-info" onClick={sortByUser}>
          {' '}
          Sort by user
        </button>
      </div>
      <div className="todolist">
        {todos.map(item => (
          <ToDoItem todo={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ToDoList;
