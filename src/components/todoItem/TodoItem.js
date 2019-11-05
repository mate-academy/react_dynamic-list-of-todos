import React from 'react';
import User from '../user/User';
import PropTypes from 'prop-types';

function TodoItem({ todo: { title, completed, user } }) {
  return (
    <tr>
      <td>{title}</td>
      <td>{completed ? 'Completed' : 'Working'}</td>
      <td>
        <User user={user} />
      </td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
};

export default TodoItem;
