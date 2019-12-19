import PropTypes from 'prop-types';
import React from 'react';
import User from './User';

const TodoItem = ({ todoItem: { user, id, title, completed } }) => (
  <tr className="table__row">
    <td className="table__cell">{id}</td>
    <td className="table__cell">{title}</td>
    <User name={user.name} email={user.email} />
    <td className="table__cell">{completed ? 'completed' : 'not completed'}</td>
  </tr>
);

TodoItem.propTypes = {
  todoItem: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
