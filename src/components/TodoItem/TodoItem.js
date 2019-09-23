import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.scss';
import User from '../User/User';

function TodoItem({
  title, completed, user,
}) {
  return (
    <div className="todo-item">
      <h2 className="todo-item__title">{title}</h2>
      <p className="todo-item__check">{completed ? '\u2713' : ''}</p>
      <User {...user} />
    </div>
  );
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItem;
