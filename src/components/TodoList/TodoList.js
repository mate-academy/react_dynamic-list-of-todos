import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos }) => todos.map(todo => <TodoItem todo={todo} key={todo.id} />);

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(shape).isRequired,
};

export default TodoList;
