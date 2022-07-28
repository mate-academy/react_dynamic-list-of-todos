import { FC } from 'react';
import { SortedType } from '../../types/SortType';

type Props = {
  setSort(value: SortedType): void,
  setQuery(value: string): void,
  query: string,
};

export const TodoFilter: FC<Props> = ({ setSort, setQuery, query }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          onChange={event => {
            setSort(event.target.value as SortedType);
          }}
        >
          <option value={SortedType.all}>All</option>
          <option value={SortedType.active}>Active</option>
          <option value={SortedType.completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="filterByTitle"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        {query.length > 0 && (
          <button
            type="button"
            className="delete has-text"
            onClick={() => setQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
