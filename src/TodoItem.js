import propTypes from 'prop-types';
import React from 'react';

const TodoItem = ({ todoItem }) => (
  <tr>
    <td className="tableCell">{todoItem.id}</td>
    <td className="tableCell">
      {todoItem.title}
    </td>
    <td className="tableCell">
      <div>{todoItem.user.name}</div>
    </td>
    <td className="tableCell">
      <input
        type="checkbox"
        checked={todoItem.completed}
      />
    </td>
  </tr>
);
TodoItem.propTypes = {
  todoItem: propTypes.shape({
    id: propTypes.number,
    completed: propTypes.bool,
    title: propTypes.string,
    user: propTypes.string,
  }).isRequired,
};

export default TodoItem;
