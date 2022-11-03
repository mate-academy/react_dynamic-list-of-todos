import React, { useCallback, useState } from 'react';

import { TodoStatus } from '../../types/TodoStatus';
import { debounce } from '../../utils/debounce';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  setSelectValue: (value: TodoStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query, setQuery, setSelectValue,
}) => {
  const [appliedQuery, setAppliedQuery] = useState('');

  const setQueryDebounce = useCallback(
    debounce(setQuery, 1000),
    [],
  );

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppliedQuery(event.target.value);
    setQueryDebounce(event.target.value);
  };

  const handleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value as TodoStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectValue}
          >
            <option value={TodoStatus.ALL}>All</option>
            <option value={TodoStatus.ACTIVE}>Active</option>
            <option value={TodoStatus.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={appliedQuery}
          onChange={handleChangeQuery}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}

      </p>
    </form>
  );
};
