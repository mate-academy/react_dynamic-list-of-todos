import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo, users }) => {
  const filteredUsers = users.filter(
    user => user.id === todo.userId
  );
  const Users = filteredUsers.map(
    user => <User key={users.id} user={user} />
  );

  return (
    <div className={
      `todoBlock ${todo.completed ? 'completed' : 'incompleted'}`}
    >
      <div>
        <b>Task:</b>
        {todo.title}
      </div>
      <b>Responsible:</b>
      {Users}
    </div>
  );
};

TodoItem.propTypes = {
  userId: PropTypes.number,
  todo: PropTypes.object,
  title: PropTypes.string,
}.isRequired;

export default TodoItem;
