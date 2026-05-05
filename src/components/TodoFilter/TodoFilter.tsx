import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  status: string;
  onStateChange: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  value,
  onChange,
  onClose,
  status,
  onStateChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => onStateChange(event.target.value)}
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
          onChange={event => onChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClose}
            />
          </span>
        )}
      </p>
    </form>
  );
};
