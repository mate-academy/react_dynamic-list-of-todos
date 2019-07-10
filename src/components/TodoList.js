import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList({ item }) {
  return (
    <div>
      <TodoItem item={item} />
    </div>
  );
}

TodoList.propTypes = {
  item: PropTypes.shape({
  }).isRequired,
};
export default TodoList;
