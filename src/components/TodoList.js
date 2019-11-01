import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList({ todos, sortMethod, sortItems }) {
  let todoItems = [];

  if (sortMethod === 'Sort by todo Id') {
    todoItems = [...todos];
  } else if (sortMethod === 'Sort by todo title') {
    todoItems = [...todos]
      .sort((a, b) => (
        a.title > b.title ? 1 : -1
      ));
  } else if (sortMethod === 'Show undone todos first') {
    todoItems = [...todos]
      .sort(a => (
        a.completed ? 1 : -1
      ));
  } else if (sortMethod === 'Sort by executant name') {
    todoItems = [...todos]
      .sort((a, b) => (
        a.user.name > b.user.name ? 1 : -1
      ));
  }

  return (
    <>
      <button type="button" onClick={sortItems}>
        Sort by todo Id
      </button>
      <button type="button" onClick={sortItems}>
        Sort by todo title
      </button>
      <button type="button" onClick={sortItems}>
        Show undone todos first
      </button>
      <button type="button" onClick={sortItems}>
        Sort by executant name
      </button>
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
  sortItems: PropTypes.func.isRequired,
};

export default TodoList;
