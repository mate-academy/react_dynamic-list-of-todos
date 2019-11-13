import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function TodoItem(props) {
  const { title, completed: isCompleted, user } = props.todo;

  return (
    <tr>
      <td>{title}</td>
      <User user={user} />
      <td>{`${isCompleted}`}</td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.instanceOf(Object).isRequired,
};

export default TodoItem;
