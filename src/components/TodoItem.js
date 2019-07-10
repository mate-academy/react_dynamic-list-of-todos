import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ currentTodo }) => (
  <tr>
    <td>{currentTodo.id}</td>
    <td>{currentTodo.title}</td>
    <td>{currentTodo.user.name}</td>
    <td>
      {
        currentTodo.completed
          ? <span style={{ color: 'green', fontSize: '20px' }}>✔</span>
          : <span style={{ color: 'red', fontSize: '20px' }}>✘</span>
      }
    </td>
  </tr>
);

TodoItem.propTypes = {
  currentTodo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
