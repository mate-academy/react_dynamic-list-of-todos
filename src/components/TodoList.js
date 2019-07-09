import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ completedTodo }) => (
  <div className="Todo__List">
    {completedTodo.map(todo => (
      <div className="Todo__List-container">
        <div className="Container__Item"><TodoItem item={todo} /></div>
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
