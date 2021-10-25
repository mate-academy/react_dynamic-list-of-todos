import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  selectUser: (userId: number)=> void;
  todos: Todo[];
  selectedUserId: number;
  serchInTitles: (query: string) => void;
  setFilter: (filterValue: string) => void;
};

export const TodoList: React.FC<Props> = ({
  selectUser,
  todos,
  selectedUserId,
  serchInTitles,
  setFilter,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <div>
        <input
          type="text"
          placeholder="enter search title"
          onChange={(event) => serchInTitles(event.currentTarget.value)}
        />
        <select
          name="filterTodosByStatus"
          id="filterTodosByStatus"
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        >
          <option
            value=""
            selected
            disabled
          >
            Show
          </option>
          <option
            value="all"
          >
            all
          </option>
          <option
            value="active"
          >
            active
          </option>
          <option
            value="completed"
          >
            completed
          </option>
        </select>
      </div>

      <ul className="TodoList__list">
        {todos.map((todo: Todo) => (
          <li
            className={classNames(
              'TodoList__item',
              {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              },
            )}
            key={todo.id}
          >
            <label htmlFor="todoCheckBox">
              <input
                type="checkbox"
                id="todoCheckBox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>
            <button
              className={classNames(
                'TodoList__user-button',
                'button',
                { 'TodoList__user-button--selected': selectedUserId === +todo.userId },
              )}
              type="button"
              onClick={() => selectUser(+todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
