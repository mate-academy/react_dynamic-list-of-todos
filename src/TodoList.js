import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todo }) => {
  const items = todo.map(item => (
    <TodoItem itemData={item} />
  ));
  return (
    <table className="TodoList">
      <thead>
        <tr>
          <th>Status</th>
          <th>Todos</th>
          <th>Name</th>
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
