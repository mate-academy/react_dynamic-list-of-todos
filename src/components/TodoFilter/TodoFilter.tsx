import React, { useCallback, useState } from 'react';
import { FilterBy } from '../../App';

interface Props {
  filterBy: (option: FilterBy) => void;
  setQuery: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filterBy = () => {},
  setQuery = () => {},
}) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      setQuery(event.target.value);
    },
    [],
  );

  const handleClick = useCallback(() => {
    setValue('');
    setQuery('');
  }, []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => filterBy(event.target.value as FilterBy)}
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
          value={value}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
