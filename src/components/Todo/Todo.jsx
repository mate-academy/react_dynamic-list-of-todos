import React from 'react';
import cn from 'classnames';

export const Todo = (
  { title,
    completed,
    userId,
    id,
    selected,
    clickHandler }
  ) => (
  <li
    className={cn(
      'TodoList__item', {'TodoList__item--unchecked': !completed},
        {'TodoList__item--checked': completed}
    )}
  >
  <label>
    <input type="checkbox" readOnly />
    <p>{title}</p>
  </label>

  <button
    className={cn(
      `TodoList__user-button button`,
      {'TodoList__user-button--selected': id === selected}
    )}
    type="button"
    onClick={()=>clickHandler(id,userId)}
  >
    User&nbsp;#{userId}
  </button>
</li>
)