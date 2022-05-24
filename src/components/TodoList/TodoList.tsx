import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  loadedTodos: Todo[];
  userId: number | null;
  inputQuery: string;
  setInputQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectUserId: (userId: number) => void;
  selectedValue: string;
  handleChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoList: React.FC<Props> = ({
  loadedTodos,
  userId,
  selectUserId,
  inputQuery,
  setInputQuery,
  selectedValue,
  handleChangeSelect,
}) => {
  return (
    <div className="todoList">
      <h2>Todos:</h2>
      {loadedTodos ? (
        <div className="todoList__list-container">
          <div className="todoList__list--search">
            <label>
              <input
                data-cy="filterByTitle"
                className="todoList__search"
                name="todoList__search"
                type="text"
                placeholder="Search todo"
                value={inputQuery}
                onChange={setInputQuery}
              />
            </label>
            <label>
              <select
                className="todoList__search"
                value={selectedValue}
                onChange={handleChangeSelect}
                name="todoSelect"
              >
                <option value="0" disabled>
                  Choose a status of todo
                </option>
                <option value="all">All</option>
                <option value="active">Not completed</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>

          <ul
            className="todoList__list"
            data-cy="listOfTodos"
          >
            {loadedTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames({
                  todoList__item: true,
                  'todoList__item--unchecked': !todo.completed,
                  'todoList__item--checked': todo.completed,
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
                  className={classnames(
                    'todoList__user-button', 'button',
                    {
                      'todoList__user-button--selected': todo.userId === userId,
                    },
                  )}
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
