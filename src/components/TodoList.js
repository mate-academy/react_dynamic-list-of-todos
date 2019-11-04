import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import SortButtons from './SortButtons';

function TodoList({ todos, sortMethod, changeSortMethod }) {
  let todoItems = [];

  switch (sortMethod) {
    case 'Sort by todo Id':
      todoItems = [...todos];
      break;

    case 'Sort by todo title':
      todoItems = [...todos]
        .sort((a, b) => (
          a.title.localeCompare(b.title)
        ));
      break;

    case 'Show undone todos first':
      todoItems = [...todos]
        .sort(a => (
          a.completed ? 1 : -1
        ));
      break;

    case 'Sort by executant name':
      todoItems = [...todos]
        .sort((a, b) => (
          a.user.name.localeCompare(b.user.name)
        ));
      break;

    default:
  }

  return (
    <>
      <SortButtons changeSortMethod={changeSortMethod} />
      <table className="table">
        <thead className="thead">
          <tr>
            <th className="cell">
              #
            </th>
            <th className="cell">
              Todo Item
            </th>
            <th className="cell">
              Status
            </th>
            <th className="cell">
              Assigned to
            </th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortMethod: PropTypes.string.isRequired,
  changeSortMethod: PropTypes.func.isRequired,
};

export default TodoList;
