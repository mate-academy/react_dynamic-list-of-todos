import { FC } from 'react';

interface TodoFilterProps {
  query: string;
  onChangeQuery: (value: string) => void;
  onChangeFilterType: (sortType: string) => void;
}

export const TodoFilter: FC<TodoFilterProps> = ({
  query,
  onChangeQuery,
  onChangeFilterType,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => onChangeFilterType(event.target.value)}
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
          onChange={(event) => onChangeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              aria-label="Mute volume"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
