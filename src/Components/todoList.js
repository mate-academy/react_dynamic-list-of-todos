import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ({ todos }) => (
  <>
    {[...todos]
      .sort((a, b) => a.completed - b.completed)
      .map(todo => (
        <TodoItem
          id={todo.id}
          title={todo.title}
          name={todo.user.name}
          completed={todo.completed}
          email={todo.user.email}
          phone={todo.user.phone}
        />
      ))}
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
