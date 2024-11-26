import React from 'react';

interface Props {
  values: {
    input: string;
    filter: string;
  };
  set: React.Dispatch<React.SetStateAction<{ input: string; filter: string }>>;
}

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export const TodoFilter: React.FC<Props> = ({ values, set }) => {
  const handleControl = (e: ChangeEvent, changeValue: string) => {
    if (changeValue === 'input') {
      set(prevValue => ({ ...prevValue, input: e.target.value }));
    } else {
      set(prevValue => ({ ...prevValue, filter: e.target.value }));
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              handleControl(e, 'filter');
            }}
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
          value={values.input}
          onChange={e => {
            handleControl(e, 'input');
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {values.input && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                set(prevValue => ({ ...prevValue, input: '' }));
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
