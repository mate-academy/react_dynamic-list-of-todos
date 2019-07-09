import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>
      <User item={todo.user} />
    </td>
    <td className="task">{todo.title}</td>
    <td>
      <input
        className="status"
        type="checkbox"
        checked={todo.completed}
      />
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
};

export default TodoItem;
