import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';

function TodoList({ todos }) {
  return (
    <div className="todolist">
      {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
