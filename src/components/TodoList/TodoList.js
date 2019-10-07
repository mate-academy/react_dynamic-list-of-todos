import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos, sortByName, sortByTitle, sortByCompleted }) => (
  <div>
    <div className="btn-group" role="group" aria-label="Basic example">
      <button onClick={sortByName} className="btn btn-dark text-warning">
        Sort by name
      </button>
      <button onClick={sortByTitle} className="btn btn-dark text-warning">
        Sort by title
      </button>
      <button onClick={sortByCompleted} className="btn btn-dark text-warning">
        Completed
      </button>
    </div>
  <div className="list-cards">
    {todos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />))}
  </div>
    </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object
  })).isRequired,
};
