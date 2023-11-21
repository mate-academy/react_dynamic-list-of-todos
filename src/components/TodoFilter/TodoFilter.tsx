import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter,
  onFilterSelect: (value: Filter) => void,
  onQueryChange: (value: string) => void,
  onShuffle: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterSelect,
  onQueryChange,
  onShuffle,
}) => {
  const [input, setInput] = useState('');

  const applyQuery = useCallback(
    debounce(onQueryChange, 600),
    [],
  );

  const handleInputChange = (
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInput(value);
    applyQuery(value);
  };

  const handleInputClean = () => {
    setInput('');
    applyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={({ target }) => onFilterSelect(target.value as Filter)}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={input}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {Boolean(input) && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleInputClean}
            />
          )}
        </span>
      </p>

      <button
        type="button"
        className="button"
        onClick={() => onShuffle()}
      >
        Shuffle
      </button>
    </form>
  );
};
