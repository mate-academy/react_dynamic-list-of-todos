import React, { useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[]
  selectIdOfUser: (userId: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, selectIdOfUser }) => {
  const [title, setTitle] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const filteredTodos = todos.filter(todo => todo.title.includes(title));

  function filter(prepareForFilterTodos: Todo[]): Todo[] {
    if (selectedValue === 'completed') {
      return prepareForFilterTodos.filter(todo => todo.completed);
    }

    if (selectedValue === 'active') {
      return prepareForFilterTodos.filter(todo => !todo.completed);
    }

    return prepareForFilterTodos;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <h4>Filter by title</h4>
        <input
          data-cy="filterByTitle"
          type="text"
          value={title}
          className="TodoList__input"
          placeholder="Enter a title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}

        />
        <h4> Status:</h4>
        <select
          className="TodoList__input TodoList__input "
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        >
          <option value="all"> All </option>
          <option value="active">Active </option>
          <option value="completed">Completed </option>
        </select>
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filter(filteredTodos).map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
            >
              <label>
                <input type="checkbox" readOnly checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <button
                data-cy="userButton"
                className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                type="button"
                onClick={() => {
                  selectIdOfUser(todo.userId);
                }}
              >
                {`User# ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
