import React, { useCallback, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setViewableTodos: (param: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, setViewableTodos }) => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');

  const filterTodos = useCallback(
    (chosenOption: string, inputValue: string): void => {
      switch (chosenOption) {
        case 'active':
          setViewableTodos(
            todos
              .filter(({ completed }) => completed === false)
              .filter(({ title }) =>
                title.toLowerCase().includes(inputValue.toLowerCase()),
              ),
          );

          return;

        case 'completed':
          setViewableTodos(
            todos
              .filter(({ completed }) => completed)
              .filter(({ title }) =>
                title.toLowerCase().includes(inputValue.toLowerCase()),
              ),
          );

          return;

        default:
          setViewableTodos(
            todos.filter(({ title }) =>
              title.toLowerCase().includes(inputValue.toLowerCase()),
            ),
          );
      }
    },
    [todos, setViewableTodos],
  );

  const handleOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
      filterTodos(event.target.value, query);
    },
    [filterTodos, query],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      filterTodos(selectedOption, e.target.value);
    },
    [filterTodos, selectedOption],
  );

  const onButtonDelete = useCallback(() => {
    setQuery('');
    filterTodos(selectedOption, '');
  }, [filterTodos, selectedOption]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onButtonDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
