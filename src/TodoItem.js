import propTypes from 'prop-types';
import React from 'react';

const TodoItem = ({ todoItem }) => (
  <tr>
    <td>{todoItem.id}</td>
    <td>
      {todoItem.title}
    </td>
    <td>
      <User user={todoItem.user} />
    </td>
    <td>
      <input
        type="checkbox"
        checked={todoItem.completed}
      />
    </td>
  </tr>
);

const User = ({ user }) => (
  <div>{user.name}</div>
);

TodoItem.propTypes = {
  todoItem: propTypes.shape({
    id: propTypes.number,
    completed: propTypes.bool,
    title: propTypes.string,
    user: propTypes.string,
  }).isRequired,
};

User.propTypes = {
  user: propTypes.shape({
    name: propTypes.string,
  }).isRequired,
};

export default TodoItem;
