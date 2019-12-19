import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { HEADERS } from './const';

const TodoList = ({ todosWithUsers, sortByField }) => (
  <table className="todo">
    <thead>
      <tr>
        {HEADERS.map(header => (
          <th
            key={header.code}
            onClick={() => sortByField(header.code, header.type)}
          >
            {header.title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {todosWithUsers.map(
        todoItem => <TodoItem key={todoItem.id} todo={todoItem} />
      )}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todosWithUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortByField: PropTypes.func.isRequired,
};

export default TodoList;
