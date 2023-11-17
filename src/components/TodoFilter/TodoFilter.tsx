import { useContext } from 'react';
import { FilterContext } from '../Contex/FilterContex';

export const TodoFilter = () => {
  const { filter, setFilter } = useContext(FilterContext);

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            // eslint-disable-next-line max-len
            onChange={e => setFilter((item) => ({ ...item, select: e.target.value }))}
            data-cy="statusSelect"
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
          value={filter.query}
          // eslint-disable-next-line max-len
          onChange={(e) => setFilter((item) => ({ ...item, query: e.target.value }))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filter.query.length !== 0
          && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setFilter((item) => ({ ...item, query: '' }))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
