import PropTypes from 'prop-types';
import React from 'react';
import User from '../User';

const TodoItem = ({ todoItem: { user, id, title, completed } }) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <User name={user.name} />
    <td>{completed ? 'completed' : 'not completed'}</td>
  </tr>
);

TodoItem.propTypes = {
  todoItem: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
