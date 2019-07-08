import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <td>
    {todo.title}
    {todo.completed
      ? <input type="checkbox" checked />
      : <input type="checkbox" /> }
  </td>
);

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoItem;
