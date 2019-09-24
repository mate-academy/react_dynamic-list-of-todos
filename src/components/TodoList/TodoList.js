import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';
import { TodoListPropTypes } from '../../constants/proptypes';

function TodoList({
  todos,
  sortByTitle,
  sortByUser,
  sortByCompleteness,
}) {
  return (
    <>
      <div className="buttons-wrapper">
        <button
          type="button"
          className="sort-button"
          onClick={sortByTitle}
        >
          Sort by title
        </button>
        <button
          type="button"
          className="sort-button"
          onClick={sortByUser}
        >
          Sort by user
        </button>
        <button
          type="button"
          className="sort-button"
          onClick={sortByCompleteness}
        >
          Sort by completeness
        </button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
}

TodoList.propTypes = TodoListPropTypes;

export default TodoList;
