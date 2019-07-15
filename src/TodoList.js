import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ currentTodos }) => (
  <tbody>
    {currentTodos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </tbody>
);

TodoList.propTypes = {
  currentTodos: PropTypes.arrayOf({
    todo: PropTypes.shape({
      user: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default TodoList;
