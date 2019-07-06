import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ allTodos, sortBy, sortByName }) => (

  <table className="todoList">
    <tr className="todoList__title">
      <th onClick={() => sortBy('id')}>№</th>
      <th onClick={() => sortBy('title')}>Title</th>
      <th onClick={() => sortByName('user.name')}>User</th>
      <th onClick={() => sortBy('completed')}>Status</th>
    </tr>

    {allTodos.map(todo => (
      <TodoItem todo={todo} />
    ))}

  </table>
);

TodoList.propTypes = {
  allTodos: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    map: PropTypes.func.isRequired,
  }).isRequired,
  sortBy: PropTypes.func.isRequired,
  sortByName: PropTypes.func.isRequired,
};

export default TodoList;
