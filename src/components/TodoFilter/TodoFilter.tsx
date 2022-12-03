import React, { ChangeEvent } from 'react';

type Props = {
  onChangeSelector: (select: string) => void;
  selectorValue: string;
  onChangeInput: (value: string) => void;
  inputValue: string;
  clear: () => void
};

export const TodoFilter: React.FC<Props> = ({
  onChangeSelector,
  selectorValue,
  onChangeInput,
  inputValue,
  clear,
}) => {
  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeSelector(event.target.value);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeInput(event.target.value.toLowerCase());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectorValue}
            onChange={handleChangeSelect}
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
          value={inputValue}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              aria-label="delete"
              type="button"
              className="delete"
              onClick={clear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
