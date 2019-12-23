import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ({ todos }) => (
  <>
    {[...todos]
      .map(todo => (
        <TodoItem
          id={todo.id}
          title={todo.title}
          name={todo.user.name}
          completed={todo.completed}
          email={todo.user.email}
          phone={todo.user.phone}
          key={todo.id}
        />
      ))}
  </>

);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.boolean,
    user: PropTypes.object,
  })).isRequired,
};

export default TodoList;
