import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td>{todo.completed.toString()}</td>
    <td>{todo.user}</td>
  </tr>
);

TodoItem.propTypes = { todo: PropTypes.objectOf(PropTypes.any) };

TodoItem.defaultProps = {
  todo: [
    {
      id: 'noId',
      title: 'noTitle',
      completed: 'noStatus',
      user: { name: 'noUser' },
    },
  ],
};

export default TodoItem;
