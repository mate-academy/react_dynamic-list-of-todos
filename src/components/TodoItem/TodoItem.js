import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';
import { User } from '../User/User';

// eslint-disable-next-line import/prefer-default-export
export const TodoItem = (props) => {
  const { completed, user, title } = props;

  return (
    <li>
      <h2>{title}</h2>
      <p>{completed ? 'Done' : 'TODO'}</p>
      <User {...user} />
    </li>
  );
};

TodoItem.propTypes = {
  completed: PropTypes.string,
  user: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
}.isRequaired;

export default TodoItem;
