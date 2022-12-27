import { useState } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  onFilter: (filterBy: Filter, searchBy: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ onFilter }) => {
  const [status, setStatus] = useState(Filter.All);
  const [searchBy, setSearchBy] = useState('');

  const handleFilterSetting = (target: Filter) => {
    setStatus(target || Filter.All);
    onFilter(target, searchBy);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              handleFilterSetting(event.target.value as Filter);
            }}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={(event) => {
            setSearchBy(event.target.value);
            onFilter(status, event.target.value);
          }}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchBy}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchBy && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              onClick={() => {
                setSearchBy('');
                onFilter(status, '');
              }}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
