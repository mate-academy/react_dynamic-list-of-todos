import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const TodoItem = ({ item }) => (
  <tr className="App__table_container">
    <td>{item.id}</td>
    <td className="bold">{item.user.name}</td>
    <td>{item.title}</td>
    <td className="align-left">{item.title}</td>
    <input type="checkbox" checked={item.completed} />
  </tr>
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
