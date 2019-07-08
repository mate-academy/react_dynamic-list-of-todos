
import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ itemData }) => (
  <div className="TodoItem">
    <User userData={itemData.user} />
    <div>
      <input type="checkbox" checked={itemData.completed} />
      {itemData.title}
    </div>
  </div>
);

TodoItem.propTypes = {
  itemData: PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.object.isRequired,
    }
  ).isRequired,
};

export default TodoItem;
