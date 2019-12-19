import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo: { user, id, title, completed } }) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td className="todo">
      <input type="checkbox" checked={completed} readOnly />
      <span>
        {completed ? 'completed' : 'not completed'}
      </span>
    </td>
    <td style={{ color: '#cccc00' }}>
      <User
        user={user}
      />
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.oneOfType([PropTypes.object])
    .isRequired,
};

export default TodoItem;
