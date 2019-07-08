import React from 'react';
import PropTypes from 'prop-types';

const styleCompleted = {
  fontFamily: 'italic',
  textDecoration: 'line-through',
  color: 'silver',
}

function TodoItem({ item }) {
  return (
    <div className="container">
      <p
        className="text-left"
        style={item.completed ? styleCompleted : null}
      >
        {item.title}
      </p>
      <input
        type="checkbox"
        defaultChecked={item.completed}
      />
      <span
        className="checkmark"
      />
    </div>
  );
}
TodoItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
export default TodoItem;
