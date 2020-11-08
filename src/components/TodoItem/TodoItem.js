import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';

const TodoItem = ({ todo, setUserInfo }) => {
  const showUser = () => {
    setUserInfo(todo.user);
  };

  const isCompleted = () => {
    return todo.todo.completed
      ? 'todo-item__status--completed'
      : 'todo-item__status--uncompleted';
  };

  return (
    // eslint-disable-next-line max-len
    <tr className="todo-item">

      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <td className="todo-item__name" onClick={showUser}>
        {todo.user.name}
      </td>
      <td className="todo-item__title">
        {todo.todo.title}
      </td>
      <td className={`todo-item__status ${isCompleted()}`}>
        {todo.todo.completed ? 'Completed' : 'Uncompleted'}
      </td>

    </tr>
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
