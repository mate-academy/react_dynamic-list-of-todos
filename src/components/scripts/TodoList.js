import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';
import '../styles/todoList.css';

const TodoList = ({ todos, sortBy }) => (
  <>
    <div className="button-wrapper">
      <button
        className="load-button"
        type="button"
        onClick={() => sortBy('title')}
      >
        Sort by title
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => sortBy('user')}
      >
        Sort by user
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => sortBy('completed')}
      >
        Sort by status
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => sortBy()}
      >
        Reset
      </button>
    </div>
    <div className="container-table">
      <table className="table">
        <thead className="table__thead">
          <tr>
            <th
              className="table__item"
            >
              Title
            </th>
            <th
              className="table__item"
            >
              User
            </th>
            <th
              className="table__item"
            >
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  </>
);

TodoList.propTypes = {
  todos: propTypes.shape().isRequired,
  sortBy: propTypes.func.isRequired,
};

export default TodoList;
