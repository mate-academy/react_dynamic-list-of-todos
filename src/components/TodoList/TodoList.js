import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const { todos } = props;

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(shape).isRequired,
};
