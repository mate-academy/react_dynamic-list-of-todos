import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  selectUsersbyId: (id: number) => void;
  setCheckTodo: (id: number, isChecked: boolean) => void;
  inputFilterValue: string;
  hendlerFilterInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectFilterValue: string;
  hendlerFilterSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  randomSortTodos: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUsersbyId,
  selectedUserId,
  setCheckTodo,
  inputFilterValue,
  hendlerFilterInput,
  selectFilterValue,
  hendlerFilterSelect,
  randomSortTodos,
}) => (
  <div className="TodoList">

    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <input
        type="text"
        name="titleFilter"
        className="input"
        placeholder="Search todo"
        value={inputFilterValue}
        onChange={hendlerFilterInput}
      />
      <select
        name="selectTodos"
        defaultValue={selectFilterValue}
        className="select"
        onChange={hendlerFilterSelect}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="complated">Complated</option>
      </select>

      <button
        type="button"
        className="button is-primary is-light"
        onClick={randomSortTodos}
      >
        Randomize
      </button>

      <ul className="TodoList__list">
        {
          todos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.completed}
                  onChange={() => (setCheckTodo(todo.id, todo.completed))}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  { 'TodoList__user-button--selected': (todo.userId === selectedUserId) },
                )}
                type="button"
                onClick={() => (selectUsersbyId(todo.userId))}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);
