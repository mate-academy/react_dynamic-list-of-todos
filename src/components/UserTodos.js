import React from 'react';
import PropTypes from 'prop-types';

const UserTodos = props => {
  const syle = {
    textDecoration: 'line-through',
    color: '#cdcdcd',
    fontStyle: 'italick'
  };

  return (
    <li>
      <label
        htmlFor="checkbox"
        style={props.todo.completed ? syle : null}
      >
        <input
          name={props.todo.id}
          type="checkbox"
          checked={props.todo.completed}
          onChange={props.handleCheckBox}
        />
        {props.todo.title}
      </label>
    </li>
  )
};

UserTodos.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool,
    title: PropTypes.string,
  }).isRequired,
};

export default UserTodos;
