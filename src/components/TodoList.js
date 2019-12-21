
import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList(
  {
    todos, sortByTitleLength, sortByStatus, sortByMail,
  }
) {
  return (
    <table align="center">
      <thead>
        <tr>
          <th>
            <button type="button" onClick={sortByTitleLength}>Title</button>
          </th>
          <th>
            <button type="button" onClick={sortByStatus}>completed</button>
          </th>
          <th>
            <button type="button" onClick={sortByMail}>email</button>
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
  sortByTitleLength: PropTypes.func.isRequired,
  sortByStatus: PropTypes.func.isRequired,
  sortByMail: PropTypes.func.isRequired,
};

export default TodoList;
