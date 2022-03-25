/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUserId: (userId: number) => (void),
};

export const TodoList: React.FC<Props> = ({ todos, selectUserId }) => {
  const [value, setValue] = useState('');
  const [select, setSelect] = useState('');
  const [list, setList] = useState<Todo[]>([]);

  useEffect(() => {
    setList(todos.filter(todo => {
      if (!todo.title.includes(value)) {
        return false;
      }

      if (select === 'active') {
        return !todo.completed;
      }

      if (select === 'completed') {
        return todo.completed;
      }

      return true;
    }));
  }, [todos, value, select]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="title"
        onChange={event => setValue(event.target.value)}
      />

      <select
        value={select}
        onChange={event => setSelect(event.target.value)}
      >
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {list.map(todo => (
            <li
              key={todo.id}
              className={cn({
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
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

          ))}
        </ul>
      </div>
    </div>
  );
};
