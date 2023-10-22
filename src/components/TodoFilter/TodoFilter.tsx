import React from 'react';
import './TodoFilter.scss';
import { TodoStatus } from '../../types/TodoStatus ';

type Props = {
  onChangeQuery: (query: string) => void,
  onChangeSelect: (event: TodoStatus) => void,
  query: string,
  selectedOption: TodoStatus,
};

export const TodoFilter: React.FC<Props> = ({
  onChangeQuery = () => {},
  onChangeSelect = () => {},
  query,
  selectedOption,
}) => {
  const onChangeSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQuery(event.target.value);
  };

  const removeQuery = () => onChangeQuery('');

  const handleChangeOption
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeSelect(event.target.value as TodoStatus);
  };

  const todoStatuses = Object.entries(TodoStatus);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            id="select"
            value={selectedOption}
            onChange={handleChangeOption}
          >
            {todoStatuses.map(([key, value]) => (
              <option value={value} key={key}>
                {key}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p
        className="control is-expanded has-icons-left has-icons-right"
      >
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={onChangeSetQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
          >
            <button
              aria-label="jsx-a11y"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={removeQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
