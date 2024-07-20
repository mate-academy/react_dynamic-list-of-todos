import React from 'react';
import { Filters } from '../../types/Filter';

type Props = {
  onFilter: (data: Filters) => void;
  filters: Filters;
};

export const TodoFilter: React.FC<Props> = ({ onFilter, filters }) => {
  const { select, text } = filters;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter({ ...filters, select: event.target.value });
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilter({ ...filters, text: event.target.value });
  };

  const clearInputField = () => onFilter({ ...filters, text: '' });

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={select} onChange={handleSelect}>
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
          value={text}
          onChange={handleChangeText}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {text && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInputField}
            />
          </span>
        )}
      </p>
    </form>
  );
};
