import { useContext, useState } from 'react';
import { DispatchContext } from '../../Store';
import { Filter } from '../../types/Filter';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [search, setSearch] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
    dispatch({
      type: 'filterAndSearchTodos',
      filter: event.target.value as Filter,
      search,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    dispatch({
      type: 'filterAndSearchTodos',
      filter,
      search: event.target.value,
    });
  };

  const clearSearchField = () => {
    setSearch('');
    dispatch({
      type: 'filterAndSearchTodos',
      filter,
      search: '',
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleSelect}
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
          value={search}
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchField}
            />
          </span>
        )}
      </p>
    </form>
  );
};
