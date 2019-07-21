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
        defaultChecked={todo.completed}
      />
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      username: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
