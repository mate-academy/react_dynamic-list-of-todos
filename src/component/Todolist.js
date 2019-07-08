import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './Todoitem';

const TodoList = props => (
  <div>
    {props.todos.map(todo => (
      <TodoItem todo={todo} />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
