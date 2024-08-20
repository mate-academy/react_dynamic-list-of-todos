import { FC, useState, ChangeEvent } from 'react';

interface Props {
  setSelectedFilter: (condition: string) => void;
  setQuery: (query: string) => void;
}

export const TodoFilter: FC<Props> = ({ setSelectedFilter, setQuery }) => {
  const [selected, setSelected] = useState('all');
  const [query, setSelectedQuery] = useState('');

  const handleOnChangeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    setSelectedFilter(e.target.value);
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedQuery(e.target.value);
    setQuery(e.target.value);
  };

  const reset = () => {
    setSelectedQuery('');
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selected}
            onChange={handleOnChangeSelected}
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
          onChange={handleOnChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
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
};
