import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Todo } from '../Types/Types';
import './TodoList.scss';

interface Props {
  todos: Todo[],
  selectedUserId: number,
  setSelectedUserId: (userId: number) => void,
}

export const TodoList: React.FC<Props> = React.memo(({
  todos, selectedUserId, setSelectedUserId,
}) => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filterByTitle, setFilterByTitle] = useState('');
  const [filterByComplited, setFilterByComplited] = useState('all');

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const filtredTodos = todo.title.toLowerCase().includes(filterByTitle);

      switch (filterByComplited) {
        case 'all':
          return filtredTodos;

        case 'active':
          return filtredTodos && !todo.completed;

        case 'completed':
          return filtredTodos && todo.completed;

        default:
          return 0;
      }
    }));
  }, [filterByTitle, todos, filterByComplited]);

  const titleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByTitle(e.target.value.toLowerCase());
  };

  const completedFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByComplited(e.target.value);
  };

  const getRandom = () => {
    setVisibleTodos([...visibleTodos].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <label>
          Filter by title:
          <input
            type="text"
            data-cy="filterByTitle"
            value={filterByTitle}
            onChange={titleFilter}
          />
        </label>

        <select value={filterByComplited} onChange={completedFilter}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          className="button"
          onClick={getRandom}
        >
          Randomize
        </button>
      </div>

      <ol className="TodoList__list" data-cy="listOfTodos">
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
          </li>
        ))}
      </ol>
    </div>
  );
});
