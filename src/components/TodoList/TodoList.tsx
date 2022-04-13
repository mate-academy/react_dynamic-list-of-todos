import React, { useMemo, useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

interface Props {
  todos: Todo[],
  selectUser: (userId: number) => void,
  selectedUserId: number,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');

  const filteredTodos = useMemo(() => (
    todos
      .filter(todo => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ))
      .filter(todo => {
        switch (selectedOption) {
          case 'active':
            return todo.completed === false;

          case 'completed':
            return todo.completed === true;

          default:
            return todo;
        }
      })
  ), [query, todos, selectedOption]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="filter">
        <input
          type="text"
          className="filter__input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="filter__input"
          value={selectedOption}
          onChange={event => setSelectedOption(event.target.value)}
        >
          <option selected value="all">
            all
          </option>
          <option value="active">
            active
          </option>
          <option value="completed">
            completed
          </option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (

            <li
              key={todo.id}
              className={cn(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label>
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
                className={cn(
                  {
                    'TodoList__user-button--selected':
                   todo.userId === selectedUserId,
                  },
                  'button',
                  'TodoList__user-button',
                )}
                type="button"
                onClick={() => selectUser(todo.userId)}
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
