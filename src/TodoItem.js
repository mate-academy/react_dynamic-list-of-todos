import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function TodoItem({ todo }) {
  return (
    <tr>
      <td className="table__item">{todo.id}</td>
      <td className="table__item">{todo.title}</td>
      <User user={todo.user} />
      <td className="table__item">{todo.completed ? '+' : '-'}</td>
    </tr>
  );
}

TodoItem.propTypes
  = { todo: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default TodoItem;
