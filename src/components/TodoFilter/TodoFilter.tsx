import { useContext } from 'react';
import { Filter } from '../../types/Filter';
import { TodoContext } from '../TodoContext/TodoContext';

type Props = {};

export const TodoFilter: React.FC<Props> = () => {
  const { query, setQuery, setFilter } = useContext(TodoContext);

  const filters = [
    { name: 'All', value: Filter.All },
    { name: 'Active', value: Filter.Active },
    { name: 'Completed', value: Filter.Completed },
  ];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={el => setFilter(el.target.value as Filter)}
          >
            {filters.map(item => (
              <option key={item.value} value={item.value}>{item.name}</option>
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
          value={query}
          onChange={(el) => setQuery(el.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
