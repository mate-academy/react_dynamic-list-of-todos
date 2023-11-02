import React from 'react';
import { Filter, TodoStates } from '../../types/Filter';

const todoStatesArray = Object.values(TodoStates);

type Props = {
  filter: Filter;
  onFilter: (filter: Filter | ((filter: Filter) => Filter)) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, onFilter }) => {
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(prevState => ({
      ...prevState,
      select: event.target.value as TodoStates,
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilter(prevState => ({
      ...prevState,
      input: event.target.value,
    }));
  };

  const handleClearInput = () => {
    onFilter(prevState => ({
      ...prevState,
      input: '',
    }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.select}
            onChange={handleChangeSelect}
          >
            {todoStatesArray.map(value => (
              <option
                value={value}
                key={value}
                className="capitalized"
              >
                {value}
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
          placeholder="Search..."
          value={filter.input}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.input && (
          <span className="icon is-right pointerEvent">
            <button
              aria-label="deleteButton"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
