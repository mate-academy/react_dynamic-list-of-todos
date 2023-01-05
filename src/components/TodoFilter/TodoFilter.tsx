import type { ChangeEvent, FC } from 'react';
import type { TodoFilterStatus } from '../../App';

type Props = {
  changeSort: (filter: TodoFilterStatus) => void;
  changeQuery: (query: string) => void;
  query: string;
};

export const TodoFilter: FC<Props> = ({
  changeSort,
  changeQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            changeSort(event.target.value as TodoFilterStatus);
          }}
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
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          changeQuery(event.target.value);
        }}
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
            onClick={() => {
              changeQuery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
