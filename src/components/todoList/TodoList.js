import React from 'react';
import TodoItem from '../todoItem/TodoItem';
import PropTypes from 'prop-types';

function TodoList({ todos }) {
  return (
    <table className="ui celled table">
      <thead className="thead">
        <tr>
          <th>TODO item</th>
          <th>Status</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
