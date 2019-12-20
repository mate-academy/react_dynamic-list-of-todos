import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo }) => (
  <tbody>
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <User userData={todo.user} />
      <td
        className={todo.completed ? 'completed' : 'not-completed'}
      >
        {todo.completed ? 'yes' : 'no'}
      </td>
    </tr>
  </tbody>
);

TodoItem.propTypes = { todo: PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.object,
}).isRequired };

export default TodoItem;
