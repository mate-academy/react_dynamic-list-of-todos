import React from 'react';

type Props = {
  setFilter: (value:React.ChangeEvent<HTMLSelectElement>) => void,
  filter: string,
  inputFilter: (event: string) => void,
  inputFilterValue:string,
};
export const TodoFilter:React.FC<Props> = ({
  setFilter,
  filter,
  inputFilter,
  inputFilterValue,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={setFilter}
            value={filter}
            data-cy="statusSelect"
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={(event) => {
            inputFilter(event.target.value);
          }}
          value={inputFilterValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputFilterValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => {
                inputFilter('');
              }}
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
