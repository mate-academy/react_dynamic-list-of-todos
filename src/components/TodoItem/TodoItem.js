import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoItem.css';
import User from '../User/User';

function TodoItem({ todo }) {
  const { completed, title, user } = todo;
  const classItem = classNames('list-group-item', { disabled: completed });

  return (
    <li className={classItem}>
      <span className="li-task">Task:&nbsp;</span>
      {title}
      &nbsp;|&nbsp;
      <User {...user} />
    </li>
  );
}

export default TodoItem;

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
});

TodoItem.propTypes = {
  todo: shape.isRequired,
};
