import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

function TodoList({ todoList: copyTodos }) {
  return (
    <div className="container">
      { copyTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      )) }
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList;
