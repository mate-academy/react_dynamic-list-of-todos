import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import './TodoItem.scss';

const TodoItem = ({
  key, title, completed, user,
}) => (
  <div className="todo-item" key={key}>
    <h2 className="todo-item__title">{`${title[0].toUpperCase()}${title.slice(1)}`}</h2>
    <p className="todo-item__check">{completed ? '✔️ completed' : `❌ not completed`}</p>
    <User {...user} />
  </div>
);

TodoItem.propTypes = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItem;
