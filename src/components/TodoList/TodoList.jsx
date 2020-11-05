import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodoList.scss';

export const TodoList = ({ todos, clickHandler, selected }) => (
  <div className="TodoList">

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <Todo
            {...todo}
            key={todo.id}
            clickHandler={clickHandler}
            selected={selected}
          />
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickHandler: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};
