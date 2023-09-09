import { ChangeEvent, useState } from 'react';
import { FilterMode } from '../../types/FilterMode';

type TodoFilterProps = {
  getTodos: (mode: FilterMode, query: string) => void
};

export const TodoFilter = ({ getTodos }: TodoFilterProps) => {
  const [filterMode, setFilterMode] = useState(FilterMode.all);
  const [query, setQuery] = useState('');

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const mode = event.target.value as FilterMode;

    setFilterMode(mode);
    getTodos(mode, query);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputQuery = event.target.value;

    setQuery(inputQuery);
    getTodos(filterMode, inputQuery);
  };

  const handleClick = () => {
    setQuery('');
    getTodos(filterMode, '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChangeSelect}
            value={filterMode}
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
          onChange={handleChangeInput}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClick}
            />
          )}
        </span>
      </p>
    </form>
  );
};
