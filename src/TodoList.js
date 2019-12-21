import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = (
  { usersAndTodosArr, sortByTitle, sortByName, sortByProgress }
) => (
  <section>
    <button
      type="button"
      onClick={sortByTitle}
    >
        Sort by Title
    </button>
    <button
      type="button"
      onClick={sortByName}
    >
        Sort by Name
    </button>
    <button
      type="button"
      onClick={sortByProgress}
    >
        Sort by Progress
    </button>
    <ul>
      <Todo usersAndTodosArr={usersAndTodosArr} />
    </ul>
  </section>
);

TodoList.propTypes = {
  usersAndTodosArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortByTitle: PropTypes.func.isRequired,
  sortByName: PropTypes.func.isRequired,
  sortByProgress: PropTypes.func.isRequired,
};

export default TodoList;
