import cn from 'classnames';
import React, { useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUserId: (userId: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, selectUserId }) => {
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
      <h2 className="title is-2">
        <label
          htmlFor="input"
          className="TodoList__header-input"
        >
          <p>Search todos</p>
          <input
            id="input"
            type="text"
            className="input"
            placeholder="Write a title here"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>

        <label
          htmlFor="select"
          className="TodoList__header-select"
        >
          <p>Select state of todos</p>
          <select
            id="select"
            className="select is-fullwidth mt-3 mb-5"
            value={selectValue}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </h2>
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (

            <li
              className={cn({
                TodoList__item: true,
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
              key={todo.id}
            >
              <label
                htmlFor="checkbox"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  id="checkbox"
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
                onClick={() => selectUserId(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};
