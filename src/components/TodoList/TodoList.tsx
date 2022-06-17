/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useState } from 'react';
import './TodoList.scss';

type Todo = {
  id: number;
  createdAt: string;
  upDatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
};

type Props = {
  todos: Todo[]
  onSelect: (selectedId: number) => void
  onFilter: (inputedValue: string) => void
  onSelected: (selectedValue: string) => void
  onSorted: () => void
};

export const TodoList: React.FC <Props> = (
  {
    todos,
    onSelect,
    onFilter,
    onSelected,
    onSorted,
  },
) => {
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [inputedValue, setInputedValue] = useState('');

  return (
    <div className="TodoList">
      <form className="form">
        <input
          placeholder="input the title"
          data-cy="filterByTitle"
          className="form__input"
          value={inputedValue}
          onChange={(event) => {
            setInputedValue(event.target.value);
            onFilter(event.target.value);
          }}
        />

        <select
          className="select"
          onChange={(event) => {
            onSelected(event.target.value);
          }}
        >
          <option
            value="all"
          >
            All
          </option>

          <option
            value="active"
          >
            Active
          </option>

          <option
            value="completed"
          >
            Completed
          </option>
        </select>

        <button
          type="button"
          className="btn"
          onClick={onSorted}
        >
          Random sort
        </button>
      </form>
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed === false
                ? 'TodoList__item TodoList__item--unchecked'
                : 'TodoList__item TodoList__item--checked'}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed ? true : false}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              {selectedTodoId === todo.id ? (
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    onSelect(todo.userId);
                    setSelectedTodoId(todo.id);
                  }}
                >
                  {`User # ${todo.userId}`}
                </button>
              ) : (
                <button
                  className="
                    TodoList__user-button
                    button
                  "
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    onSelect(todo.userId);
                    setSelectedTodoId(todo.id);
                  }}
                >
                  {`User # ${todo.userId}`}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
