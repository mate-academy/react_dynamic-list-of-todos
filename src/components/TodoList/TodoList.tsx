import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onSelect: React.Dispatch<React.SetStateAction<number>>,
  selectedUserId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedUserId,
}) => {
  const [filterByTitle, setFilterByTitle] = useState('');
  const [filterByComplete, setFilterComplete] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const handleFilter = useCallback(() => {
    setVisibleTodos(todos.filter(
      todo => {
        const queryToLower = filterByTitle.toLowerCase();
        const titleToLower = todo.title.toLowerCase();

        switch (filterByComplete) {
          case 'all':
            return titleToLower.includes(queryToLower);
          case 'active':
            return titleToLower.includes(queryToLower) && !todo.completed;
          case 'completed':
            return titleToLower.includes(queryToLower) && todo.completed;
          default:
            return todos;
        }
      },
    ));
  }, [todos, filterByTitle, filterByComplete]);

  useEffect(() => {
    handleFilter();
  }, [filterByTitle, filterByComplete, todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__filter">
        <input
          type="text"
          className="TodoList__field"
          placeholder="Enter title"
          data-cy="filterByTitle"
          value={filterByTitle}
          onChange={(event) => setFilterByTitle(event.target.value)}
        />

        <select
          className="TodoList__field"
          value={filterByComplete}
          onChange={(event) => {
            setFilterComplete(event.target.value);
          }}
        >
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>

        <button
          type="button"
          className="button TodoList__user-button--selected"
          onClick={() => setVisibleTodos(
            [...visibleTodos].sort(() => Math.random() - 0.5),
          )}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>
              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                  },
                )}
                type="button"
                data-cy="userButton"
                onClick={() => {
                  onSelect(todo.userId);
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
