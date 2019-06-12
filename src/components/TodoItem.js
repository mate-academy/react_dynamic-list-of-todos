import React from 'react';
import PropTypes from 'prop-types'

function TodoItem(props) {
 const {title, userName, completed} = props;

  return (
    <tr>
      <td>{title}</td>
      <td>{userName}</td>
      <td className={completed}>{completed}</td>
    </tr>
  );
}

export default TodoItem;

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired
};
