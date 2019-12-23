
import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList(
  {
    todos, sortTableBy,
  }
) {
  return (
    <table align="center">
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => sortTableBy('title')}
            >
              title
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => sortTableBy('completed')}
            >
              completed
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => sortTableBy('email')}
            >
              email
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          todos.map(item => <TodoItem todo={item} key={item.id} />)
        }
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortTableBy: PropTypes.func.isRequired,
};

export default TodoList;
