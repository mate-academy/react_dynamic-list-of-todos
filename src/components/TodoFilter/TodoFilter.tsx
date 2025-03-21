import { FC } from 'react';

type Props = {
  handleChangeType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearQuery: () => void;
  query: string;
};

export const TodoFilter: FC<Props> = ({
  handleChangeType,
  handleChangeQuery,
  handleClearQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={handleChangeType}>
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
        onChange={handleChangeQuery}
        value={query}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearQuery}
          />
        )}
      </span>
    </p>
  </form>
);
