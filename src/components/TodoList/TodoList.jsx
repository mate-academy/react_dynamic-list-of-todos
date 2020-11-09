import React from 'react';
import classNames from 'classnames';
import { Todo } from '../Todo/Todo';
import { FilterOfTodos } from '../FilterOfTodos';
import { TodoListShape } from '../Shapes/TodoListShape';
import './TodoList.scss';

export const TodoList = ({
  todos,
  filterText,
  handleChange,
  showedTodos,
  handleСhangeUserId,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <FilterOfTodos
      filterText={filterText}
      handleChange={handleChange}
      showedTodos={showedTodos}
    />

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(({ completed, id, title, userId }) => (
          <li
            key={id}
            className={
              classNames(
                'TodoList__item',
                {
                  'TodoList__item--checked': completed,
                  'TodoList__item--unchecked': !completed,
                },
              )}
          >
            <Todo
              completed={completed}
              title={title}
              userId={userId}
              handleChange={handleChange}
              handleСhangeUserId={handleСhangeUserId}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = TodoListShape;
