import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function TodoItem({ todo }) {
  return (
    <tr className={todo.completed ? 'completed' : 'notCompleted'}>
      <td className="cell">
        {todo.id}
      </td>
      <td className="cell">
        {todo.title}
      </td>
      <td className="cell">
        {todo.completed ? 'Done' : 'In Progress'}
      </td>
      <User user={todo.user} />
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
};

export default TodoItem;
