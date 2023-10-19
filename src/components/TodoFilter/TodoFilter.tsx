import React, { useState, useRef } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { filterAndSortTodos } from '../../services/Filter';

type Props = {
  originalTodos: Todo[],
  setTodos: (newTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(
  ({
    originalTodos,
    setTodos,
  }) => {
    const [query, setQuery] = useState('');
    const [useOpinion, setUseOpinion] = useState(Filter.All);
    const timerId = useRef(0);

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);

      window.clearTimeout(timerId.current);
      timerId.current = window.setTimeout(() => {
        setTodos(
          filterAndSortTodos(event.target.value, useOpinion, originalTodos),
        );
      }, 500);
    };

    const handleChangeOpinion = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const newOpinion = event.target.value as Filter;

      setUseOpinion(newOpinion);
      setTodos(filterAndSortTodos(
        query, newOpinion, originalTodos,
      ));
    };

    const reset = () => {
      setQuery('');
      setTodos(originalTodos);
    };

    return (
      <form
        className="field has-addons"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={handleChangeOpinion}
              value={useOpinion}
            >
              <option value={Filter.All}>All</option>
              <option value={Filter.Active}>Active</option>
              <option value={Filter.Comleted}>Completed</option>
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
            onChange={handleQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {query && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={reset}
              />
            )}
          </span>
        </p>
      </form>
    );
  },
);
