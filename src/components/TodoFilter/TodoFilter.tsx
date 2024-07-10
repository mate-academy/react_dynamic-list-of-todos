import { ChangeEvent, useEffect, useState } from 'react';
import { Status } from '../../types/Todo';
import { STATUS_FILTER_OPTIONS } from '../../utils/constants';

interface Props {
  onChangeStatus: (status: Status) => void;
  onSearch: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({ onChangeStatus, onSearch }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    onSearch(search);
  }, [search]);

  const handleStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    onChangeStatus(value as Status);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearch(value.toLowerCase());
  };

  const handleClear = () => {
    setSearch('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatus}>
            {STATUS_FILTER_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={search}
          placeholder="Search..."
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
