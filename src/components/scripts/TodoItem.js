import React from 'react';
import propTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr>
    <td className="table__item">{todo.title}</td>
    <td className="table__item">{todo.user.name}</td>
    <td className={todo.completed ? 'completed' : 'in-progress'}>
      {todo.completed ? 'Completed' : 'In progress' }
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: propTypes.shape({
    completed: propTypes.bool,
    title: propTypes.string,
    user: propTypes.object,
  }).isRequired,
};

export default TodoItem;
