import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <table className="ui red table">
    <thead>
      <tr>
        <th>TODO item</th>
        <th>The name of the user</th>
        <th>Completed</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem todo={todo} />
      ))}
    </tbody>
  </table>
);

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
