import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  setUser: (arg0: number) => void,
  selectedUserId: number | null,
}

export const TodoList: React.FC<Props> = React
  .memo(({ todos, setUser, selectedUserId }) => (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {todos.map(item => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !item.completed },
                { 'TodoList__item--checked': item.completed },
              )}
              key={item.id}
            >
              <label>
                {item.completed
                  ? <input type="checkbox" checked readOnly />
                  : <input type="checkbox" readOnly /> }
                <p>{item.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                    selectedUserId !== item.userId,
                  },
                )}
                data-cy="userButton"
                type="button"
                onClick={() => {
                  setUser(item.userId);
                }}
              >
                User&nbsp;#
                {item.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ));
