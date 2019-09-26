import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';

const TodoItem = ({ todo }) => (
  <li className="list-group-item mb-2 text-left" key={todo.id}>
    <User user={todo.user} key={todo.user} />
    {todo.completed ? <del>{todo.title}</del> : todo.title}
    <button type="button" className="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
