import React from 'react';
import PropTypes from 'prop-types';
import './UserTodos.css';

const UserTodos = (props) => {
  const { id, completed, title } = props.todo;

  return (
    <li>
      <label
        className={props.todo.completed ? 'todo__label' : null}
        htmlFor="checkbox"
      >
        <input
          name={id}
          type="checkbox"
          checked={completed}
          onChange={props.handleCheckBox}
        />
        {title}
      </label>
    </li>
  );
};

UserTodos.propTypes = {
  handleCheckBox: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    completed: PropTypes.bool,
    title: PropTypes.string,
  }).isRequired,
};

export default UserTodos;
