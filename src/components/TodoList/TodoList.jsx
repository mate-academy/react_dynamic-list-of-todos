import React from 'react';
import './TodoList.scss';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos, selectUser, query, selection }) => {
  let filteredTodos = todos
    .filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()));

  if (selection === 'Select completed') {
    filteredTodos = filteredTodos.filter(todo => todo?.completed);
  } else if (selection === 'Select not completed') {
    filteredTodos = filteredTodos.filter(todo => !todo?.completed);
  }

  return (
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className={ClassNames('TodoList__item', {
              'TodoList__item--checked': todo?.completed,
              'TodoList__item--unchecked': !todo?.completed,
            })}
          >
            <Todo
              completed={todo?.completed}
              title={todo.title}
              userId={todo.userId}
              selectUser={selectUser}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  query: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
  selectUser: PropTypes.func.isRequired,
};
