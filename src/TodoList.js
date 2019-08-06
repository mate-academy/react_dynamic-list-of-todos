import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todo, sortByName, sortByTodos, sortByComplete }) => {
  const items = todo.map(item => (
    <TodoItem itemData={item} />
  ));
  return (
    <table className="TodoList">
      <thead>
        <tr>
          <th onClick={sortByComplete}>Status</th>
          <th onClick={sortByTodos}>Todos</th>
          <th onClick={sortByName}>Name</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
