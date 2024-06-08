import { ChangeEvent, FC } from 'react';
import { SortParams, SortQuery } from '../../types/Sort';

interface Props {
  sortParams: SortParams;
  sortTodos: (query: SortQuery) => void;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  optionsStatus: {
    value: SortQuery;
    content: string;
  }[];
  deleteSearch: () => void;
}

export const TodoFilter: FC<Props> = props => {
  const { sortParams, sortTodos, onChange, optionsStatus, deleteSearch } =
    props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortParams.query}
            onChange={e => sortTodos(e.target.value as SortQuery)}
          >
            {optionsStatus.map(option => (
              <option key={option.value} value={option.value}>
                {option.content}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={sortParams.search}
          onChange={onChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {sortParams.search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
