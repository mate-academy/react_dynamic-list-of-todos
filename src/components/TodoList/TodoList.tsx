/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number,
  onUserSelectButton: (userId: number) => void,
};

// const shufle = (array: Todo[]) => {
//   const a = array;

//   let j;
//   let x;
//   let i;

//   for (i = a.length - 1; i > 0; i -= 1) {
//     j = Math.floor(Math.random() * (i + 1));
//     x = a[i];
//     a[i] = a[j];
//     a[j] = x;
//   }

//   console.log(a.map(b => b.id).splice(0, 5));

//   return a;
// };

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onUserSelectButton,
}) => {
  const [query, setQuery] = useState('');
  const [filteredByStatus, setFilteredByStatus] = useState<string>('all');

  const searchByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filterByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredByStatus(event.target.value);
  };

  const filteredTodos = (() => {
    const filteredTodo = todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (filteredByStatus) {
      case 'active':
        return filteredTodo.filter(todo => (
          todo.completed
        ));

      case 'completed':
        return filteredTodo.filter(todo => (
          !todo.completed
        ));

      default:
        return filteredTodo;
    }
  })();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        placeholder="enter title"
        value={query}
        onChange={searchByTitle}
      />
      <select
        name="filterByStatus"
        id="selectFilterByStatus"
        value={filteredByStatus}
        onChange={filterByStatus}
      >
        <option
          value="all"
        >
          All
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

      <button
        type="button"
      >
        Shufle list
        {console.log('render')}
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">

          {filteredTodos.map(todo => (
            <li
              className={classNames(
                'TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
              key={todo.id}
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
                  'TodoList__user-button',
                  'button', {
                    'TodoList__user-button--selected': todo.userId === selectedUserId,
                  },
                )}
                type="button"
                onClick={() => onUserSelectButton(todo.userId)}
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
