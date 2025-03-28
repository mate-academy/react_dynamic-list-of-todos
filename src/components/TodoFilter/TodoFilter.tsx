import React from 'react';
import { FilterParams } from '../../types/FilterParams';

interface Props {
  inputQuery: string;
  onChangeFilter: (s: FilterParams) => void;
  onChangeInputQuery: (s: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  inputQuery,
  onChangeFilter,
  onChangeInputQuery,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(event.currentTarget.value as FilterParams);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInputQuery(event.currentTarget.value);
  };

  const handleInputReset = () => onChangeInputQuery('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="field has-addons">
      <p className="control">
        <span className="select">
          <select onChange={handleSelect} data-cy="statusSelect">
            <option value={FilterParams.ALL}>All</option>
            <option value={FilterParams.ACTIVE}>Active</option>
            <option value={FilterParams.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleInput}
          value={inputQuery}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {inputQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              onClick={handleInputReset}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
