import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  setSelectedUserId: (userId: number) => void,
};

enum Show {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filterByTitle, setFilterByTitle] = useState('');
  const [filterByComplited, setFilterByComplited] = useState('all');

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const filtredTodos = todo.title.toLowerCase().includes(filterByTitle);

      switch (filterByComplited) {
        case Show.All:
          return filtredTodos;

        case Show.Active:
          return filtredTodos && !todo.completed;

        case Show.Completed:
          return filtredTodos && todo.completed;

        default:
          return 0;
      }
    }));
  }, [filterByTitle, todos, filterByComplited]);

  const titleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByTitle(event.target.value.toLowerCase());
  };

  const completedFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByComplited(event.target.value);
  };

  const randomize = () => {
    setVisibleTodos([...visibleTodos].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__control">
        <label>
          Filter by title:
          <input
            className="TodoList__input"
            type="text"
            data-cy="filterByTitle"
            value={filterByTitle}
            onChange={titleFilter}
          />
        </label>
        <label>
          Filter by status:
          <select
            className="TodoList__input"
            value={filterByComplited}
            onChange={completedFilter}
          >
            <option value={Show.All}>All</option>
            <option value={Show.Active}>Active</option>
            <option value={Show.Completed}>Completed</option>
          </select>
        </label>

        <button
          type="button"
          className="button"
          onClick={randomize}
        >
          Randomize
        </button>
      </div>

      <ul className="TodoList__list" data-cy="listOfTodos">
        {visibleTodos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              { 'TodoList__item--checked': todo.completed },
              { 'TodoList__item--unchecked': !todo.completed },
            )}
          >
            <label>
              <input type="checkbox" checked={todo.completed} readOnly />
              <p>{todo.title}</p>
            </label>

            {todo.userId && (
              <button
                className={classNames('TodoList__user-button', 'button',
                  {
                    'TodoList__user-button--selected':
                    selectedUserId === todo.userId,
                  })}
                type="button"
                data-cy="userButton"
                onClick={() => setSelectedUserId(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});
