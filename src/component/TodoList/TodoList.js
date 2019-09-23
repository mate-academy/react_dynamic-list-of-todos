import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todoList: copyTodos }) => (
  <div className="container">
    {copyTodos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    )) }
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
