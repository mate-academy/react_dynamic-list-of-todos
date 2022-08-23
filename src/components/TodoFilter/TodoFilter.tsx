import { FC } from 'react';
import { SelectBy } from '../../Enums/SelectBy';

type Props = {
  selectBy: number,
  setSelectBy: CallableFunction,
  inputSearch: string,
  setInputSearch: CallableFunction,
};

export const TodoFilter: FC<Props> = ({
  selectBy,
  setSelectBy,
  inputSearch,
  setInputSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectBy}
          onChange={event => setSelectBy(+event.target.value)}
        >
          <option value={SelectBy.All}>All</option>
          <option value={SelectBy.Active}>Active</option>
          <option value={SelectBy.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={inputSearch}
        onChange={(event) => setInputSearch(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputSearch.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setInputSearch('')}
          />
        </span>
      )}
    </p>
  </form>
);
