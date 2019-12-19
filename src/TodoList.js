import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <ol className="todo-list">
    {todos.map(item => <li key={item.id}><TodoItem todo={item} /></li>)}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
