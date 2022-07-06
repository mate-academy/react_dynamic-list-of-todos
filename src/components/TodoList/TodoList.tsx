import React, { useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, selectUser }) => {
  const [filter, newFilter] = useState('');
  const [select, newSelect] = useState('');
  const todosList = [...todos];

  let visibleTodos = todosList.filter((todo) => {
    return todo.title.toLowerCase().includes(filter.toLowerCase());
  });

  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'filter') {
      newFilter(event.target.value);
    } else if (event.target.name === 'select') {
      newSelect(event.target.value);
    }
  };

  if (select === 'active') {
    visibleTodos = todosList.filter((todo) => {
      return todo.completed === false;
    });
  } else if (select === 'completed') {
    visibleTodos = todosList.filter((todo) => {
      return todo.completed === true;
    });
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        name="filter"
        id="filter"
        value={filter}
        onChange={handleChange}
      />
      <select
        name="select"
        id="select"
        value={select}
        onChange={handleChange}
      >

        <option
          value="all"
        >
          Choose all
        </option>

        <option
          value="active"
        >
          Choose active todos
        </option>

        <option
          value="completed"
        >
          Choose completed todos
        </option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => {
            return (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed === true,
                    'TodoList__item--unchecked': todo.completed === false,
                  },
                )}
              >
                <label>
                  {todo.title}
                </label>

                <button
                  type="button"
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
