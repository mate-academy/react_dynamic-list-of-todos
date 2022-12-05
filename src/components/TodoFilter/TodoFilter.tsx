import React, { useCallback } from 'react';
import { TodosCategory } from '../../types/TodosCategory';

interface Props {
  selectValue: string;
  setSelectValue: React.Dispatch<React.SetStateAction<TodosCategory>>
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

export const TodoFilter: React.FC<Props> = ({
  selectValue,
  setSelectValue,
  query,
  setQuery,
}) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    }, [],
  );

  const handleSelection = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      switch (e.target.value) {
        case TodosCategory.Active:
          setSelectValue(TodosCategory.Active);
          break;

        case TodosCategory.Completed:
          setSelectValue(TodosCategory.Completed);
          break;

        default:
          setSelectValue(TodosCategory.All);
          break;
      }
    },
    [selectValue],
  );

  const clearInput = () => setQuery('');
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    [setSelectValue],
  );

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handleSelection}
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
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear input"
              onClick={clearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
