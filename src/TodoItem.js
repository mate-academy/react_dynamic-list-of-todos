import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function TodoItem({ todo }) {
  const { id, title, completed, user } = todo;

  return (
    <>

      <tbody>
        <tr>
          <td>{id}</td>
          <td>{title}</td>
          <User user={user} />
          <td>{completed ? 'completed' : 'not completed'}</td>
        </tr>
      </tbody>
    </>
  );
}

export default TodoItem;

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.any).isRequired,
};
