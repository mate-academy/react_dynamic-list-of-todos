import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ currentTodos }) => (
  <div>
    {currentTodos.map(todo => (
      <div className="App__container">
        <p className="App__todoItem"><TodoItem item={todo} /></p>
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  currentTodos: PropTypes.arrayOf({
    todo: PropTypes.shape({
      user: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default TodoList;
