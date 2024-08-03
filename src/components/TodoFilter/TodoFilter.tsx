import React from 'react';

type Props = {
  setSelectOption: (event: string) => void;
  setInputText: (event: string) => void;
  inputText: string;
};

export enum TodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  setSelectOption,
  setInputText,
  inputText,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              setSelectOption(event.target.value);
            }}
          >
            <option value="all">{TodoStatus.All}</option>
            <option value="active">{TodoStatus.Active}</option>
            <option value="completed">{TodoStatus.Completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputText}
          onChange={event => {
            setInputText(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputText.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputText('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
