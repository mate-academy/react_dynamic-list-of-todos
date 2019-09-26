import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos: copyTodos }) => (
  <div className="container">
    {copyTodos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    )) }
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
