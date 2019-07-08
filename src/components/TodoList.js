import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

// в props свойствами попадают все
// атрибуты Todolist (в данном случае только todos)
function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
