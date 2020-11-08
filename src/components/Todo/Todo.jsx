import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '../Button';

export const Todo = ({ title, userId, completed, selectUser }) => (
  <li className={classNames(`TodoList__item`, {
    'TodoList__item--checked': completed === true,
    'TodoList__item--unchecked': completed === false,
  })}
  >
    <label>
      <input type="checkbox" readOnly />
      <p>{title}</p>
    </label>
    <Button userId={userId} selectUser={selectUser} />
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  selectUser: PropTypes.func.isRequired,
};
