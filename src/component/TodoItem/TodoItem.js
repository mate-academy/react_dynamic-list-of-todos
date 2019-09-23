import React from 'react';
import PropTypes from 'prop-types';

import './TodoItem.css';
import User from '../User/User';

function TodoItem({ todo }) {
  return (
    <div className={`card ${todo.completed ? 'bg-green'
      : 'bg-yellow'}`}>
      <h3 className="card__title">{todo.title}</h3>
      <div className="card__checked">
        <i className="icon far fa-check-square" />
        Completed Task:
        <i className={`icon fas ${todo.completed ? 'checked fa-check'
          : 'unchecked fa-times'}`} />
      </div>
      <User person={todo.user} />
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  })
}

export default TodoItem;
