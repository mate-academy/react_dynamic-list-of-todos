import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr>
  <th>{todo.id}</th>
  <th>{todo.title}</th>
  <th>{todo.completed ? '✅' : '❌'}</th>
  <th>{todo.user.name}</th>
</tr>
);

TodoItem.propTypes = { todo: PropTypes.string.isRequired };

export default TodoItem;
