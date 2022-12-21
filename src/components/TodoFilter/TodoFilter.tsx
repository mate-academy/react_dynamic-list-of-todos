import { useState } from 'react';

type Props = {
  onFilter: (filterBy: string, searchBy: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ onFilter }) => {
  const [status, setStatus] = useState('all');
  const [searchBy, setSearchBy] = useState('');

  const handleFilterSetting = (target: string) => {
    setStatus(target || 'all');
    onFilter(target, searchBy);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              handleFilterSetting(event.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={() => {
              setSearchBy('');
              onFilter(status, '');
            }}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
