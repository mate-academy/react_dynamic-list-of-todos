import React from 'react';
import PropTypes from 'prop-types';
import { TodosSearch } from './todosSearch';
import { Todo } from './todo';
import { Select } from './select';

import './TodoList.scss';

export const TodoList = ({
  todos,
  userSelect,
  searchValue,
  handleChange,
  select,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <TodosSearch
        searchValue={searchValue}
        handleChange={handleChange}
      />
      <Select
        handleChange={handleChange}
        select={select}
      />
      <ul className="TodoList__list">
        { todos.map((todo) => {
          const visible = (
            todo.title.toLowerCase()
              .includes(searchValue.toLowerCase()));

          return (
            visible && (
              <Todo
                key={todo.id}
                title={todo.title}
                userId={todo.userId}
                completed={todo.completed}
                userSelect={userSelect}
              />
            )
          );
        })}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  userSelect: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  select: PropTypes.string.isRequired,
};
