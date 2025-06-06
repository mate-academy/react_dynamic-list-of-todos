import React from 'react';

type Props = {
  queryInput: string;
  handleSelects: (selectedItem: string) => void;
  onChangeInput: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  queryInput,
  handleSelects,
  onChangeInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => {
              handleSelects(event.target.value);
            }}
            data-cy="statusSelect"
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
          value={queryInput}
          onChange={event => {
            onChangeInput(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {queryInput && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onChangeInput('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
