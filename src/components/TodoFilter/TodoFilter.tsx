import React, { useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { TodosType } from '../../types/TodosType';

interface Props {
  setType: React.Dispatch<React.SetStateAction<TodosType>>;
  setAppliedQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoFilter: React.FC<Props> = ({
  setType,
  setAppliedQuery,
}) => {
  const [query, setQuery] = useState('');
  const applyQuery = useRef(debounce((value: string) => {
    return setAppliedQuery(value);
  }, 500)).current;

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as TodosType);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const handleInputClear = () => {
    setQuery('');
    setAppliedQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusSelect}
          >
            <option value={TodosType.All}>All</option>
            <option value={TodosType.Active}>Active</option>
            <option value={TodosType.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleInputChange}
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
              onClick={handleInputClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
