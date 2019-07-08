import React from 'react';
import './TodoItem.css';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr className="table__body">
    <td>{todo.id}</td>
    <td className="bold">{todo.user.name}</td>
    <td className="align-left">{todo.title}</td>
    {
      todo.completed
        ? <td className="success">Completed</td>
        : <td className="error">Not yet</td>
    }
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
