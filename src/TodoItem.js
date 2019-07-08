import React from 'react';
import propTypes from 'prop-types';

const TodoItem = ({ item }) => (
  <div className="todo-item__info">
    <label htmlFor={item.id}>
      <input
        id={item.id}
        type="checkbox"
        checked={item.completed ? 'checked' : false}
        className="todo-item__completed"
      />
    </label>
    <h3>{item.title}</h3>
  </div>
);

TodoItem.propTypes = {
  item: propTypes.shape({
    completed: propTypes.bool,
    title: propTypes.string,
    id: propTypes.number,
  }).isRequired,
};

export default TodoItem;
