import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Todo = ({
  title,
  completed,
  userId,
  id,
  selected,
  handleSelectPost,
}) => (
  <li
    className={cn('TodoList__item', {
      'TodoList__item--unchecked': !completed,
      'TodoList__item--checked': completed,
    })}
  >
    <label>
      <input type="checkbox" readOnly />
      <p>{title}</p>
    </label>

    <button
      className={cn(`TodoList__user-button button`, {
        'TodoList__user-button--selected': id === selected,
      })}
      type="button"
      onClick={() => handleSelectPost(id, userId)}
    >
      User&nbsp;#
      {userId}
    </button>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  handleSelectPost: PropTypes.func.isRequired,
};
