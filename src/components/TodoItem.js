import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ item }) => (
  <div className="Item__container">
    <div className="Item__container-id">{item.id}</div>
    <div className="Item__container-name">{item.user.name}</div>
    <div className="Item__container-title">{item.title}</div>
    <input className="Item__container-completed" type="checkbox" checked={item.completed} />
  </div>
);

TodoItem.propTypes = {
  item: PropTypes.shape({
    completed: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
