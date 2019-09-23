import React from 'react';
import './Todo.scss';
import User from '../User/User';
import { TodoProps } from '../../constants/PropTypes';

function Todo({ todo }) {
  const {
    key, title, completed, user,
  } = todo;

  return (
    <div className="todo-item" key={key}>
      <h2 className="todo-item__title">{title}</h2>
      <p className="todo-item__check">{completed ? '\u2705' : '\u274c'}</p>
      <User {...user} completed={completed} />
    </div>
  );
}

Todo.propTypes = TodoProps;

export default Todo;
