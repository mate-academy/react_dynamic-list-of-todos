import React from 'react';
import PropTypes from 'prop-types';
import Users from './Users';

const TodoItem = ({ todo }) => (
  <tr>
    <td className="td">{todo.id}</td>
    <td className="td">{todo.title}</td>
    <td className="td">
      <Users user={todo.user} />
    </td>
  </tr>
);

TodoItem.propTypes = { todo: PropTypes.string.isRequired };

export default TodoItem;
