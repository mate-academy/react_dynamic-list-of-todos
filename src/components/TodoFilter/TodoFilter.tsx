import React, { useState } from 'react';
import { TodoStatus } from '../../types/TodoStatus ';

type Props = {
  onChangeQuery: (query: string) => void,
  onChangeSelect: (event: string) => void,
  query: string,

};

export const TodoFilter: React.FC<Props> = ({
  onChangeQuery = () => {},
  onChangeSelect = () => {},
  query,
}) => {
  const [selectOption, setSelectOption] = useState<string>();

  function onChangeSetQuery(event: React.ChangeEvent<HTMLInputElement>) {
    onChangeQuery(event.target.value);
  }

  function removeQuery() {
    onChangeQuery('');
  }

  const onChangeOption
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(event.target.value);
    onChangeSelect(event.target.value);
    onChangeQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span
          className="select"
        >
          <select
            data-cy="statusSelect"
            id="select"
            value={selectOption}
            onChange={onChangeOption}
          >
            <option value={TodoStatus.All}>All</option>
            <option value={TodoStatus.Active}>Active</option>
            <option value={TodoStatus.Completed}>Completed</option>
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
            style={{ pointerEvents: TodoStatus.All }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
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
