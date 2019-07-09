import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';
import './todoList.css';

const TodoList = ({ todos }) => (
  <table className="table">
    <thead className="table__thead">
      <tr>
        <th className="table__item">ID</th>
        <th className="table__item">Completed</th>
        <th className="table__item">Title</th>
        <th className="table__item">User</th>
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
};

export default TodoList;
