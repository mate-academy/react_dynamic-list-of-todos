import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';
import './todoList.css';

const TodoList = ({ todos, onSortBy }) => (
  <table className="table">
    <thead className="table__thead">
      <tr>
        <th
          className="table__item"
          onClick={() => onSortBy('id')}
        >
          ID
        </th>
        <th
          className="table__item"
          onClick={() => onSortBy('completed')}
        >
          Completed
        </th>
        <th
          className="table__item"
          onClick={() => onSortBy('title')}
        >
          Title
        </th>
        <th
          className="table__item"
          onClick={() => onSortBy('user')}
        >
          User
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
);

TodoList.propTypes = {
  todos: propTypes.shape().isRequired,
  onSortBy: propTypes.func.isRequired,
};

export default TodoList;
