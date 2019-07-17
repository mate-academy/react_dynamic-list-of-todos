import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ completedTodo }) => (
  <div className="todo__List">
    {completedTodo.map(todo => (
      <div className="todo__List-container">
        <div className="container__Item"><TodoItem item={todo} key={todo.id} /></div>
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  completedTodo: PropTypes.arrayOf({
    todo: PropTypes.shape({
      user: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default TodoList;
