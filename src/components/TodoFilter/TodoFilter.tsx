import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { Filter } from '../../types/Filter';
import { TyChangeEvtInputElmt } from '../../types/General';

type Props = {
  filter: Filter;
  onFilter?: (val: Filter) => void;
  onAppliedQuery?: (val: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilter = () => { },
  onAppliedQuery = () => { },
}) => {
  const [query, setQuery] = useState('');
  const debouncedSetAppliedQuery = useCallback(debounce(
    onAppliedQuery, 1000,
  ), []);

  const handleQueryChange = (event: TyChangeEvtInputElmt) => {
    setQuery(event.target.value);
    debouncedSetAppliedQuery(event.target.value);
  };

  const handleBtnDelete = () => {
    setQuery('');
    debouncedSetAppliedQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => onFilter(event.target.value as Filter)}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleBtnDelete}
          />
        </span>
      </p>
    </form>
  );
};
