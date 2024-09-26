import React, { useCallback } from 'react';
import { SelectedOptions } from '../../types/SelectedOptions';

type Props = {
  selectedOption: string;
  query: string;
  handleSetOption: (option: string) => void;
  handleSetQuery: (text: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectedOption,
  query,
  handleSetOption,
  handleSetQuery,
}) => {
  const handleOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      handleSetOption(event.target.value);
    },
    [handleSetOption],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSetQuery(e.target.value);
    },
    [handleSetQuery],
  );

  const onButtonDelete = useCallback(() => {
    handleSetQuery('');
  }, [handleSetQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value={SelectedOptions.all}>All</option>
            <option value={SelectedOptions.active}>Active</option>
            <option value={SelectedOptions.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
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
              onClick={onButtonDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
