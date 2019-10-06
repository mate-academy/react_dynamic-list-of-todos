import React from 'react';
import './ToDoList.css';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';

const ToDoList = ({
  todos, sortByTitle, sortByUser, sortByStatus,
}) => (
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

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object({
      todo: PropTypes.shape({
        title: PropTypes.string,
        completed: PropTypes.bool,
        id: PropTypes.number,
        user: PropTypes.object({
          name: PropTypes.string,
          username: PropTypes.string,
          email: PropTypes.string,
          phone: PropTypes.string,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
  sortByTitle: PropTypes.func.isRequired,
  sortByStatus: PropTypes.func.isRequired,
  sortByUser: PropTypes.func.isRequired,
};

export default ToDoList;
