import React, { useState } from 'react';
import { Select } from '../../types/Select';

type Props = {
  onChangeQuery: (query: string) => void,
  onChangeSelectOption: (event: string) => void,
  query: string,

};

export const TodoFilter: React.FC<Props> = ({
  onChangeQuery = () => {},
  onChangeSelectOption = () => {},
  query,
}) => {
  const [selectOption, setSelectOption] = useState<string>();

  function onChangeSetQuery(event: React.ChangeEvent<HTMLInputElement>) {
    onChangeQuery(event.target.value);
  }

  function removeQuery() {
    onChangeQuery('');
  }

  const onChangeOnChooseOption
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(event?.target?.value);
    onChangeSelectOption(event?.target?.value);
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
            onChange={onChangeOnChooseOption}
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
          value={query}
          onChange={onChangeSetQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: Select.All }}
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
