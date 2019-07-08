import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todo }) => {
  const items = todo.map(item => (
    <TodoItem itemData={item} />
  ));
  return (
    <div className="TodoList">
      {items}
    </div>
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
