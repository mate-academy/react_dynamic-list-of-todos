import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr className="App__table_container">
    <td>{todo.id}</td>
    <td className="bold">{todo.user.name}</td>
    <td>{todo.title}</td>
    <td className="align-left">{todo.title}</td>
    <td><input type="checkbox" checked={todo.completed} /></td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
