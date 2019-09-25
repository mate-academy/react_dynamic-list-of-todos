import React from 'react';
import './ToDoList.css';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';

function ToDoList({
  todos,
  sortByCompleted,
  sortByName,
  sortByTitle,}) {
  return (
    <div>
      <button onClick={sortByCompleted} type="button">
        Completed
      </button>
      <button onClick={sortByName} type="button">
        Sort by name
      </button>
      <button onClick={sortByTitle} type="button">
        Sort by title
      </button>

      <div className="todolist">
        {todos.map(item => (
          <ToDoItem todo={item} key={item.id} />
        ))}
      </div>
    </div>

  );
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ToDoList;
