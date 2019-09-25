import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { TodoItem } from '../TodoItem/TodoItem';

// eslint-disable-next-line import/prefer-default-export
export const TodoList = (props) => {
  // eslint-disable-next-line react/prop-types
  const { todos } = props;
  console.log(typeof todos);

  return (
    <ul>
      {/* eslint-disable-next-line react/prop-types */}
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

// const shape = PropTypes.shape({
//   id: PropTypes.number.isRequired,
//   userId: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   completed: PropTypes.bool.isRequired,
//   user: PropTypes.object.isRequired,
// });

// TodoItem.propTypes = {
//   todos: PropTypes.arrayOf(shape).isRequired,
// }.isRequaired;

TodoItem.propTypes = {
  todos: PropTypes.object.isRequired,
}.isRequaired;

export default TodoList;
