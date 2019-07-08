import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const TodoItem = ({ todos }) => (
  todos.map(todo => (
    <tr>
      <User currentUser={todo.user} />
      <td className="todo-list-table__task">
        {todo.title}
        {todo.completed
          ? <input type="checkbox" checked />
          : <input type="checkbox" /> }
      </td>
    </tr>
  )));

TodoItem.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoItem;
