/* eslint-disable no-console */
import { useState } from 'react';

interface Props {
  setValue: (str: string) => void;
  onSelected: (str: string) => void;
}

export const TodoFilter: React.FC<Props> = ({ setValue, onSelected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setValue(event.target.value);

    console.log(event.target.value);
  };

  const clearInput = () => {
    setSearchQuery('');
    setValue('');
  };

  const handleSearchSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;

    setFilter(filterValue);

    onSelected(filterValue);
    console.log(filterValue);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleSearchSelect}
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
