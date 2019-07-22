import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({todo}) => (
  <tr className="Todo">
    <td>
      {todo.id}
    </td>
    <td>
      <User user={todo.user} />
    </td>
    <td>
      <input type="checkbox" checked={todo.completed} />
    </td>
    <td>
      {todo.title}
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default TodoItem;
