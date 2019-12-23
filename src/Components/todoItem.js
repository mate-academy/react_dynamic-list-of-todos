import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ id, title, name, completed, email, phone }) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td>{name}</td>
    <td>{completed === true ? 'completed' : 'no completed'}</td>
    <td>{email}</td>
    <td>{phone}</td>

  </tr>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default TodoItem;
