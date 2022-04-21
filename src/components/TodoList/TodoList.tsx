import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  userId: number;
  value: string;
  sortBy: string;
  randomSort: boolean;
  selectUser: (x: number) => void;
  changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeRandomSort: () => void;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    userId,
    value,
    sortBy,
    randomSort,
    selectUser,
    changeValue,
    changeSortBy,
    changeRandomSort,
  }) => {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="sorting-form TodoList__sorting-form">
          <input
            className="sorting-form__input"
            type="text"
            placeholder="Search todo"
            value={value}
            onChange={changeValue}
          />

          <div className="sorting-form__footer">
            <select
              className="button sorting-form__select"
              value={sortBy}
              onChange={changeSortBy}
            >
              <option value="">Select sorting option</option>
              <option value="all">All todos</option>
              <option value="completed">Completed todos</option>
              <option value="active">Active todos</option>
            </select>
            <button
              className={classNames(
                'button',
                'sorting-form__button',
                { 'sorting-form__button--active': randomSort },
              )}
              type="button"
              onClick={changeRandomSort}
            >
              Randomize
            </button>
          </div>

        </div>

        <div className="TodoList__list-container">
          {todos.length > 0 ? (
            <ul className="TodoList__list">
              {todos.map(todo => (
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
                    <input
                      type="checkbox"
                      readOnly
                      checked={todo.completed}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={classNames(
                      'button',
                      'TodoList__user-button',
                      {
                        'TodoList__user-button--selected':
                        todo.userId === userId,
                      },
                    )}
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="TodoList__warn-message">
              No todo with the specified title!
            </p>
          )}
        </div>
      </div>
    );
  },
);
