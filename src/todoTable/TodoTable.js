import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todoitem/TodoItem';

function TodoTable({ sortMethod, table }) {
  let sortedList = [];

  switch (sortMethod) {
    case 'Status':
      sortedList = [...table]
        .sort((a, b) => b.completed - a.completed);
      break;
    case 'User':
      sortedList = [...table]
        .sort((a, b) => a.user.name.localeCompare(b.user.name));
      break;
    case 'Title':
      sortedList = [...table]
        .sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'Reset':
      sortedList = [...table];
      break;
    default:
      sortedList = [...table];
  }

  return (
    <>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Завдання</th>
            <th>Відповідальний</th>
            <th>Процес</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map(item => (
            <TodoItem
              key={item.id}
              title={item.title}
              todoProcess={item.completed}
              name={item.user.name}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

TodoTable.propTypes = {
  sortMethod: PropTypes.string.isRequired,
  table: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoTable;
