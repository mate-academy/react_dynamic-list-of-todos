import React, { useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[]
  selectUserId: (userId: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, selectUserId }) => {
  const [input, setInput] = useState('');
  const [selectValue, setSelect] = useState('all');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
  };

  let visibleTodos: Todo[] = todos.filter(todo => todo.title.includes(input));

  if (selectValue === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  if (selectValue === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <select
          value={selectValue}
          onChange={handleSelectChange}
          className="TodoList__item--checked"
          name="select"
        >
          <option value="all" selected>All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <input
          value={input}
          onChange={handleInputChange}
          className="TodoList__item--checked"
          type="text"
          placeholder="Search todo"
        />
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <>
              <li
                key={todo.id}
                className={classNames({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
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
                  User&nbsp;
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
