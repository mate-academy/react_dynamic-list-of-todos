import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todo }) => {
  const items = todo.map(item => (
    <TodoItem itemData={item} />
  ));
  return (
<table className="TodoList">
  <tr>
    <td className ="row1">Name</td>
    <td className ="row2">Task</td>
    <td className ="row3">Status</td>
  </tr>
  {items}
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
