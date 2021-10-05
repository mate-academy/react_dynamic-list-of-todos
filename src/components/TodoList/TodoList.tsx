import React from 'react';
import './TodoList.scss';

import cn from 'classnames';

interface Props {
  todos: Todo[],
  activeTodoId: number,
  filterQuery: string,
  showTodos: string,
  onRandomizer: any,
  handleShowTodos: any,
  handleFilterQuery: any,
  handleClick: any,
  handleChange: any,
}

export const TodoList: React.FC<Props> = ({
  todos,
  activeTodoId,
  filterQuery,
  showTodos,
  onRandomizer,
  handleShowTodos,
  handleFilterQuery,
  handleClick,
  handleChange,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">

      <input
        type="text"
        className="TodoList__item inputFilter"
        placeholder="Filter the todos by title"
        value={filterQuery}
        onChange={handleFilterQuery}
      />

      <select
        className="TodoList__item select"
        value={showTodos}
        onChange={handleShowTodos}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <button
        className="button"
        type="button"
        onClick={(event => onRandomizer(event))}
      >
        Randomize
      </button>

      <ul className="TodoList__list">
        {todos.map(({
          id,
          userId,
          title,
          completed,
        }) => (
          <li
            key={id}
            className={cn(
              'TodoList__item',
              { 'TodoList__item--unchecked': !completed },
              { 'TodoList__item--checked': completed },
            )}
          >
            <label>
              <input
                type="checkbox"
                checked={completed}
                readOnly
                onChange={event => handleChange(event, id)}
              />
              <p>{title}</p>
            </label>

            <button
              className={cn(
                { 'TodoList__user-button': activeTodoId !== id },
                { 'TodoList__user-button--selected': activeTodoId === id },
                'button',
              )}
              type="button"
              onClick={(event => handleClick(event, userId, id))}
            >
              User&nbsp;#
              {userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
