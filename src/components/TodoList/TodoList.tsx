import React from 'react';
import './TodoList.scss';
import cn from 'classnames';

type Props = {
  loadedTodos: Todo[];
  inputQuery: string;
  setInputQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectUserId: (userId: number) => void;
  selectedValue: string;
  handleChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoList: React.FC<Props> = ({
  loadedTodos,
  selectUserId,
  inputQuery,
  setInputQuery,
  selectedValue,
  handleChangeSelect,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      {loadedTodos ? (
        <div className="TodoList__list-container">
          <input
            data-cy="filterByTitle"
            className="TodoList__filter"
            name="TodoList__filter"
            type="text"
            placeholder="Choose todo"
            value={inputQuery}
            onChange={setInputQuery}
          />
          <label>
            <select
              className="TodoList__filter"
              value={selectedValue}
              onChange={handleChangeSelect}
              name="TodoSelect"
            >
              <option value="0" disabled>
                Choose a status of todo
              </option>
              <option value="all">All</option>
              <option value="active">Not completed</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <ul
            data-cy="listOfTodos"
            className="TodoList__list"
          >
            {loadedTodos.map(todo => (
              <li
                key={todo.id}
                className={cn({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                  type="button"
                  onClick={() => {
                    selectUserId(todo.userId);
                  }}
                >
                  User&nbsp; #
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
