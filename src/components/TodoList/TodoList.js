import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos }) => (
  <div className="todo-list">
    {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
  </div>
);

const todoListShape = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoListShape)).isRequired,
};

export default TodoList;
