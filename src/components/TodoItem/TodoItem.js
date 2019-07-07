import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';

const TodoItem = ({ todo, setUserInfo }) => {
  const showUser = () => {
    setUserInfo(todo.user);
  };
  return (
    // eslint-disable-next-line max-len
    <div className={`todo-list__item ${todo.todo.completed ? 'todo-list__item--completed' : 'todo-list__item--uncompleted'}`}>

      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <p className="todo-list__item__name" onClick={showUser}>
        {todo.user.name}
      </p>
      <p className="todo-list__item__title">
        {todo.todo.title}
      </p>
      <p className="todo-list__item__completed">
        {todo.todo.completed ? 'Completed' : 'Uncompleted'}
      </p>

    </div>
  );
};

const userShape = {
  name: PropTypes.string.isRequired,
};

const todoShape = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    user: PropTypes.shape(userShape).isRequired,
    todo: PropTypes.shape(todoShape).isRequired,
  }).isRequired,
  setUserInfo: PropTypes.func.isRequired,
};

export default TodoItem;
