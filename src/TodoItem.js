import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ itemData }) => (
  <tr>
    <td><input type="checkbox" checked={itemData.completed} /></td>
    <td>{itemData.title}</td>
    <td><User userData={itemData.user} /></td>
  </tr>
);

TodoItem.propTypes = {
  itemData: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};

export default TodoItem;
