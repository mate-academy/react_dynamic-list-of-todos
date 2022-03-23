import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  changeUserId: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, selectedUserId, changeUserId }) => {
  const [searchString, setSearchString] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          value={searchString}
          onChange={(event) => {
            setSearchString(event.target.value);
          }}
        />

        <select
          name="select"
          id="select"
          value={selectValue}
          onChange={event => {
            setSelectValue(event.target.value);
          }}
        >
          <option value="all">
            ALL
          </option>
          <option value="active">
            ACTIVE
          </option>
          <option
            value="completed"
          >
            COMPLETED
          </option>
        </select>
        <ul className="TodoList__list">
          {todos
            .filter(todo => {
              if (selectValue === 'all') {
                return true;
              }

              if (selectValue === 'active') {
                return (todo.completed === false);
              }

              return (todo.completed === true);
            })
            .filter(el => el.title.includes(searchString))
            .map(todo => (
              <>
                {/* {(todo.userId === selectedUserId) && (
                  <li
                    className={classNames('TodoList__item',
                      {
                        'TodoList__item--unchecked': !todo.completed,
                        'TodoList__item--checked': todo.completed,
                      })}
                    key={todo.id}
                  >
                    <label
                      htmlFor="id"
                    >
                      <input
                        type="checkbox"
                        readOnly
                        id={`${todo.id}`}
                      />
                      <p>
                        {todo.title}
                      </p>
                    </label>

                    <button
                      className={classNames(
                        'TodoList__user-button',
                        'button',
                        {
                          'TodoList__user-button--selected': todo.userId === selectedUserId,
                        },
                      )}
                      type="button"
                      onClick={() => {
                        changeUserId(todo.userId);
                      }}
                    >
                      {todo.userId}
                    </button>
                  </li>
                )} */}

                <li
                  key={todo.id}
                  className={classNames('TodoList__item',
                    {
                      'TodoList__item--unchecked': !todo.completed,
                      'TodoList__item--checked': todo.completed,
                    })}
                >
                  <label
                    htmlFor="id"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                    />
                    <p>
                      {todo.title}
                    </p>
                  </label>

                  <button
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      {
                        'TodoList__user-button--selected': todo.userId === selectedUserId,
                      },
                    )}
                    type="button"
                    onClick={() => {
                      changeUserId(todo.userId);
                    }}
                  >
                    {todo.userId}
                  </button>
                </li>
              </>
            ))}
        </ul>
      </div>
    </div>
  );
};
