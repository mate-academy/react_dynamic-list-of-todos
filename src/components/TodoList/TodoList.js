import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ todos }) {
  return (
    <>
      <p>
        <span className="todo-title">Todos: </span>
      </p>
      <ul className="todo-list__items">
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
}

const shape = PropTypes.shape({
  title: PropTypes.string,
  completed: PropTypes.string,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      todo: shape,
    }).isRequired,
  ).isRequired,
};

export default TodoList;
