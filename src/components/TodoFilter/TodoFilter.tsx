import React, { ChangeEvent } from 'react';

type Props = {
  selectValue: string;
  onSelect: (arg: string) => (string) | void;
  inputValue: string;
  onInput: (arg: string) => (string) | void;
};

export const TodoFilter: React.FC<Props> = ({
  onInput,
  onSelect,
  selectValue,
  inputValue,
}) => {
  const handleChangeValue = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    onInput(event.currentTarget.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handleChangeValue}
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
          onChange={handleChangeText}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue !== '' && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onInput('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
