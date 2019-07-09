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
          <th className="row1">Name</th>
          <th className="row2">Task</th>
          <th className="row3">Status</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.object.isRequired,
    }
  )).isRequired,
};

export default TodoList;
