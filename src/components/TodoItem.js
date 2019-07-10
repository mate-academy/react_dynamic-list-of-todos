import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ item }) {
  return (
    <div className=" container">
      <p
        className={!item.completed ? 'сompleted' : null}
      >
        {item.title}
      </p>
      <input
        className="todoItem"
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
