import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td className={cn(
      { done: todo.completed },
      { undone: !todo.completed },
    )}
    >
      {todo.completed ? 'finished' : 'not finished'}
    </td>
    <td><User user={todo.user} /></td>
  </tr>
);

TodoItem.propTypes = { todo: PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.object,
}).isRequired };
export default TodoItem;
