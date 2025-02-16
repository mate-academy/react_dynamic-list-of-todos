import { ChangeEvent } from 'react';

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onChange,
  query,
  onClear,
  onFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select onChange={onFilter} data-cy="statusSelect">
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
        onChange={onChange}
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
            onClick={onClear}
          />
        )}
      </span>
    </p>
  </form>
);
