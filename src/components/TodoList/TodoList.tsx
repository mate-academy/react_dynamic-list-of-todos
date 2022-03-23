/* eslint-disable no-console */
import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

type Props = {
  todos: Todo[]
  selectUserId: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUserId,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  let filteredTodos: Todo[] = [...todos].filter(({ title }) => title.includes(inputValue));

  if (selectValue === 'completed') {
    filteredTodos = filteredTodos.filter(({ completed }) => completed === true);
  } else if (selectValue === 'active') {
    filteredTodos = filteredTodos.filter(({ completed }) => completed === false);
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <select
        className="TodoList__inputs"
        id="filter"
        value={selectValue}
        onChange={
          (event) => {
            handleSelectChange(event);
          }
        }
      >
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
      <span className="TodoList__inputs">Please Enter</span>
      <input
        className="TodoList__inputs"
        type="text"
        value={inputValue}
        onChange={
          (event) => {
            handleInputChange(event);
          }
        }
      />
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <>
              <li
                key={todo.id}
                className={cn({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={`${todo.id}`}
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{ todo.title }</p>
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
                  User&nbsp;#
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
