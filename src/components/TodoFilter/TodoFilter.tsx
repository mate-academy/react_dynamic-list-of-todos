import { debounce } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FilterType } from '../../types/Filter';

type Props = {
  setQuery: (value: string) => void;
  query: string;
  handleChangeSelect: (value: FilterType) => void;
  filter: FilterType;
  setFilter: (value: FilterType) => void;
};
export const TodoFilter: React.FC<Props> = ({
  setQuery,
  query,
  handleChangeSelect,
  filter,
  setFilter,
}) => {
  const [inputValue, setInputValue] = useState(query);

  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 500),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as FilterType;

    handleChangeSelect(value);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);
    debouncedSetQuery(value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    setInputValue('');
    setQuery('');
    setFilter('all');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChange} value={filter}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          ref={inputRef}
          onChange={handleChangeInput}
          value={inputValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
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
              onClick={clearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
