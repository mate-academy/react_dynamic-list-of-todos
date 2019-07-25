import React from 'react';
import propTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr>
    <td className="table__item">{todo.id}</td>
    <td className="table__item">{todo.completed ? 'x' : '' }</td>
    <td className="table__item">{todo.title}</td>
    <td className="table__item">{todo.user.name}</td>
  </tr>
);

TodoItem.propTypes = {
  todo: propTypes.shape({
    completed: propTypes.bool,
    title: propTypes.string,
    id: propTypes.number,
    user: propTypes.object,
  }).isRequired,
};

export default TodoItem;
