import React from 'react';

type Props = {
  method: string;
  setMethod: (method: string) => void;
  value: string;
  setValue: (str: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  method,
  setMethod,
  value,
  setValue,
}) => {
  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCleanInput = () => {
    setValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={method}
            onChange={handleOnSelect}
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
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCleanInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
