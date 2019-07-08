import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ id, title, completed, user, changeCompleted }) => (
  <div className="todo-row">
    <input
      id={`todo${id}`}
      type="checkbox"
      defaultChecked={completed}
      onChange={changeCompleted}
    />

    <label htmlFor={`todo${id}`}>
      {title}
    </label>

    <User {...user} />
  </div>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  changeCompleted: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  completed: false,
  user: null,
};

export default TodoItem;
